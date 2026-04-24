"use client";

import { Button } from "@/components/ui/button";
import { nav, site } from "@/config/site";
import { cn } from "@/lib/utils";
import LogoImage from "@/public/image/logo-png.png";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Logo = () => (
  <Link
    href="/"
    className="flex items-center pt-2 h-50 w-50"
    aria-label={site.name}
  >
    <Image src={LogoImage} alt={site.name} width={500} height={500} />
  </Link>
);

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden bg-primary text-primary-foreground/90 lg:block">
        <div className="container-tight flex h-9 items-center justify-between text-xs">
          <span>
            Trusted by {site.hospitalsServed}+ hospitals across{" "}
            {site.countriesServed} countries
          </span>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${site.phone}`}
              className="flex items-center gap-1.5 hover:text-primary-foreground"
            >
              <Phone className="h-3.5 w-3.5" /> {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="hover:text-primary-foreground"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b transition-all duration-300",
          scrolled
            ? "border-border/80 bg-background/85 backdrop-blur-xl shadow-sm"
            : "border-transparent bg-background/70 backdrop-blur-md",
        )}
      >
        <div className="container-tight flex h-[var(--header-height)] items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm font-medium",
                  pathname === item.href
                    ? "bg-primary-soft text-primary"
                    : "text-foreground/80 hover:bg-primary-soft hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="primary_cta"
              size="default"
              className="hidden sm:inline-flex"
            >
              <Link href="/quote">
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-primary-soft lg:hidden"
              aria-label="Toggle navigation"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-border bg-background lg:hidden">
            <div className="container-tight flex flex-col gap-1 py-3">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm font-medium",
                    pathname === item.href
                      ? "bg-primary-soft text-primary"
                      : "text-foreground/80 hover:bg-primary-soft hover:text-primary",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                asChild
                variant="default"
                className="mt-2 w-full"
                onClick={() => setOpen(false)}
              >
                <Link href="/quote">Request a Quote</Link>
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
