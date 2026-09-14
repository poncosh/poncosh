<p align="center">
  <img src="./docs/assets/readme-hero.svg" width="100%" alt="Satrio Ponco Sushadi — A storyteller and software engineer" />
</p>

<h1 align="center">Satrio Ponco Sushadi — Portfolio</h1>

<p align="center">
  A database-powered personal space for selected work, life in frames, and stories about learning.
</p>

<p align="center">
  <a href="https://github.com/poncosh"><img alt="GitHub" src="https://img.shields.io/badge/GitHub-poncosh-171714?style=for-the-badge&logo=github&logoColor=white" /></a>
  <a href="mailto:satrioppp98@gmail.com"><img alt="Email" src="https://img.shields.io/badge/Email-Let's_talk-dbff45?style=for-the-badge&logo=gmail&logoColor=171714" /></a>
  <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js-16-171714?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-Fly.io-336791?style=for-the-badge&logo=postgresql&logoColor=white" />
</p>

---

## The story

Portfolio ini adalah rumah digital untuk **Satrio Ponco Sushadi**, software engineer di BNI yang senang mengeksplorasi teknologi, menulis cerita dari proses belajar, dan bermain fun football. Tampilannya memakai pendekatan editorial: tipografi besar, komposisi foto yang ekspresif, serta ruang yang memberi setiap cerita kesempatan untuk bernapas.

Konten profil, sosial media, galeri, proyek, skill, pengalaman, dan journal dikelola melalui PostgreSQL. Saat database privat belum dapat dijangkau pada build, aplikasi memakai bundled seed yang identik agar preview tetap hidup.

## What lives here

| | Pengalaman |
| --- | --- |
| **Editorial hero** | Perkenalan personal dengan tipografi ekspresif dan foto utama. |
| **Life lately** | Lima foto dalam ribbon responsif yang dapat digeser di mobile. |
| **Selected work** | BNIdirect Bisnis, OASE BNI, skill SVG, dan pengalaman CI/CD. |
| **Field notes** | Journal dengan halaman artikel statis yang bersumber dari database. |
| **Light & dark** | Mengikuti tema sistem, dapat diganti manual, dan tersimpan di browser. |
| **Search-ready** | Canonical metadata, Open Graph, JSON-LD, image sitemap, dan robots policy. |
| **Resilient data** | PostgreSQL sebagai sumber utama dengan fallback read-only untuk build. |

## Built with

<p>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB" />
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white" />
  <img alt="Drizzle ORM" src="https://img.shields.io/badge/Drizzle_ORM-0.45-C5F74F?style=flat-square&logo=drizzle&logoColor=171714" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-16+-4169E1?style=flat-square&logo=postgresql&logoColor=white" />
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-ready-000000?style=flat-square&logo=vercel&logoColor=white" />
</p>

- **Frontend:** Next.js App Router, React Server Components, TypeScript, CSS.
- **Data:** PostgreSQL, Drizzle ORM, idempotent DDL dan DML.
- **Media:** `next/image` untuk seluruh foto raster, SVG untuk seluruh ikon skill.
- **Delivery:** Vercel di region Singapore, Nginx TCP gateway, dan database privat pada Fly.io.

## Architecture

```mermaid
flowchart LR
    U([Visitor]) --> V[Vercel CDN<br/>Next.js]
    V -->|PostgreSQL over TLS| N[Nginx stream<br/>public gateway]
    N -->|WireGuard flyio| D[(Fly PostgreSQL<br/>portfolio schema)]
    V -. database unavailable .-> S[Bundled seed<br/>read-only fallback]
```

Halaman utama memakai ISR selama satu jam. Pool production dibatasi satu koneksi per instance untuk menjaga database portfolio tetap ringan.

## Run it locally

Persyaratan: Node.js 24+, PostgreSQL, dan WireGuard aktif apabila memakai hostname Fly `.internal`.

```bash
npm install
cp .env.example .env
npm run db:setup
npm run dev
```

Untuk PowerShell, gunakan `Copy-Item .env.example .env` sebagai pengganti `cp`.

Buka [http://localhost:3000](http://localhost:3000). Jangan commit `.env` atau `flyio.conf`; keduanya sudah dikecualikan melalui `.gitignore`.

### Environment

| Variable | Required | Fungsi |
| --- | :---: | --- |
| `DATABASE_URL` | Production | PostgreSQL connection string yang disimpan sebagai secret. |
| `DATABASE_SSL` | No | Isi `true` untuk koneksi TLS end-to-end melalui gateway. |
| `DATABASE_POOL_MAX` | No | Maksimum koneksi pool per instance; default `15`. |
| `DATABASE_CONNECTION_TIMEOUT_MS` | No | Batas membuka koneksi; default `5000`. |
| `DATABASE_IDLE_TIMEOUT_MS` | No | Tutup koneksi idle setelah `30000` ms. |
| `DATABASE_STATEMENT_TIMEOUT_MS` | No | Batalkan statement setelah `15000` ms. |
| `DATABASE_MAX_LIFETIME_SECONDS` | No | Rotasi koneksi setelah `300` detik. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | URL production untuk metadata dan Open Graph. |

`NEXT_PUBLIC_SITE_URL` juga menjadi sumber canonical URL, `sitemap.xml`, dan `robots.txt`. Di Vercel, aplikasi dapat memakai `VERCEL_PROJECT_PRODUCTION_URL` secara otomatis bila nilai tersebut tidak diatur manual.

## Database workflow

```bash
npm run db:migrate  # membuat schema dan tabel
npm run db:seed     # menyelaraskan seed dengan upsert
npm run db:setup    # menjalankan keduanya
```

| Resource | Lokasi |
| --- | --- |
| Drizzle schema | [`src/db/schema.ts`](src/db/schema.ts) |
| DDL migration | [`drizzle/0000_portfolio.sql`](drizzle/0000_portfolio.sql) |
| DML seed | [`drizzle/seed.sql`](drizzle/seed.sql) |
| Data access | [`src/data/portfolio.ts`](src/data/portfolio.ts) |

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Deploying

`portfolio-poncosh.internal` hanya tersedia melalui private network Fly 6PN. Vercel mengakses Nginx TCP gateway publik, sedangkan gateway menjalankan WireGuard dan meneruskan koneksi ke hostname internal. WireGuard tidak dijalankan di dalam Vercel Function.

Panduan deployment tersedia di **[Deployment Guide](docs/DEPLOYMENT.md)** dan template server siap salin berada di **[Gateway Guide](infra/gateway/README.md)**.

---

<p align="center">
  Designed and engineered with curiosity in Jakarta.<br />
  <strong>© 2026 Satrio Ponco Sushadi</strong>
</p>
