"use client";

import { useResponsiveContext } from "@/contexts/responsive-context";

export default async function Home() {
  const { description } = useResponsiveContext();
  return <div>{description}</div>;
}
