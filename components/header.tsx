"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, PenLine } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { HeaderLogo } from "./logos/header-logo";

export default function Header({
  social_linkedin,
  social_medium,
  social_email,
}: {
  social_linkedin: string;
  social_medium: string;
  social_email: string;
}) {
  const { setTheme } = useTheme();

  return (
    <header className="z-30 fixed w-full border-b-1">
      <nav
        className="relative mx-auto flex min-h-[10vh] justify-between items-center p-2 py-4 px-6 lg:px-4 border-b-2 border-slate-200"
        aria-label="Global"
      >
        <div className="flex gap-2 z-10">
          <Link href={social_linkedin} target="_blank">
            <Button className="cursor-pointer" variant="outline" size="icon">
              <Linkedin className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={social_medium} target="_blank">
            <Button className="cursor-pointer" variant="outline" size="icon">
              <PenLine className="h-4 w-4" />
            </Button>
          </Link>
          <a href={social_email} target="_blank">
            <Button className="cursor-pointer" variant="outline" size="icon">
              <Mail className="h-4 w-4" />
            </Button>
          </a>
        </div>
        <div
          id="logo"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Link href="/" className="inline-block p-1.5">
            <span className="sr-only">Poncosh</span>
            <HeaderLogo />
          </Link>
        </div>
        <div className="flex items-center z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
