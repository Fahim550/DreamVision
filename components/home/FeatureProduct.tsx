import { products } from "@/data/product";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "../common/ProductCard";
import { Button } from "../ui/button";

export default function FeatureProduct() {
  const featured = products.filter((p) => p.featured);
  return (
    <section className="bg-surface py-20 sm:py-24 w-full">
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
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
