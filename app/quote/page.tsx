"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/config/site";
import { products } from "@/data/product";
import { ArrowRight, CheckCircle2, Plus, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  company: z.string().trim().min(2, "Company is required").max(120),
  email: z.string().trim().email("Invalid email address").max(200),
  phone: z.string().trim().min(6, "Phone is required").max(40),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

type Line = { slug: string; qty: number };

export default function QuoteRequest() {
  const params = useSearchParams();
  const initialSlug = params.get("product");
  const [lines, setLines] = useState<Line[]>(() =>
    initialSlug && products.find((p: any) => p.slug === initialSlug)
      ? [{ slug: initialSlug, qty: 1 }]
      : [{ slug: products[0].slug, qty: 1 }],
  );
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (initialSlug && products.find((p) => p.slug === initialSlug)) {
      setLines((prev) =>
        prev.some((l) => l.slug === initialSlug)
          ? prev
          : [...prev, { slug: initialSlug, qty: 1 }],
      );
    }
  }, [initialSlug]);

  const updateLine = (i: number, patch: Partial<Line>) =>
    setLines((prev) =>
      prev.map((l, idx) => (idx === i ? { ...l, ...patch } : l)),
    );
  const removeLine = (i: number) =>
    setLines((prev) => prev.filter((_, idx) => idx !== i));
  const addLine = () => {
    const used = new Set(lines.map((l) => l.slug));
    const next = products.find((p) => !used.has(p.slug));
    if (next) setLines((prev) => [...prev, { slug: next.slug, qty: 1 }]);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    if (lines.length === 0) {
      toast.error("Please add at least one product");
      return;
    }
    setSubmitting(true);
    // Frontend-only submission for now. Persistence will be wired up
    // once Lovable Cloud is enabled (Phase 2 with admin dashboard).
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setDone(true);
    toast.success(
      "Quote request sent — we'll be in touch within 1 business day.",
    );
  };

  if (done) {
    return (
      <section className="container-tight py-20">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-10 text-center shadow-card-soft">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold">
            Request received
          </h1>
          <p className="mt-2 text-muted-foreground">
            Thank you. A MediCore specialist will reach out within one business
            day with a tailored quotation.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild variant="cta">
              <Link href="/products">Back to products</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Home</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="border-b border-border bg-gradient-soft">
        <div className="container-tight py-12 sm:py-16">
          <span className="eyebrow">Request a Quote</span>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Tell us what you need
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Add the products you're interested in and share a few details. We
            respond within one business day with pricing, lead time and
            configuration options.
          </p>
        </div>
      </section>

      <section className="container-tight py-12">
        <form
          onSubmit={onSubmit}
          className="grid gap-8 lg:grid-cols-[1.2fr_1fr]"
        >
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card-soft sm:p-8">
            <h2 className="font-display text-xl font-bold">Your details</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full name *</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  maxLength={80}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="company">Company / Hospital *</Label>
                <Input
                  id="company"
                  name="company"
                  required
                  maxLength={120}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={200}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  maxLength={40}
                  className="mt-1.5"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="country">Country / City</Label>
                <Input
                  id="country"
                  name="country"
                  maxLength={80}
                  className="mt-1.5"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  maxLength={2000}
                  placeholder="Project context, configuration preferences, target installation date…"
                  className="mt-1.5"
                />
              </div>
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-bold">
                  Selected products
                </h2>
                <Button
                  type="button"
                  variant="soft"
                  size="sm"
                  onClick={addLine}
                  disabled={lines.length >= products.length}
                >
                  <Plus className="h-4 w-4" /> Add product
                </Button>
              </div>

              <div className="mt-4 space-y-3">
                {lines.map((l, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-3 rounded-xl border border-border p-3 sm:flex-row sm:items-center"
                  >
                    <select
                      value={l.slug}
                      onChange={(e) => updateLine(i, { slug: e.target.value })}
                      className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {products.map((p) => (
                        <option key={p.slug} value={p.slug}>
                          {p.name} ({p.model})
                        </option>
                      ))}
                    </select>
                    <div className="flex items-center gap-2">
                      <Label
                        htmlFor={`qty-${i}`}
                        className="text-xs uppercase tracking-wider text-muted-foreground"
                      >
                        Qty
                      </Label>
                      <Input
                        id={`qty-${i}`}
                        type="number"
                        min={1}
                        max={9999}
                        value={l.qty}
                        onChange={(e) =>
                          updateLine(i, {
                            qty: Math.max(1, Number(e.target.value) || 1),
                          })
                        }
                        className="w-20"
                      />
                      {lines.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeLine(i)}
                          aria-label="Remove"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              variant="hero"
              size="xl"
              className="mt-8 w-full"
              disabled={submitting}
            >
              {submitting ? (
                "Sending…"
              ) : (
                <>
                  Send quote request <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              By submitting you agree to be contacted by MediCore for this
              enquiry.
            </p>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card-soft">
              <h3 className="font-display font-semibold">What happens next</h3>
              <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                    1
                  </span>{" "}
                  A specialist reviews your request within 1 business day.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                    2
                  </span>{" "}
                  We send pricing, lead time and configuration options.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                    3
                  </span>{" "}
                  Optional on-site visit and installation planning.
                </li>
              </ol>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary-soft p-6 text-sm">
              <p className="font-display font-semibold text-primary">
                Prefer to talk?
              </p>
              <p className="mt-1 text-primary/80">
                Call us at{" "}
                <a className="underline" href={`tel:${site.phone}`}>
                  {site.phone}
                </a>{" "}
                or email{" "}
                <a className="underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                .
              </p>
            </div>
          </aside>
        </form>
      </section>
    </>
  );
}
