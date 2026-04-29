import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface CTABannerProps {
  eyebrow?: string;
  title: string;
  body: string;
  primaryHref?: string;
  primaryLabel?: string;
}

export const CTABanner = ({
  eyebrow = "Ready when you are",
  title,
  body,
  primaryHref = "/quote",
  primaryLabel = "Request a Quote",
}: CTABannerProps) => (
  <section className="container-tight py-16 sm:py-24 ">
    <div
      className="relative overflow-hidden rounded-2xl p-8 sm:p-14 shadow-elevated"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div
        className="absolute inset-0 opacity-30 bg-gradient-mesh"
        aria-hidden
      />
      <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div className="text-primary-foreground">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            {eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-primary-foreground/90 sm:text-lg">
            {body}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <Button
            asChild
            size="xl"
            className="bg-secondary text-white hover:bg-secondary-hover"
          >
            <Link href={primaryHref}>
              {primaryLabel} <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="xl"
            variant="outline"
            className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground hover:border-white/60"
          >
            <Link href="/contact">Talk to a specialist</Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);
