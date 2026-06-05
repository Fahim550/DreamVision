"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "@/public/image/logo.png";
import React from "react";

import {
  Award,
  ExternalLink,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Tags,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
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
import { type ReactNode } from "react";

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Redirect if not authenticated or not admin
  React.useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push("/login");
    }
  }, [user, isAdmin, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-muted-foreground border-t-primary rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Prevent rendering admin content if not authenticated or not admin
  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-surface">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed md:relative w-60 shrink-0 flex flex-col border-r border-border bg-card z-40 h-screen md:h-auto transition-transform duration-300 md:transition-none overflow-y-auto",
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0",
        )}
      >
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
                onClick={() => setMobileMenuOpen(false)}
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
        <header className="md:hidden sticky top-0 z-40 h-14 border-b border-border bg-card px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={Logo}
              alt="Logo"
              className="h-10 w-10 shadow-md rounded-md object-contain "
            />
            <Link href="/admin" className="font-display font-bold">
              Dream Vision Admin
            </Link>
          </div>
          {/* <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
          </Button> */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
