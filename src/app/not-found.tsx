import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p>404</p>
      <h1>Ceritanya belum ditulis.</h1>
      <Link href="/">Kembali ke beranda</Link>
    </main>
  );
}

