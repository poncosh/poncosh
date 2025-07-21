"use client";

import TechProjectInt from "@/models/types/tech-project-int";
import TechStackInt from "@/models/types/tech-stack-int";
import { createContext, useContext, useEffect, useState } from "react";

const ResponsiveContext = createContext<{
  isLowScreen: boolean;
  description: string;
  bannerPictures: string[];
  quote: string;
  techStackType: Array<TechStackInt>;
  projectData: TechProjectInt[];
}>({
  isLowScreen: false,
  description: "",
  bannerPictures: [],
  quote: "",
  techStackType: [],
  projectData: [],
});

export function useResponsiveContext() {
  return useContext(ResponsiveContext);
}

export default function ResponsiveProvider({
  children,
  description,
  bannerPictures,
  quote,
  techStackType,
  projectData,
}: {
  children: React.ReactNode;
  description: string;
  bannerPictures: string[];
  quote: string;
  techStackType: Array<TechStackInt>;
  projectData: TechProjectInt[];
}) {
  const isClient = typeof window !== "undefined";

  const [isValidLowScreen, setIsValidLowScreen] = useState<boolean>(
    isClient ? window.innerWidth < 768 : false
  );

  const exportedVal = {
    isLowScreen: isValidLowScreen,
    description: description,
    bannerPictures: bannerPictures,
    quote: quote,
    techStackType: techStackType,
    projectData: projectData,
  };

  return (
    <ResponsiveContext.Provider value={exportedVal}>
      {children}
    </ResponsiveContext.Provider>
  );
}
