"use client";

import type { Product } from "@/data/product";
import { DBProduct, fetchProducts } from "@/lib/queries";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductCard } from "../product/ProductCard";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

function mapDbToProduct(row: DBProduct): Product {
  return {
    slug: row.slug,
    name: row.name,
    model: row.model ?? "",
    brand: row.brand?.name ?? "",
    category: (row.category?.slug ?? "") as any,
    shortDescription: row.short_description ?? "",
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    images: Array.isArray(row.images) ? row.images : [],
    brochureUrl: row.brochure_url ?? undefined,
    featured: !!row.featured,
    blocks: Array.isArray(row.blocks) ? row.blocks : [],
  };
}

export default function FeatureProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchProducts()
      .then((rows) => {
        if (!mounted) return;
        const featured = rows.filter((r) => r.featured).map(mapDbToProduct);
        setProducts(featured);
      })
      .catch((err) => {
        console.error("Failed to load products", err);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="bg-surface  py-20 sm:py-24 w-full">
      <div className="container-tight">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">Featured products</span>
            <h2 className="section-title mt-3">
              Handpicked by our biomedical team
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/products">
              All products <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading...</div>
          ) : (
            <Carousel className="w-full" opts={{ align: "start", loop: false }}>
              <CarouselContent className="-ml-4">
                {products.map((p) => (
                  <CarouselItem
                    key={p.slug}
                    className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4"
                  >
                    <ProductCard product={p} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious
                className="
    left-2 sm:-left-12
    h-8 w-8 sm:h-10 sm:w-10
    bg-background/80 backdrop-blur
    border shadow-md
    z-10 cursor-pointer
  "
              />
              <CarouselNext
                className="
    right-2 sm:-right-12
    h-8 w-8 sm:h-10 sm:w-10
    bg-background/80 backdrop-blur
    border shadow-md
    z-10 cursor-pointer
  "
              />
            </Carousel>
          )}
        </div>
      </div>
    </section>
  );
}
