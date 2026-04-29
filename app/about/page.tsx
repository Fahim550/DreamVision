import { CTABanner } from "@/components/common/CtaBanner";
import { site } from "@/config/site";
import { Award, Globe2, HeartPulse, Target, Users } from "lucide-react";
import Image from "next/image";
import aboutImg from "../../public/image/about-hospital.jpg";

const milestones = [
  {
    year: "2003",
    text: "Dream Vision International founded in Boston with a single mission: outfit hospitals with reliable equipment.",
  },
  {
    year: "2009",
    text: "Achieved ISO 13485 certification and expanded into Latin America.",
  },
  {
    year: "2015",
    text: "Crossed 200 hospitals served and launched the engineer-on-call program.",
  },
  {
    year: "2020",
    text: "Delivered emergency ICU equipment to 60 hospitals during the pandemic.",
  },
  {
    year: "2024",
    text: "Recognized as JCI Excellence Partner. Operating in 34 countries.",
  },
];

const values = [
  {
    icon: HeartPulse,
    title: "Patient outcomes first",
    body: "Every product decision starts with the question: does this help patients?",
  },
  {
    icon: Target,
    title: "Engineering integrity",
    body: "We only sell equipment we'd stake our reputation on.",
  },
  {
    icon: Users,
    title: "Long-term partnership",
    body: "Quotes turn into 10-year relationships with our customers.",
  },
  {
    icon: Globe2,
    title: "Global, local service",
    body: "18 service hubs ensure our engineers are never far from your facility.",
  },
];

export default function About() {
  return (
    <>
      <section className="border-b border-border bg-gradient-soft">
        <div className="container-tight py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow">About Dream Vision International</span>
              <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                {site.yearsExperience} years equipping{" "}
                <span className="bg-gradient-cta bg-clip-text text-transparent">
                  healthcare heroes.
                </span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Dream Vision International was founded on a simple belief:
                clinicians do their best work when they trust their tools.
                Today, that belief drives a team of {300} biomedical engineers
                and logisticians serving {site.hospitalsServed}+ facilities
                worldwide.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border shadow-elevated">
              <Image
                src={aboutImg}
                alt="Hospital corridor"
                loading="lazy"
                width={1600}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-tight py-20">
        <span className="eyebrow">What we stand for</span>
        <h2 className="section-title mt-3">Our values</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => {
            const I = v.icon;
            return (
              <div
                key={v.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-card-soft"
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl  text-primary-foreground shadow-glow"
                  style={{ background: "var(--gradient-cta)" }}
                >
                  <I className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold">
                  {v.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{v.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-surface py-20">
        <div className="container-tight">
          <span className="eyebrow">Our journey</span>
          <h2 className="section-title mt-3">Two decades, one mission</h2>
          <ol className="mt-12 space-y-8 border-l border-border pl-6">
            {milestones.map((m) => (
              <li key={m.year} className="relative">
                <span className="absolute -left-[34px] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-glow">
                  ●
                </span>
                <p className="font-display text-2xl font-bold text-primary">
                  {m.year}
                </p>
                <p className="mt-1 max-w-2xl text-muted-foreground">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Certifications */}
      <section className="container-tight py-20">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-card-soft sm:p-12">
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-primary" />
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Certifications
            </p>
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
            Quality, audited and re-audited.
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "ISO 13485:2016",
              "ISO 9001:2015",
              "CE Marking",
              "FDA Registered",
              "JCI Excellence Partner",
              "GDP Compliant",
              "WHO PQ Listed",
              "ISO 14001",
            ].map((c) => (
              <div
                key={c}
                className="rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground"
              >
                ✓ {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Partner with a supplier that stays."
        body="Whether you're outfitting a single ICU or building a full hospital, our team is ready to help."
      />
    </>
  );
}
