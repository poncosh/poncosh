"use client";

import { useResponsiveContext } from "@/contexts/responsive-context";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const { isLowScreen, description, bannerPictures } = useResponsiveContext();
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

  const translateX = isLowScreen ? -120 : -322;
  const overflowClass = isLowScreen ? "overflow-x-hidden" : "overflow-x-hidden";

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="mx-4 px-14 md:mx-32 md:px-44 flex flex-col gap-12 pt-32 md:pt-32 min-h-screen border-r-2 border-l-2 border-black-800 shadow-sm"
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
      <div
        className={`relative ${overflowClass} w-screen h-[200px] md:h-[600px] flex items-center`}
        style={{
          transform: `translateX(${translateX}px)`,
          width: isLowScreen ? "calc(100vw + 46px)" : "calc(100vw)",
        }}
      >
        {/* Konten dalamnya bebas tanpa crop */}
        <div
          className={`
        w-full flex gap-4 md:gap-8 h-[150px] md:h-[520px]
        ${isLowScreen ? "px-4" : "px-0"} 
        snap-x snap-mandatory 
      `}
        >
          {bannerPictures?.map((picture, index) => (
            <div
              key={index}
              className={`
            flex-shrink-0 snap-center w-[100px] h-[150px] md:w-[360px] md:h-[520px]
          `}
            >
              <Image
                className={`
              w-full h-full object-cover rounded-lg
              ${index % 2 === 0 ? "rotate-[5deg]" : "-rotate-[5deg]"}
            `}
                src={picture}
                alt={`Banner ${index + 1}`}
                width={isLowScreen ? 200 : 400}
                height={isLowScreen ? 300 : 600}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
