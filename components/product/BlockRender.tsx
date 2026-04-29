import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductBlock } from "@/data/product";
import { Sparkles } from "lucide-react";
import Image from "next/image";

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
    {children}
  </h2>
);

export const BlockRenderer = ({ block }: { block: ProductBlock }) => {
  switch (block.type) {
    case "rich-text":
      return (
        <section>
          {block.title && <SectionHeading>{block.title}</SectionHeading>}
          <div className={block.title ? "mt-5 space-y-4" : "space-y-4"}>
            {block.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-muted-foreground"
              >
                {p}
              </p>
            ))}
          </div>
        </section>
      );

    case "feature-highlight":
      return (
        <section>
          {block.title && <SectionHeading>{block.title}</SectionHeading>}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {block.items.map((it, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card p-5 shadow-card-soft transition-all hover:border-primary/30 hover:shadow-elevated"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                  {it.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {it.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      );

    case "spec-table":
      return (
        <section>
          {block.title && <SectionHeading>{block.title}</SectionHeading>}
          <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card shadow-card-soft">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary-soft text-left">
                    {block.columns.map((c, i) => (
                      <th
                        key={i}
                        className="px-5 py-3.5 font-display text-xs font-semibold uppercase tracking-wider text-primary"
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, ri) => (
                    <tr
                      key={ri}
                      className="border-t border-border last:border-b-0"
                    >
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={
                            ci === 0
                              ? "px-5 py-3.5 font-medium text-foreground"
                              : "px-5 py-3.5 text-muted-foreground"
                          }
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      );

    case "labeled-gallery":
      return (
        <section>
          {block.title && <SectionHeading>{block.title}</SectionHeading>}
          {block.description && (
            <p className="mt-2 text-muted-foreground">{block.description}</p>
          )}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {block.items.map((it, i) => (
              <figure
                key={i}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card-soft"
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-soft">
                  <Image
                    src={it.image}
                    alt={it.caption || it.label}
                    width={500}
                    height={500}
                    loading="lazy"
                    className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-glow">
                    {it.label}
                  </span>
                </div>
                {it.caption && (
                  <figcaption className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {it.label}.
                    </span>{" "}
                    {it.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      );

    case "faq":
      return (
        <section>
          {block.title && <SectionHeading>{block.title}</SectionHeading>}
          <Accordion
            type="single"
            collapsible
            className="mt-4 rounded-2xl border border-border bg-card shadow-card-soft"
          >
            {block.items.map((it, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="px-5 last:border-b-0"
              >
                <AccordionTrigger className="text-left font-display text-base font-semibold text-foreground">
                  {it.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {it.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      );

    default:
      return null;
  }
};
