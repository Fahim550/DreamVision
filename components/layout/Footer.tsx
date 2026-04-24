import { categories, nav, site } from "@/config/site";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-tight grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-cta">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v6M12 16v6M2 12h6M16 12h6" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <span className="font-display text-lg font-bold">
              MediCore Equipment
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            {site.description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="transition-colors hover:text-primary"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Categories</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {categories.map((c) => (
              <li key={c.key}>
                <Link
                  href={`/products?cat=${c.key}`}
                  className="transition-colors hover:text-primary"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Get in touch
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{" "}
              {site.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-primary" />{" "}
              <a href={`tel:${site.phone}`} className="hover:text-primary">
                {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-primary" />{" "}
              <a href={`mailto:${site.email}`} className="hover:text-primary">
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-primary" /> {site.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-tight flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary">
              ISO 13485
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
