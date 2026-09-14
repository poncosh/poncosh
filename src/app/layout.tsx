import type { Metadata } from "next";
import "./globals.css";

const themeInitializer = `
  (function () {
    try {
      var saved = localStorage.getItem("portfolio-theme");
      var theme = saved === "light" || saved === "dark"
        ? saved
        : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch (_) {}
  })();
`;

export const metadata: Metadata = {
  title: {
    default: "Satrio Ponco Sushadi — Software Engineer",
    template: "%s — Satrio Ponco Sushadi",
  },
  description: "A storyteller and software engineer at BNI, based in Jakarta.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "Satrio Ponco Sushadi",
    description: "A storyteller and software engineer.",
    images: [{ url: "/front-photo.png", width: 1254, height: 1254 }],
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
