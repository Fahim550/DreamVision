"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type CategoryKey } from "@/config/site";
import type { ProductBlock } from "@/data/product";
import { cn } from "@/lib/utils";
import type { Json } from "@/types/types";
import { createClient } from "@/utils/supabase/client";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 6;

interface DatabaseProduct {
  id: string;
  name: string;
  model: string | null;
  slug: string;
  short_description: string | null;
  images: Json;
  highlights: Json;
  brand_id: string | null;
  category_id: string | null;
  featured: boolean;
  brochure_url: string | null;
  blocks: Json;
  // We'll add these as we fetch the related data
  brand?: string | null;
  category?: string | null;
  categorySlug?: string | null;
}

export default function ProductsPage() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const cat = useMemo(() => params?.get("cat") || "all", [params]);
  const [brand, setBrand] = useState<string>("all");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<DatabaseProduct[]>([]);
  const [categories, setCategories] = useState<
    Array<{ key: string; name: string }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories and products from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const supabase = createClient();

        // Fetch categories
        const { data: catData, error: catError } = await supabase
          .from("categories")
          .select("slug, name")
          .order("sort_order", { ascending: true });

        if (catError) {
          throw catError;
        }

        const fetchedCategories =
          (catData as Array<Record<string, unknown>>) || [];
        const mappedCategories = fetchedCategories.map((cat) => ({
          key: (cat.slug as string) || "",
          name: (cat.name as string) || "",
        }));
        setCategories(mappedCategories);

        // Fetch products with brand and category names
        const { data: prodData, error: prodError } = await supabase
          .from("products")
          .select(
            `
            id,
            name,
            model,
            slug,
            short_description,
            images,
            highlights,
            featured,
            brochure_url,
            blocks,
            category_id,
            brands (name),
            categories (slug)
          `,
          )
          .eq("published", true);

        if (prodError) {
          throw prodError;
        }

        // TypeScript doesn't know about the database schema, so we cast and map
        const typedData = (prodData as Array<Record<string, unknown>>) || [];
        const mappedProducts: DatabaseProduct[] = typedData.map((item) => ({
          id: (item.id as string) || "",
          name: (item.name as string) || "",
          model: (item.model as string | null) || null,
          slug: (item.slug as string) || "",
          short_description: (item.short_description as string | null) || null,
          images: (item.images as Json) || [],
          highlights: (item.highlights as Json) || [],
          brand_id: (item.brand_id as string | null) || null,
          category_id: (item.category_id as string | null) || null,
          featured: (item.featured as boolean) || false,
          brochure_url: (item.brochure_url as string | null) || null,
          blocks: (item.blocks as Json) || [],
          brand: item.brands
            ? ((item.brands as Record<string, unknown>).name as string) || null
            : null,
          categorySlug: item.categories
            ? ((item.categories as Record<string, unknown>).slug as string) ||
              null
            : null,
          category: null,
        }));

        setProducts(mappedProducts);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load products. Please try again later.");
        setProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const allBrands = useMemo(() => {
    const brandSet = new Set<string>();
    products.forEach((p) => {
      if (p.brand) brandSet.add(p.brand);
    });
    return Array.from(brandSet).sort();
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (cat !== "all" && p.categorySlug !== cat) return false;
      if (brand !== "all" && p.brand !== brand) return false;
      if (q) {
        const t = q.toLowerCase();
        if (
          !p.name.toLowerCase().includes(t) &&
          !p.model?.toLowerCase().includes(t) &&
          !p.short_description?.toLowerCase().includes(t)
        )
          return false;
      }
      return true;
    });
  }, [cat, brand, q, products]);

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
            {loading ? (
              "Loading products..."
            ) : error ? (
              <span className="text-red-600">{error}</span>
            ) : (
              <>
                Browse {products.length}+ devices across {categories.length}{" "}
                categories. Filter, request quotes, or talk to an engineer.
              </>
            )}
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
            {loading ? (
              <div className="rounded-2xl border border-dashed border-border bg-card py-20 text-center">
                <p className="font-display text-lg font-semibold">
                  Loading products...
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Please wait while we fetch your products.
                </p>
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-dashed border-red-300 bg-red-50 py-20 text-center">
                <p className="font-display text-lg font-semibold text-red-700">
                  Unable to load products
                </p>
                <p className="mt-1 text-sm text-red-600">{error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  variant="cta"
                  className="mt-5"
                >
                  Try again
                </Button>
              </div>
            ) : (
              <>
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
                      Try clearing your search or selecting a different
                      category.
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
                    {visible.map((p) => {
                      // Convert images and highlights from JSON arrays to strings
                      const images = Array.isArray(p.images)
                        ? (p.images as string[])
                        : [];
                      const highlights = Array.isArray(p.highlights)
                        ? (p.highlights as string[])
                        : [];
                      const blocks = Array.isArray(p.blocks)
                        ? (p.blocks as ProductBlock[])
                        : [];

                      return (
                        <ProductCard
                          key={p.slug}
                          product={{
                            slug: p.slug,
                            name: p.name,
                            model: p.model || "",
                            brand: p.brand || "Unknown",
                            category: (p.categorySlug ||
                              "diagnostic") as CategoryKey,
                            shortDescription: p.short_description || "",
                            highlights,
                            images,
                            brochureUrl: p.brochure_url || undefined,
                            featured: p.featured,
                            blocks: blocks,
                          }}
                        />
                      );
                    })}
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
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
