import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl, siteUrl } from "@/lib/site";
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
  description: "Portfolio Satrio Ponco Sushadi, seorang storyteller dan software engineer di BNI yang berbasis di Jakarta.",
  applicationName: "Satrio Ponco Sushadi — Portfolio",
  authors: [{ name: "Satrio Ponco Sushadi", url: "https://github.com/poncosh" }],
  creator: "Satrio Ponco Sushadi",
  publisher: "Satrio Ponco Sushadi",
  category: "technology",
  keywords: [
    "Satrio Ponco Sushadi",
    "software engineer Indonesia",
    "software engineer BNI",
    "Next.js developer",
    "Go developer",
    "TypeScript developer",
    "Jakarta software engineer",
    "portfolio software engineer",
  ],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Satrio Ponco Sushadi",
    description: "A storyteller and software engineer.",
    url: siteUrl,
    siteName: "Satrio Ponco Sushadi — Portfolio",
    locale: "id_ID",
    images: [{ url: absoluteUrl("/front-photo.png"), width: 1254, height: 1254, alt: "Satrio Ponco Sushadi" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Satrio Ponco Sushadi",
    description: "A storyteller and software engineer.",
    images: [absoluteUrl("/front-photo.png")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
      </head>
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
