"use client";
import Image from "next/image";
import Link from "next/link";
import Artistly from "@/assets/artistly.png";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";

const navlinks = [
  { label: "Home", to: "/" },
  { label: "Explore", to: "/explore" },
  { label: "Onboarding", to: "/onboarding" },
];

export function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setHasScrolled(window.scrollY > 50);
  }, []);

  return (
    <header
      className={cn(
        "text-white fixed top-0 bg-transparent z-50 flex justify-between items-center left-0 right-0 transition-all duration-1000 ease-in-out",
        hasScrolled && "bg-black/40 backdrop-blur-md",
        menuOpen && "max-md:bg-black",
      )}
    >
      <div className="justify-between items-center max-w-7xl p-6 mx-auto w-full flex">
        <Link href="/" className="text-2xl font-bold">
          <Image
            src={Artistly}
            width={96}
            className="w-20 md:w-24"
            alt="Artistly"
          />
        </Link>

        <button
          className="md:hidden block focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <MenuIcon className="size-6" />
        </button>

        <ul className="space-x-4 hidden md:flex">
          {navlinks.map((link) => (
            <li key={link.label}>
              <Link href={link.to} className="cursor-pointer px-4 py-2 rounded">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {menuOpen && (
        <ul className="md:hidden absolute top-full w-full px-6 py-4 space-y-2 bg-black">
          {navlinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.to}
                className="block px-4 py-2 rounded"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
