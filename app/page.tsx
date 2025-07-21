"use client";

import { useResponsiveContext } from "@/contexts/responsive-context";
import { useTheme } from "next-themes";
import { Inter } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
import Glide from "@glidejs/glide";

const inter = Inter({ weight: "800", subsets: ["latin"] });

export default function Home() {
  const {
    isLowScreen,
    description,
    bannerPictures,
    quote,
    techStackType,
    projectData,
  } = useResponsiveContext();
  const { theme, systemTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (projectData.length === 0) return;
    projectData.forEach((project) => {
      new Glide(`#glide-${project.id}`, {
        type: "carousel",
        perView: 3,
        gap: 16,
      }).mount();
    });
  }, [projectData]);

  if (!mounted) {
    // Render nothing until mounted to avoid hydration mismatch
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const bgColor = currentTheme === "dark" ? "#18181B" : "#FBFAF9";
  const textColor = currentTheme === "dark" ? "#9B9BA4" : "#2E2E31";
  const bgColorStac = currentTheme === "dark" ? "#343434ff" : "#FFFFFF";

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
      <div className="py-16 w-full flex justify-center">
        <h1
          className={`${inter.className} text-4xl font-extrabold text-center whitespace-pre-line`}
        >
          {quote}
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid grid-cols-1 gap-4">
          {projectData.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl shadow-md p-6 space-y-4 transition-transform duration-300 hover:scale-105"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {project.project_name}
              </h2>
              <div className="glide" id={`glide-${project.id}`}>
                <div className="glide__track" data-glide-el="track">
                  <ul className="glide__slides">
                    {project.project_portfolios.map((imgUrl, index) => (
                      <li className="glide__slide" key={index}>
                        <img
                          src={imgUrl}
                          alt={`portfolio-${index}`}
                          className="w-32 h-32 object-cover rounded-lg border"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glide__bullets" data-glide-el="controls[nav]">
                  {project.project_portfolios.map((_, index) => (
                    <button
                      key={index}
                      className="glide__bullet"
                      data-glide-dir={`=${index}`}
                    ></button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.project_stacks.map((stack, index) => (
                  <span
                    key={index}
                    className="text-sm px-3 py-1 rounded-full font-medium"
                    style={{ backgroundColor: stack.color, color: "#fff" }}
                  >
                    {stack.stack_used}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 text-sm">
                {project.project_description}
              </p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {techStackType.map((item, index) => (
            <React.Fragment key={index}>
              {/* Judul Type - full width */}
              <div className="col-span-2 font-bold text-lg">{item.type}</div>

              {/* Tech Stacks */}
              {item.TECH_STACKs.map((stack, stackIndex) => (
                <div
                  style={{ backgroundColor: bgColorStac }}
                  key={stackIndex}
                  className="p-4 border rounded-xl shadow flex flex-col items-center duration-200 hover:cursor-pointer hover:scale-105 focus:scale-105"
                >
                  {stack.stack_used === "Next.js" && theme === "dark" ? (
                    <Image
                      src={"/tech-stack/next-js-dark.png"}
                      alt={stack.stack_used}
                      className="w-16 h-16 object-contain mb-2"
                      width={64}
                      height={64}
                    />
                  ) : stack.stack_used === "Shad CN" && theme === "dark" ? (
                    <Image
                      src={"/tech-stack/shad-cn-dark.png"}
                      alt={stack.stack_used}
                      className="w-16 h-16 object-contain mb-2"
                      width={64}
                      height={64}
                    />
                  ) : (
                    <Image
                      src={stack.stack_picture}
                      alt={stack.stack_used}
                      className="w-16 h-16 object-contain mb-2"
                      width={64}
                      height={64}
                    />
                  )}

                  <span>{stack.stack_used}</span>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
