import { CTABanner } from "@/components/common/CtaBanner";
import {
  Award,
  Eye,
  Globe2,
  Handshake,
  HeartPulse,
  Lightbulb,
  ShieldCheck,
  Target,
  TrendingUp,
  Truck,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import aboutImg from "../../public/image/about-hospital.jpg";

const milestones = [
  {
    year: "2018",
    text: "Founded with a mission to advance healthcare through world-class medical technology across Bangladesh.",
  },
  {
    year: "2020",
    text: "Expanded service network and delivered critical medical equipment during global healthcare challenges.",
  },
  {
    year: "2022",
    text: "Grew our biomedical engineering team to provide faster on-site installation and support nationwide.",
  },
  {
    year: "2024",
    text: "Established partnerships with internationally renowned brands and expanded to serve major hospital networks.",
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Commitment",
    body: "We honor every promise made to our clients — from delivery timelines to long-term support agreements.",
  },
  {
    icon: Award,
    title: "Service excellence",
    body: "Our engineers respond within the shortest possible timeframe to keep your facility running flawlessly.",
  },
  {
    icon: Handshake,
    title: "Integrity",
    body: "Transparent dealings, honest advice, and no compromise on quality — ever.",
  },
  {
    icon: TrendingUp,
    title: "Long-term partnership",
    body: "We build lasting relationships, not one-time transactions, with every hospital we serve.",
  },
];

const services = [
  { icon: Lightbulb, label: "Consultation" },
  { icon: Truck, label: "Supply & delivery" },
  { icon: Wrench, label: "Installation & commissioning" },
  { icon: HeartPulse, label: "Technical support" },
  { icon: Target, label: "Maintenance" },
  { icon: Globe2, label: "After-sales service" },
];

const stats = [
  { value: "2018", label: "Established" },
  { value: "500+", label: "Facilities served" },
  { value: "30+", label: "Global brands" },
  { value: "24/7", label: "Engineer support" },
];

export default function About() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="border-b border-border bg-gradient-soft">
        <div className="container-tight py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow">About Dream Vision International</span>
              <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Advancing healthcare through{" "}
                <span className="bg-gradient-cta bg-clip-text text-transparent">
                  modern medical technology.
                </span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Established in 2018, we are a leading provider of advanced
                medical technology and healthcare solutions, dedicated to
                serving hospitals, clinics, diagnostic centers, and healthcare
                institutions across Bangladesh.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We specialize in supplying world-class medical equipment and
                innovative healthcare systems from globally trusted and
                internationally renowned brands — backed by a team of expert
                Biomedical Engineers committed to delivering prompt, reliable,
                and professional support.
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

      {/* ── Stats bar ────────────────────────────────────── */}
      <section className="border-b border-border bg-primary">
        <div className="container-tight py-10">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-bold text-primary-foreground">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-primary-foreground/70">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ─────────────────────────────── */}
      <section className="container-tight py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Vision */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-card-soft">
            <div
              className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-primary-foreground shadow-glow"
              style={{ background: "var(--gradient-cta)" }}
            >
              <Eye className="h-6 w-6" />
            </div>
            <span className="eyebrow">Our vision</span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">
              A healthier society for all
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Our dream is to contribute to the growth of a healthier society
              through quality service, advanced medical solutions, and
              continuous dedication to improving healthcare for communities
              across the nation.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              We believe healthcare technology is not only our business — it is
              our vision and our responsibility toward humanity.
            </p>
          </div>

          {/* Mission */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-card-soft">
            <div
              className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-primary-foreground shadow-glow"
              style={{ background: "var(--gradient-cta)" }}
            >
              <Target className="h-6 w-6" />
            </div>
            <span className="eyebrow">Our mission</span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">
              Empowering clinicians with trusted tools
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Driven by professionalism, innovation, and excellence, we strive
              to support healthcare providers with cutting-edge technologies
              that enhance clinical efficiency, patient safety, and overall
              healthcare outcomes.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              As global healthcare technology continues to evolve, we
              continuously upgrade and adapt our solutions to meet international
              standards and the growing demands of modern healthcare facilities.
            </p>
          </div>
        </div>
      </section>

      {/* ── Who we are ───────────────────────────────────── */}
      <section className="bg-surface py-20">
        <div className="container-tight grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow">Who we are</span>
            <h2 className="section-title mt-3">
              Your dedicated healthcare technology partner in Bangladesh
            </h2>
            <p className="mt-5 text-muted-foreground leading-8">
              Since 2018, Dream Vision International has been at the forefront
              of medical technology distribution across Bangladesh. We bring
              world-class equipment from internationally recognized brands
              directly to hospitals, clinics, and diagnostic centers — ensuring
              every facility has the tools it needs to deliver exceptional
              patient care.
            </p>
            <p className="mt-4 text-muted-foreground leading-8">
              Our expert team of Biomedical Engineers provides end-to-end
              support — from initial consultation and equipment selection
              through installation, commissioning, and ongoing maintenance. We
              are committed to building long-term partnerships, not just
              completing transactions.
            </p>
            <p className="mt-4 text-muted-foreground leading-8">
              We strongly believe in commitment, service excellence, integrity,
              and the responsibility we hold toward the communities we serve.
              Healthcare technology is our profession — and our purpose.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-3xl font-bold text-primary">
                Since 2018
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Delivering trusted healthcare technology solutions across
                Bangladesh.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-3xl font-bold text-primary">
                Expert Engineers
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Professional biomedical support with fast response and deep
                technical expertise.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-3xl font-bold text-primary">
                End-to-End
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Consultation, installation, maintenance, and after-sales service
                under one roof.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-3xl font-bold text-primary">
                Global Brands
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Reliable products from internationally recognized and trusted
                medical manufacturers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ──────────────────────────────────── */}
      <section className="container-tight py-20">
        <div className="text-center">
          <span className="eyebrow">What we stand for</span>
          <h2 className="section-title mt-3">Our core values</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Every decision we make — from the products we choose to represent to
            the service levels we commit to — is guided by these principles.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => {
            const I = v.icon;
            return (
              <div
                key={v.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-card-soft"
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-primary-foreground shadow-glow"
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

      {/* ── Services ─────────────────────────────────────── */}
      <section className="bg-surface py-20">
        <div className="container-tight">
          <div className="text-center">
            <span className="eyebrow">What we offer</span>
            <h2 className="section-title mt-3">Our expertise</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A complete service cycle — from initial consultation to long-term
              maintenance — ensuring seamless performance and lasting value.
            </p>
          </div>
          <div className="mt-10 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {services.map((s) => {
              const I = s.icon;
              return (
                <div
                  key={s.label}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center shadow-card-soft"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-primary-foreground"
                    style={{ background: "var(--gradient-cta)" }}
                  >
                    <I className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium leading-tight">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────── */}
      <section className="container-tight py-20">
        <div className="text-center">
          <span className="eyebrow">Our journey</span>
          <h2 className="section-title mt-3">Growing with purpose</h2>
        </div>
        <ol className="mt-12 space-y-8 border-l border-border pl-8">
          {milestones.map((m) => (
            <li key={m.year} className="relative">
              <span
                className="absolute -left-[41px] flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-primary-foreground shadow-glow"
                style={{ background: "var(--gradient-cta)" }}
              >
                ●
              </span>
              <p className="font-display text-2xl font-bold text-primary">
                {m.year}
              </p>
              <p className="mt-1 max-w-2xl text-muted-foreground">{m.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <CTABanner
        title="Partner with a supplier that stays."
        body="Whether you're outfitting a single clinic or building a full hospital, our biomedical team is ready to help — every step of the way."
      />
    </>
  );
}
