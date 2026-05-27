"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "@/public/image/logo.png";
import {
  Award,
  ExternalLink,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  LogOut,
  Package,
  Tags,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

const items = [
  { href: "/admin", end: true, label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/brands", label: "Brands", icon: Award },
];

import Image from "next/image";
import type { ReactNode } from "react";

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-surface">
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border bg-card">
        <div className="h-16 px-5 flex items-center border-b border-border">
          <Link
            href="/admin"
            className="font-display font-bold text-lg flex items-center gap-2"
          >
            <Image
              src={Logo}
              alt="Logo"
              className="h-10 w-10 shadow-md rounded-md object-contain "
            />
            Dream Vision Admin
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {items.map(({ href, end, label, icon: Icon }) => {
            const isActive = end
              ? pathname === href
              : pathname?.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-soft text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-muted"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View public site
          </a>
          <div className="text-xs text-muted-foreground px-3 truncate">
            {user?.email}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden sticky top-0 z-30 h-14 border-b border-border bg-card px-4 flex items-center justify-between">
          <Link href="/admin" className="font-display font-bold">
            MediCore Admin
          </Link>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
          </Button>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
