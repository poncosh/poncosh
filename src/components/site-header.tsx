"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const navigation = [
  { href: "/", label: "Home", index: "01" },
  { href: "/blog", label: "Blog", index: "02" },
  { href: "/about", label: "About", index: "03" },
];

export function SiteHeader({ emailUrl = "mailto:satrioppp98@gmail.com" }: { emailUrl?: string }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Satrio Ponco Sushadi — beranda">
          <span>S.</span> Ponco
        </Link>

        <nav className="desktop-nav" aria-label="Navigasi utama">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <a className="say-hello" href={emailUrl}>Let&apos;s talk <span>↗</span></a>
          <button
            ref={menuButtonRef}
            className="menu-toggle"
            type="button"
            aria-label="Buka menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`menu-layer${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
        <button className="menu-scrim" type="button" tabIndex={-1} aria-label="Tutup menu" onClick={closeMenu} />
        <aside id="mobile-menu" className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Menu utama">
          <div className="drawer-head">
            <span>Navigate</span>
            <button ref={closeButtonRef} className="menu-close" type="button" aria-label="Tutup menu" onClick={closeMenu}>
              <span />
              <span />
            </button>
          </div>

          <nav aria-label="Navigasi mobile">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={closeMenu}
              >
                <small>{item.index}</small>
                <span>{item.label}</span>
                <i aria-hidden="true">↗</i>
              </Link>
            ))}
          </nav>

          <div className="drawer-foot">
            <p>Have a story to build?</p>
            <a href={emailUrl} onClick={closeMenu}>Let&apos;s talk <span>↗</span></a>
          </div>
        </aside>
      </div>
    </>
  );
}
