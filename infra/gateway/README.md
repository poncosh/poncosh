# Vercel → Nginx TLS → WireGuard → Fly PostgreSQL

Gateway ini berjalan pada server teman, bukan di Vercel. Nginx membuka satu port
TCP publik, menerima direct TLS dari `node-postgres`, lalu meneruskan protokol
PostgreSQL ke `portfolio-poncosh.internal:5432` melalui interface WireGuard
`flyio`.

```text
Vercel Node.js Function (`sslnegotiation=direct`)
        │ direct TLS :6432
        ▼
Nginx stream (terminasi TLS)
        │ PostgreSQL melalui interface flyio
        ▼
portfolio-poncosh.internal:5432
```

Nginx bukan connection pool. Pool tetap berada di aplikasi dengan maksimum 15
koneksi per instance. Karena Vercel dapat membuat beberapa instance, batas itu
bukan maksimum global; dua instance dapat membuka sampai 30 koneksi.

## Cara TLS bekerja

PostgreSQL biasanya mengirim paket `SSLRequest` sebelum TLS, sedangkan listener
TLS Nginx mengharapkan handshake TLS langsung. Dependency `pg@8.23.0` pada
project ini mendukung `sslnegotiation=direct`, sehingga driver memulai TLS segera
ketika socket terbuka. Setelah Nginx membuka TLS, PostgreSQL StartupMessage
diteruskan ke database melalui WireGuard.

Artinya:

- sertifikat publik hanya dipasang pada server Nginx;
- PostgreSQL Fly tidak perlu dibuka ke publik atau diberi sertifikat publik;
- hop internet Vercel → Nginx dilindungi TLS;
- hop Nginx → PostgreSQL dilindungi WireGuard;
- pooling tetap sepenuhnya berada di aplikasi.

## 1. Siapkan peer WireGuard terpisah

Jangan memakai peer/private key yang sama pada dua mesin:

```bash
fly orgs list
fly platform regions
fly wireguard create <ORG_SLUG> sin flyio flyio.conf
scp flyio.conf admin@<GATEWAY_IP>:/tmp/flyio.conf
```

Pada server gateway:

```bash
sudo install -o root -g root -m 600 /tmp/flyio.conf /etc/wireguard/flyio.conf
sudo rm /tmp/flyio.conf
sudo systemctl enable --now wg-quick@flyio
sudo wg show flyio
```

Jika `wg0` sudah mengatur DNS global, gunakan split DNS. Ambil alamat dari baris
`DNS =` pada `flyio.conf`, hapus baris tersebut, lalu tambahkan:

```ini
PostUp = resolvectl dns %i <FLY_DNS_DARI_CONFIG>
PostUp = resolvectl domain %i '~internal'
PostDown = resolvectl revert %i
```

Verifikasi tunnel dan rute:

```bash
ip -6 route
resolvectl query portfolio-poncosh.internal
nc -6 -vz portfolio-poncosh.internal 5432
```

## 2. Pasang Nginx stream TLS

Gunakan Nginx 1.21.4+ dengan modul stream dan stream SSL agar ALPN
`postgresql` untuk direct negotiation tersedia. Contoh Ubuntu/Debian:

```bash
sudo apt update
sudo apt install nginx-full libnginx-mod-stream certbot dnsutils netcat-openbsd
```

Buat DNS `A`/`AAAA` bernama `db-gateway.example.com` menuju server gateway, lalu
terbitkan sertifikat:

```bash
sudo certbot certonly --standalone -d db-gateway.example.com
```

Edit `infra/gateway/nginx/portfolio-db.conf`:

1. Ganti `FLY_DNS_IPV6` dengan nilai `DNS` dari `flyio.conf`, tanpa kurung siku.
2. Ganti `db-gateway.example.com` dengan domain gateway yang sebenarnya.
3. Jika memakai Vercel Static IP, isi directive `allow` dan aktifkan `deny all`.

Salin konfigurasi lengkap yang sudah memiliki blok `stream {}`:

```bash
sudo install -o root -g root -m 644 \
  infra/gateway/nginx/portfolio-db.conf \
  /etc/nginx/portfolio-db.conf
```

Tambahkan directive berikut pada level teratas `/etc/nginx/nginx.conf`, sejajar
dengan blok `events {}` dan `http {}`:

```nginx
include /etc/nginx/portfolio-db.conf;
```

Jangan meletakkan include tersebut di dalam `http {}` atau `sites-enabled`, dan
jangan membungkusnya lagi dengan `stream {}` karena bloknya sudah tersedia di
file template.

Validasi dan aktifkan:

```bash
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl restart nginx
sudo ss -lntp | grep ':6432'
```

Pastikan Nginx direload setelah sertifikat diperbarui:

```bash
sudo certbot renew --deploy-hook "systemctl reload nginx"
```

## 3. Firewall

Yang dibuka hanya TCP `6432`. Port PostgreSQL `5432` tetap privat. Jika Vercel
Static IP tersedia:

```bash
sudo ufw allow from <VERCEL_STATIC_IP_1> to any port 6432 proto tcp
sudo ufw allow from <VERCEL_STATIC_IP_2> to any port 6432 proto tcp
sudo ufw deny 6432/tcp
```

WireGuard Fly hanya membutuhkan koneksi UDP keluar menuju endpoint di
`flyio.conf`. Tidak perlu IP forwarding, NAT, atau MASQUERADE karena Nginx
membuat koneksi TCP upstream baru.

## 4. Hubungkan aplikasi melalui `.env`

Vercel tidak membaca `flyio.conf`. Aplikasi mengarah ke alamat publik Nginx:

```dotenv
DATABASE_URL=postgresql://portfolio_app:<PASSWORD_URL_ENCODED>@db-gateway.example.com:6432/postgres?sslmode=verify-full&sslnegotiation=direct
DATABASE_SSL=true
DATABASE_POOL_MAX=15
DATABASE_CONNECTION_TIMEOUT_MS=5000
DATABASE_IDLE_TIMEOUT_MS=30000
DATABASE_STATEMENT_TIMEOUT_MS=15000
DATABASE_MAX_LIFETIME_SECONDS=300
NEXT_PUBLIC_SITE_URL=https://domain-portfolio.example
```

Tambahkan nilai tersebut melalui Project → Settings → Environment Variables di
Vercel lalu redeploy. Verifikasi listener TLS dari jaringan luar:

```bash
openssl s_client -connect db-gateway.example.com:6432 \
  -servername db-gateway.example.com -verify_return_error
```

Setelah itu deploy Preview Vercel dan pastikan query halaman berhasil. Bila
memakai `psql`, gunakan versi yang mendukung `sslnegotiation=direct`.

## Checklist keamanan

- Gunakan role `portfolio_app` berhak minimum, bukan `postgres`.
- Rotasi password database yang pernah dibagikan melalui chat.
- Buat ulang peer Fly jika private key pernah masuk Git atau build.
- Jangan menonaktifkan verifikasi sertifikat TLS di production.
- Pantau koneksi Nginx dan `wg show flyio`.
- Ingat bahwa server gateway menjadi single point of failure.
