export const dynamic = "force-dynamic";

import LandingPage from "@/models/LandingPage";
import SystemParameter from "@/models/SystemParameter";
import LandingPageType from "@/models/types/landing-page-types";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../contexts/theme-provider";
import ResponsiveProvider from "@/contexts/responsive-context";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Satrio Ponco Sushadi - Software Engineer",
  description:
    "A personal website of Satrio Ponco Sushadi, showcasing my work and interests in software engineering.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const param = await SystemParameter.findOne({
    where: { name: "LP_VER" },
  });

  if (!param) {
    return <div>Parameter not found</div>;
  }

  const version = param.value;

  const landingPage = await LandingPage.findOne({
    where: { version },
  });

  if (!landingPage) {
    return <div>Landing page not found for version {version}</div>;
  }

  const landingPageData: LandingPageType = landingPage.toJSON();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ResponsiveProvider description={landingPageData.description}>
            <Header
              social_linkedin={landingPageData.social_linkedin}
              social_medium={landingPageData.social_medium}
              social_email={landingPageData.social_email}
              social_github={landingPageData.social_github}
            />
            <div>{children}</div>
          </ResponsiveProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
