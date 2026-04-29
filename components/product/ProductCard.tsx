import { Product } from "@/data/product";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const ProductCard = ({ product }: { product: Product }) => (
  <Link
    href={`/products/${product.slug}`}
    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated"
  >
    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-soft">
      <Image
        src={product.images[0]}
        alt={product.name}
        loading="lazy"
        width={1024}
        height={768}
        className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute left-4 top-4 rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary backdrop-blur">
        {product.brand}
      </span>
    </div>
    <div className="flex flex-1 flex-col p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Model {product.model}
      </p>
      <h3 className="mt-1 font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
        {product.name}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
        {product.shortDescription}
      </p>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          View details
        </span>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-secondary transition-all group-hover:bg-secondary group-hover:text-primary-foreground">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  </Link>
);
