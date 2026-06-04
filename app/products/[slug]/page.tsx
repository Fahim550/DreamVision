"use client";

import { CTABanner } from "@/components/common/CtaBanner";
import { BlockRenderer } from "@/components/product/BlockRender";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/product";
import type { DBProduct } from "@/lib/queries";
import { fetchProductBySlug, fetchProducts } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Download,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductDetailPage = () => {
  const { slug = "" } = useParams();
  const router = useRouter();
  // const product = products.find((p) => p.slug === slug);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug as string),
    enabled: !!slug,
  });
  const { data: allProducts = [] } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const [active, setActive] = useState(0);

  useEffect(() => {
    // Redirect to /products only after loading finishes and no product was found
    if (!isLoading && !product) {
      router.replace("/products");
    }
  }, [product, isLoading, router]);

  if (isLoading) {
    return (
      <div className="container-tight py-20 text-center text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-tight py-20 text-center">
        <p className="font-display text-lg font-semibold text-red-700">
          Product not found.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          You will be redirected to the catalogue.
        </p>
      </div>
    );
  }

  const cat = product.category;
  const images = product.images.length
    ? product.images
    : product.hero_image
      ? [product.hero_image]
      : [];
  const related = allProducts
    .filter(
      (p) =>
        p.category?.slug === product.category?.slug && p.slug !== product.slug,
    )
    .slice(0, 4);

  const mapDBToProduct = (db: DBProduct): Product => ({
    slug: db.slug,
    name: db.name,
    model: db.model ?? "",
    brand: db.brand?.name ?? "Unknown",
    category: (db.category?.slug ?? "diagnostic") as Product["category"],
    shortDescription: db.short_description ?? "",
    highlights: db.highlights ?? [],
    images:
      db.images && db.images.length
        ? db.images
        : db.hero_image
          ? [db.hero_image]
          : [],
    brochureUrl: db.brochure_url ?? undefined,
    featured: db.featured,
    blocks: db.blocks ?? [],
  });

  // const cat = categories.find((c) => c.key === product.category);
  // const related = products
  //   .filter((p) => p.category === product.category && p.slug !== product.slug)
  //   .slice(0, 4);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, url });
        return;
      } catch {
        /* ignore */
      }
    }
    await navigator.clipboard.writeText(url);
    // Removed toast.success as toast is not imported
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-border bg-surface">
        <div className="container-tight flex items-center gap-1.5 py-4 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/products" className="hover:text-primary">
            Products
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          {cat && (
            <>
              <Link
                href={`/products?cat=${cat.slug}`}
                className="hover:text-primary"
              >
                {cat.name}
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
            </>
          )}
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* HEAD */}
      <section className="container-tight grid gap-10 py-10 lg:grid-cols-[1.05fr_1fr] lg:py-16">
        {/* Gallery */}
        <div>
          <div className="overflow-hidden rounded-2xl border border-border bg-gradient-soft shadow-card-soft">
            {/* <Image
              src={product.images[active]}
              alt={product.name}
              width={1280}
              height={1024}
              className="aspect-[5/4] w-full object-contain p-8"
            /> */}
            {images[active] ? (
              <Image
                src={images[active]}
                alt={product.name}
                width={1280}
                height={1024}
                className="aspect-[5/4] w-full object-contain p-8"
              />
            ) : (
              <div className="aspect-[5/4] grid place-items-center text-muted-foreground">
                No image
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`overflow-hidden rounded-xl border-2 transition-colors ${
                    active === i
                      ? "border-primary"
                      : "border-border hover:border-primary/40"
                  }`}
                  aria-label={`Image ${i + 1}`}
                >
                  <Image
                    src={src}
                    alt=""
                    width={500}
                    height={500}
                    loading="lazy"
                    className="h-20 w-20 object-contain bg-gradient-soft p-1.5"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <span className="eyebrow">{cat?.name}</span>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Brand <span className="text-primary">{product.brand?.name}</span> ·
            Model {product.model}
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {product.short_description}
          </p>

          <ul className="mt-6 space-y-2.5">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <span className="text-foreground/90">{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <Link href={`/quote?product=${product.slug}`}>
                Request a Quote <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            {product.brochure_url && (
              <Button asChild variant="outline" size="lg">
                <a href={product.brochure_url} download>
                  <Download className="h-4 w-4" /> Download brochure
                </a>
              </Button>
            )}
            <Button variant="ghost" size="lg" onClick={handleShare}>
              <Share2 className="h-4 w-4" /> Share
            </Button>
          </div>

          {/* <div className="mt-8 rounded-2xl border border-primary/15 bg-primary-soft p-5">
            <p className="text-sm text-primary/90">
              <span className="font-semibold">Lead time:</span> 2–4 weeks ·
              Worldwide shipping · 24-month warranty included
            </p>
          </div> */}
        </div>
      </section>

      {/* DYNAMIC BLOCKS */}
      <section className="border-t border-border bg-surface py-16 sm:py-20">
        <div className="container-tight space-y-14">
          {product.blocks.map((b, i) => (
            <BlockRenderer key={i} block={b} />
          ))}
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="container-tight py-16 sm:py-20">
          <h2 className="section-title">Related products</h2>
          <p className="section-sub">More from {cat?.name}.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={mapDBToProduct(p)} />
            ))}
          </div>
        </section>
      )}

      <CTABanner
        title={`Interested in the ${product.model}?`}
        body="Get a tailored quotation including installation, training and warranty options for your facility."
        primaryHref={`/quote?product=${product.slug}`}
      />
    </>
  );
};

export default ProductDetailPage;
