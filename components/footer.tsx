import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer({
  social_github,
  social_email,
  social_twitter,
}: {
  social_github: string;
  social_email: string;
  social_twitter: string;
}) {
  return (
    <footer className="py-8 px-4 mt-2 md:mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
        {/* Brand / Logo */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">Poncosh</h2>
          <p className="text-sm mt-2 text-gray-400">
            © 2025 Poncosh. All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <Link target="_blank" href={social_email}>
            Contact
          </Link>
        </div>

        {/* Social Media */}
        <div className="flex gap-4">
          <Link href={social_twitter} aria-label="Twitter">
            <Button className="cursor-pointer" variant="outline" size="icon">
              <Twitter className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={social_github} aria-label="GitHub">
            <Button className="cursor-pointer" variant="outline" size="icon">
              <Github className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
}
