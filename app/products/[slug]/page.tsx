"use client";

import { CTABanner } from "@/components/common/CtaBanner";
import { ProductCard } from "@/components/common/ProductCard";
import { BlockRenderer } from "@/components/product/BlockRender";
import { Button } from "@/components/ui/button";
import { categories } from "@/config/site";
import { products } from "@/data/product";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Download,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";

const ProductDetailPage = () => {
  const { slug = "" } = useParams();
  const product = products.find((p) => p.slug === slug);

  const [active, setActive] = useState(0);

  if (!product) notFound();

  const cat = categories.find((c) => c.key === product.category);
  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

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
                href={`/products?cat=${cat.key}`}
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
            <Image
              src={product.images[active]}
              alt={product.name}
              width={1280}
              height={1024}
              className="aspect-[5/4] w-full object-contain p-8"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {product.images.map((src, i) => (
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
            Brand <span className="text-primary">{product.brand}</span> · Model{" "}
            {product.model}
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {product.shortDescription}
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
            <Button asChild variant="primary_cta" size="lg">
              <Link href={`/quote?product=${product.slug}`}>
                Request a Quote <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            {product.brochureUrl && (
              <Button asChild variant="outline" size="lg">
                <a href={product.brochureUrl} download>
                  <Download className="h-4 w-4" /> Download brochure
                </a>
              </Button>
            )}
            <Button variant="ghost" size="lg" onClick={handleShare}>
              <Share2 className="h-4 w-4" /> Share
            </Button>
          </div>

          <div className="mt-8 rounded-2xl border border-primary/15 bg-primary-soft p-5">
            <p className="text-sm text-primary/90">
              <span className="font-semibold">Lead time:</span> 2–4 weeks ·
              Worldwide shipping · 24-month warranty included
            </p>
          </div>
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
            {related.map((p: any) => (
              <ProductCard key={p.slug} product={p} />
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
