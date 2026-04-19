import { categories } from "@/config/site";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Category() {
  return (
    <div>
      <section className="container-tight py-20 sm:py-24">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">Equipment categories</span>
            <h2 className="section-title mt-3">
              Solutions for every department
            </h2>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            View all products{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.key}
                href={`/products?cat=${c.key}`}
                style={{ animationDelay: `${i * 60}ms` }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated animate-fade-up"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="h-20 w-24 overflow-hidden rounded-lg bg-gradient-soft">
                    <Image
                      src={c.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-contain p-1"
                    />
                  </div>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                  {c.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Explore{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
