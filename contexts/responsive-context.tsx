"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ResponsiveContext = createContext<{
  isLowScreen: boolean;
  description: string;
  bannerPictures: string[];
  quote: string;
}>({
  isLowScreen: false,
  description: "",
  bannerPictures: [],
  quote: "",
});

export function useResponsiveContext() {
  return useContext(ResponsiveContext);
}

export default function ResponsiveProvider({
  children,
  description,
  bannerPictures,
  quote,
}: {
  children: React.ReactNode;
  description: string;
  bannerPictures: string[];
  quote: string;
}) {
  const [isClient, setIsClient] = useState(
    typeof window !== "undefined" ? true : false
  );

  const [isValidLowScreen, setIsValidLowScreen] = useState<boolean>(
    isClient ? window.innerWidth < 768 : false
  );

  const exportedVal = {
    isLowScreen: isValidLowScreen,
    description: description,
    bannerPictures: bannerPictures,
    quote: quote,
  };

  useEffect(() => {
    setIsClient(true);

    const handleResize = () => {
      setIsValidLowScreen(window.innerWidth < 768);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [768]);

  return (
    <ResponsiveContext.Provider value={exportedVal}>
      {children}
    </ResponsiveContext.Provider>
  );
}
