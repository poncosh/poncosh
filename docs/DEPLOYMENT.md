# Deployment ke Vercel

## Jalur koneksi production

Vercel tidak menjalankan `flyio.conf`. Koneksi database memakai jalur berikut:

```text
Vercel Node.js Function (`sslnegotiation=direct`)
        │ direct TLS
        ▼
Nginx stream TLS pada server gateway:6432
        │ TCP melalui WireGuard flyio
        ▼
portfolio-poncosh.internal:5432
```

Nginx mengakhiri direct TLS lalu meneruskan PostgreSQL StartupMessage ke Fly.
Pooling tetap dikelola aplikasi dengan maksimum 15 koneksi per instance. Perlu
diingat bahwa limit itu bukan batas global; beberapa instance Vercel dapat
menghasilkan kelipatan 15 koneksi database.

Template Nginx, instalasi WireGuard kedua di samping `wg0`, split DNS Fly, dan
firewall tersedia di [`infra/gateway/README.md`](../infra/gateway/README.md).

## TLS tanpa PgBouncer

Dependency `pg@8.23.0` mendukung direct TLS negotiation. Connection string wajib
memuat `sslnegotiation=direct`, sehingga Nginx stream dapat menjadi terminator
TLS biasa. Sertifikat publik berada pada Nginx, sementara hop selanjutnya sudah
dienkripsi oleh WireGuard.

Jangan menghapus `sslnegotiation=direct`: tanpa opsi itu driver mengirim
PostgreSQL SSLRequest terlebih dahulu, yang bukan handshake TLS yang diharapkan
listener Nginx. Jangan gunakan `rejectUnauthorized: false` di production.

## Role aplikasi

Jangan gunakan superuser `postgres` dari Vercel. Portfolio saat ini hanya membaca
konten saat runtime, sehingga role aplikasi cukup diberi akses `SELECT`:

```sql
CREATE ROLE portfolio_app LOGIN PASSWORD 'PASSWORD_BARU_YANG_KUAT';
GRANT CONNECT ON DATABASE postgres TO portfolio_app;
GRANT USAGE ON SCHEMA portfolio TO portfolio_app;
GRANT SELECT ON ALL TABLES IN SCHEMA portfolio TO portfolio_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA portfolio
  GRANT SELECT ON TABLES TO portfolio_app;
```

Gunakan user admin hanya dari mesin yang sudah masuk private network Fly untuk
menjalankan migrasi dan seed.

## Environment Vercel

Pada Project → Settings → Environment Variables, isi Production dan Preview:

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

Password pada URL harus di-encode jika memiliki karakter seperti `@`, `:`, `/`,
`?`, atau `#`. Setelah mengubah environment, lakukan redeploy.

Build dan Vercel Function harus sama-sama dapat mencapai gateway jika build perlu
mengambil data. Aplikasi mempunyai bundled fallback ketika database tidak dapat
dijangkau, sehingga build masih dapat selesai dan render berikutnya mencoba
database kembali.

## Migrasi dan seed

Jalankan dari mesin administrator yang tersambung ke WireGuard Fly menggunakan
kredensial admin di `.env` lokal:

```bash
npm run db:setup
```

Jangan menjalankan DDL/DML production memakai role read-only milik Vercel.

## Checklist deployment

1. Buat peer Fly khusus gateway; jangan gunakan satu config pada dua mesin.
2. Pastikan `portfolio-poncosh.internal:5432` dapat diakses dari server gateway.
3. Pasang sertifikat valid untuk hostname publik pada Nginx.
4. Pasang Nginx `stream ssl` dan buka hanya TCP `6432`.
5. Allowlist Vercel Static IP jika tersedia; jangan membuka port `5432`.
6. Uji TLS dan connection string dengan `sslnegotiation=direct`.
7. Isi environment Vercel dan redeploy ke region `sin1`.
8. Periksa log Vercel, Nginx, serta `wg show flyio`.

## Secret hygiene

- `.env` dan `flyio.conf` sudah diabaikan Git dan tidak boleh masuk build.
- Rotasi password database yang pernah dibagikan melalui chat.
- Cabut peer WireGuard jika private key pernah ter-push atau terkirim ke pihak
  yang tidak seharusnya.
- Gunakan role database dengan hak minimum dan sertifikat TLS terverifikasi.
