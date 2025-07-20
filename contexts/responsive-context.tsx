"use client";

import { createContext, useContext, useState } from "react";

const ResponsiveContext = createContext<{
  isLowScreen: boolean;
}>({
  isLowScreen: false,
});

export function useResponsiveContext() {
  return useContext(ResponsiveContext);
}

export default function ResponsiveProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isClient = typeof window !== "undefined";

  const [isValidLowScreen] = useState<boolean>(
    isClient ? window.innerWidth < 768 : false
  );

  const exportedVal = {
    isLowScreen: isValidLowScreen,
  };

  return (
    <ResponsiveContext.Provider value={exportedVal}>
      {children}
    </ResponsiveContext.Provider>
  );
}
