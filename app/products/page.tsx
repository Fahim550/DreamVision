"use client";

import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/config/site";
import { products } from "@/data/product";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

const PAGE_SIZE = 8;

export default function ProductsPage() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const cat = useMemo(() => params?.get("cat") || "all", [params]);
  const [brand, setBrand] = useState<string>("all");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const allBrands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort(),
    [],
  );

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (brand !== "all" && p.brand !== brand) return false;
      if (q) {
        const t = q.toLowerCase();
        if (
          !p.name.toLowerCase().includes(t) &&
          !p.model.toLowerCase().includes(t) &&
          !p.shortDescription.toLowerCase().includes(t)
        )
          return false;
      }
      return true;
    });
  }, [cat, brand, q]);

  // useEffect(() => setPage(1), [cat, brand, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const setCategory = (key: string) => {
    const next = new URLSearchParams(params);
    if (key === "all") next.delete("cat");
    else next.set("cat", key);
    router.push(`${pathname}?${next.toString()}`);
    setPage(1);
  };

  return (
    <>
      <section className="border-b border-border bg-gradient-soft">
        <div className="container-tight py-12 sm:py-16">
          <span className="eyebrow">Catalogue</span>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Medical equipment catalogue
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Browse {products.length}+ devices across {categories.length}{" "}
            departments. Filter, request quotes, or talk to an engineer.
          </p>
        </div>
      </section>

      <section className="container-tight py-10">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card-soft">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Search
              </label>
              <div className="relative mt-2">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Monitor, ventilator, MC-9000…"
                  className="pl-9"
                />
                {q && (
                  <button
                    type="button"
                    onClick={() => setQ("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Category
                </p>
                <div className="mt-3 flex flex-col gap-1">
                  <button
                    onClick={() => setCategory("all")}
                    className={cn(
                      "rounded-md px-3 py-2 text-left text-sm transition-colors",
                      cat === "all"
                        ? "bg-primary-soft font-semibold text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    All categories
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => setCategory(c.key)}
                      className={cn(
                        "rounded-md px-3 py-2 text-left text-sm transition-colors",
                        cat === c.key
                          ? "bg-primary-soft font-semibold text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Brand
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => setBrand("all")}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs transition-colors",
                      brand === "all"
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-primary",
                    )}
                  >
                    All
                  </button>
                  {allBrands.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBrand(b)}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs transition-colors",
                        brand === b
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-primary",
                      )}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-primary/20 bg-primary-soft p-5 text-sm">
              <p className="font-display font-semibold text-primary">
                Need help choosing?
              </p>
              <p className="mt-1.5 text-primary/80">
                Our biomedical engineers can shortlist equipment for your
                project.
              </p>
              <Button asChild variant="cta" size="sm" className="mt-3">
                <Link href="/contact">Talk to an engineer</Link>
              </Button>
            </div>
          </aside>

          {/* Grid */}
          <div>
            <div className="mb-5 flex items-center justify-between text-sm">
              <p className="text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {visible.length}
                </span>{" "}
                of {filtered.length} products
              </p>
            </div>

            {visible.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card py-20 text-center">
                <p className="font-display text-lg font-semibold">
                  No products match your filters
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try clearing your search or selecting a different category.
                </p>
                <Button
                  onClick={() => {
                    setQ("");
                    setBrand("all");
                    setCategory("all");
                  }}
                  variant="cta"
                  className="mt-5"
                >
                  Reset filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={cn(
                      "h-9 w-9 rounded-md text-sm font-semibold transition-colors",
                      page === i + 1
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
