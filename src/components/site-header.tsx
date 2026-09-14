import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader({ emailUrl }: { emailUrl: string }) {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Satrio Ponco Sushadi — beranda">
        <span>S.</span> Ponco
      </Link>
      <nav aria-label="Navigasi utama">
        <Link href="/#projects">Work</Link>
        <Link href="/#journal">Journal</Link>
        <Link href="/#about">About</Link>
      </nav>
      <div className="header-actions">
        <ThemeToggle />
        <a className="say-hello" href={emailUrl}>Let&apos;s talk <span>↗</span></a>
      </div>
    </header>
  );
}
