"use client";

import { useResponsiveContext } from "@/contexts/responsive-context";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const { isLowScreen, description } = useResponsiveContext();
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
  const bgColor = currentTheme === "dark" ? "#18181B" : "#FBFAF9";
  const textColor = currentTheme === "dark" ? "#9B9BA4" : "#2E2E31";

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="mx-4 px-14 md:mx-32 md:px-44 flex flex-col gap-4 pt-28 md:pt-32 min-h-screen border-r-2 border-l-2 border-black-800 shadow-sm"
    >
      <div className="flex flex-wrap md:flex-nowrap items-start gap-2 md:gap-10 w-full">
        <Image
          className="w-auto h-auto object-contain"
          src="/icon/satrio-icon.png"
          alt="Satrio Icon"
          width={isLowScreen ? 50 : 100}
          height={isLowScreen ? 50 : 100}
        />
        {!isLowScreen ? (
          <div className="flex flex-col gap-2 min-w-[200px] flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-end">
              Lifelong learner, software engineer
            </h1>
            <p
              className="text-sm sm:text-base text-end"
              style={{ color: textColor }}
            >
              {description}
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold text-end flex-1 min-w-[140px]">
              Lifelong learner, software engineer
            </h1>
            <p className="w-full mt-2 text-end" style={{ color: textColor }}>
              {description}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
