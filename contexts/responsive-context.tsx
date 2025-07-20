"use client";

import { createContext, useContext, useState } from "react";

const ResponsiveContext = createContext<{
  isLowScreen: boolean;
  description: string;
}>({
  isLowScreen: false,
  description: "",
});

export function useResponsiveContext() {
  return useContext(ResponsiveContext);
}

export default function ResponsiveProvider({
  children,
  description,
}: {
  children: React.ReactNode;
  description: string;
}) {
  const isClient = typeof window !== "undefined";

  const [isValidLowScreen] = useState<boolean>(
    isClient ? window.innerWidth < 768 : false
  );

  const exportedVal = {
    isLowScreen: isValidLowScreen,
    description: description,
  };

  return (
    <ResponsiveContext.Provider value={exportedVal}>
      {children}
    </ResponsiveContext.Provider>
  );
}
