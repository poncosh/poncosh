// components/MobileDropdownMenu.tsx
"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LucideProps, Menu, X } from "lucide-react";
import Link from "next/link";

export function MobileDropdownMenu({
  social_linkedin,
  social_medium,
  social_email,
  Linkedin,
  Mail,
  PenLine,
}: {
  social_linkedin: string;
  social_medium: string;
  social_email: string;
  Linkedin: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  Mail: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  PenLine: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[20px]">
        <DropdownMenuItem asChild>
          <Link href={social_linkedin} target="_blank">
            <Button className="cursor-pointer" variant="outline" size="icon">
              <Linkedin className="h-4 w-4" />
            </Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={social_medium} target="_blank">
            <Button className="cursor-pointer" variant="outline" size="icon">
              <PenLine className="h-4 w-4" />
            </Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={social_email} target="_blank">
            <Button className="cursor-pointer" variant="outline" size="icon">
              <Mail className="h-4 w-4" />
            </Button>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
