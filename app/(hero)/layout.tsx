import { HeroNavbar } from "@/components/navbar";

export default function HeroLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <HeroNavbar />
      {children}
    </div>
  );
}
