import { brands } from "@/config/site";

export default function TrustedBrand() {
  return (
    <div>
      <section className="container-tight py-16">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Trusted by leading manufacturers and healthcare networks
        </p>
        <div className="relative mt-8 overflow-hidden">
          <div className="flex gap-12 animate-marquee">
            {[...brands, ...brands].map((b, i) => (
              <span
                key={i}
                className="font-display whitespace-nowrap text-2xl font-bold tracking-tight text-muted-foreground/70"
              >
                {b}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />
        </div>
      </section>
    </div>
  );
}
