"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

export function HeaderLogo() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render nothing until mounted to avoid hydration mismatch
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const logoSrc =
    currentTheme === "dark" ? "/poncosh-logo-dark.png" : "/poncosh-logo.png";

  return (
    <Image src={logoSrc} alt="Poncosh Logo" width={150} height={40} priority />
  );
}
