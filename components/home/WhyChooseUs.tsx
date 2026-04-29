import {
  ArrowRight,
  Award,
  Headphones,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function WhyChooseUs() {
  const whyUs = [
    {
      icon: ShieldCheck,
      title: "Certified & compliant",
      body: "ISO 13485, CE & FDA registered. Every device ships with full traceability.",
    },
    {
      icon: Wrench,
      title: "Lifetime engineering support",
      body: "In-house biomedical engineers in 18 service hubs worldwide.",
    },
    {
      icon: Truck,
      title: "Door-to-bedside logistics",
      body: "Customs, installation and commissioning handled end-to-end.",
    },
    {
      icon: Headphones,
      title: "24/7 clinical helpdesk",
      body: "Talk to a real biomedical engineer — average response under 4 minutes.",
    },
  ];
  return (
    <div>
      <section className="container-tight py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <span className="eyebrow">Why Dream Vision</span>
            <h2 className="section-title mt-3">
              A partner, not just a supplier.
            </h2>
            <p className="section-sub">
              Healthcare cannot pause. Every Dream Vision engagement is
              engineered for uptime — from the first quote to year ten of
              service.
            </p>
            <Button asChild className="mt-7" variant="hero">
              <Link href="/about">
                Our story <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {whyUs.map((w) => {
              const I = w.icon;
              return (
                <div
                  key={w.title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-card-soft transition-all hover:border-primary/30 hover:shadow-elevated"
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-primary-foreground shadow-glow"
                    style={{ background: "var(--gradient-cta)" }}
                  >
                    <I className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-base font-semibold">
                    {w.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {w.body}
                  </p>
                </div>
              );
            })}
            <div className="sm:col-span-2 rounded-2xl border border-primary/20 bg-primary-soft p-6">
              <div className="flex items-center gap-3">
                <Award className="h-6 w-6 text-primary" />
                <p className="font-display font-semibold text-primary">
                  Certified Excellence Partner — JCI 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
