"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { usePathname } from "next/navigation";
import { WhatsAppFab } from "./WhatsAppFab";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin =
    pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  return (
    <>
      {!isAdmin && <Header />}
      {children}
      {!isAdmin && <WhatsAppFab />}
      {!isAdmin && <Footer />}
    </>
  );
}
