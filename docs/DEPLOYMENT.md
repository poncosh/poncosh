# Deployment ke Vercel

## Keputusan jaringan

Aplikasi siap dideploy ke Vercel, tetapi hostname `portfolio-poncosh.internal` berada di private network Fly.io (6PN). File `flyio.conf` adalah konfigurasi **host-level VPN**: ia membutuhkan interface jaringan, routing IPv6, DNS Fly, dan proses yang hidup. Karakter tersebut tidak cocok dijalankan dari package atau lifecycle Vercel Function yang ephemeral.

### Rekomendasi praktis untuk portfolio ini

Untuk setup personal dengan Vercel Hobby/Pro, jalur paling langsung adalah **Fly Proxy dengan PostgreSQL TLS**. Ubah database Fly agar memiliki hostname publik `portfolio-poncosh.fly.dev`, lalu gunakan role database khusus aplikasi. Repository ini sudah mendukung jalur tersebut melalui `DATABASE_SSL=true`.

Jalankan dari direktori konfigurasi database Fly, bukan direktori portfolio:

```bash
fly ips list --app portfolio-poncosh
fly ips allocate-v4 --app portfolio-poncosh
fly config save --app portfolio-poncosh
```

Perintah `fly config save` dapat menimpa `fly.toml` lokal. Periksa hasilnya, lalu pastikan service PostgreSQL menggunakan handler TLS:

```toml
[[services]]
  internal_port = 5432
  protocol = "tcp"

[[services.ports]]
  handlers = ["pg_tls"]
  port = 5432
```

Periksa image aktif dengan `fly image show --app portfolio-poncosh`, lalu deploy memakai image dan major version yang sama. Connection string di Vercel menjadi:

```text
postgresql://portfolio_app:PASSWORD_BARU@portfolio-poncosh.fly.dev:5432/postgres
```

Set `DATABASE_SSL=true`. Jangan gunakan role `postgres` atau password yang pernah dikirim melalui chat untuk aplikasi production.

Buat role aplikasi dari koneksi admin melalui WireGuard. Portfolio saat ini hanya membaca data ketika runtime, sehingga role Vercel cukup diberi akses `SELECT`:

```sql
CREATE ROLE portfolio_app LOGIN PASSWORD 'PASSWORD_BARU_YANG_KUAT';
GRANT CONNECT ON DATABASE postgres TO portfolio_app;
GRANT USAGE ON SCHEMA portfolio TO portfolio_app;
GRANT SELECT ON ALL TABLES IN SCHEMA portfolio TO portfolio_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA portfolio
  GRANT SELECT ON TABLES TO portfolio_app;
```

Gunakan user `postgres` hanya dari mesin admin untuk `npm run db:setup`. Gunakan `portfolio_app` pada environment Vercel. Pool production dibatasi satu koneksi per instance karena halaman memakai ISR satu jam dan trafik database portfolio relatif kecil.

Karena itu WireGuard tidak dipasang sebagai dependency aplikasi. Gunakan salah satu jalur berikut:

1. **Vercel Enterprise + Secure Compute/VPN** — pilihan direct PostgreSQL yang paling dekat dengan arsitektur saat ini. Hubungkan private network Vercel ke Fly 6PN, kemudian gunakan hostname internal di `DATABASE_URL`.
2. **Fly-side HTTPS data service** — cocok untuk Vercel Hobby/Pro. Jalankan service kecil pada Fly di organisasi yang sama dengan database, lindungi dengan TLS dan machine-to-machine auth, lalu panggil service tersebut dari Vercel. Database tetap tidak dibuka ke internet.
3. **PostgreSQL endpoint publik yang di-hardening** — gunakan TLS, kredensial dengan hak minimum, connection pooler, dan allowlist Vercel Static IP. Hindari membuka port 5432 tanpa pembatasan.
4. **Deploy monolith ke Fly.io** — jika Vercel tidak mutlak, aplikasi Fly dalam organisasi yang sama memperoleh akses 6PN secara native dan tidak memerlukan `flyio.conf` di container.

Untuk perubahan minimum pada repository saat ini, gunakan PostgreSQL TLS di atas. Jika Anda tidak ingin port database menjadi publik sama sekali, opsi 2 adalah pilihan keamanan yang lebih baik tetapi data layer perlu diubah dari query PostgreSQL menjadi HTTPS API.

## Langkah Vercel

1. Push repository ke Git provider, lalu import ke Vercel.
2. Pilih Node.js `24.x` sesuai `package.json`.
3. Tambahkan environment variables untuk Production dan Preview:
   - `DATABASE_URL`
   - `DATABASE_SSL=true` bila jalur koneksi menggunakan TLS
   - `NEXT_PUBLIC_SITE_URL=https://domain-anda.example`
4. Pastikan jalur jaringan pada bagian sebelumnya sudah aktif.
5. Jalankan DDL dan DML dari mesin yang sudah terhubung ke Fly 6PN:

   ```bash
   npm run db:setup
   ```

6. Deploy. Region Function dikunci ke Singapore (`sin1`) melalui `vercel.json` agar dekat dengan gateway/database di Singapore.

## Secret hygiene

- Jangan masukkan password ke source, `vercel.json`, atau `next.config.ts`.
- `flyio.conf` berisi private key yang setara dengan kredensial jaringan. Simpan di secret manager dan rotasi key bila file pernah ter-push atau dibagikan.
- Gunakan role PostgreSQL khusus aplikasi (read-only jika situs hanya membaca konten), bukan superuser `postgres`, untuk production.
- Setelah kredensial awal dipakai untuk setup, rotasi password yang pernah dibagikan melalui kanal percakapan.

## Perilaku saat database tidak tersedia

Production build tidak akan gagal hanya karena database privat belum dapat dijangkau. Aplikasi menampilkan bundled seed yang identik dengan DML dan mencatat warning di server log. Setelah koneksi aktif, render berikutnya membaca PostgreSQL; halaman utama direvalidasi setiap satu jam.
