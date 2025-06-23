"use client";
import Image from "next/image";
import Link from "next/link";
import Artistly from "@/assets/artistly.png";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navlinks = [
  { label: "Home", to: "/" },
  { label: "Explore", to: "/explore" },
  { label: "Onboarding", to: "/onboarding" },
];

export function HeroNavbar() {
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setHasScrolled]);
  return (
    <header
      className={cn(
        "text-white fixed top-0 bg-transparent z-50 flex justify-between items-center left-0 right-0 transition-all duration-1000 ease-in-out",
        hasScrolled && "bg-black/40 backdrop-blur-md",
      )}
    >
      <div className="flex justify-between items-center max-w-7xl p-6 mx-auto w-full">
        <Link href="/" className="text-2xl font-bold">
          <Image src={Artistly} width={96} alt="Artistly" />
        </Link>
        <ul className="flex space-x-4">
          {navlinks.map((link) => (
            <li key={link.label}>
              <Link href={link.to} className="cursor-pointer px-4 py-2 rounded">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
