import { MapPin } from "lucide-react";
import Image from "next/image";
import p3 from "../../public/image/prod-ventilator.jpg";
import p1 from "../../public/image/project-hospital1.jpg";
import p2 from "../../public/image/project-or.jpg";
import { CTABanner } from "../common/CtaBanner";

const projects = [
  {
    image: p1,
    title: "St. Lumen General Hospital",
    location: "Lisbon, Portugal",
    scope:
      "Full ICU outfitting — 80 beds, monitors, ventilators and central station.",
    year: 2024,
  },
  {
    image: p2,
    title: "Northwell Surgical Wing",
    location: "New York, USA",
    scope:
      "12 operating rooms equipped with tables, lights and anesthesia workstations.",
    year: 2023,
  },
  {
    image: p3,
    title: "Vita Diagnostic Center",
    location: "Nairobi, Kenya",
    scope:
      "Greenfield diagnostic clinic with CT, ultrasound, X-ray and laboratory.",
    year: 2024,
  },
  {
    image: p1,
    title: "Mediterra Polyclinic Network",
    location: "Athens, Greece",
    scope: "Network-wide refresh of 14 clinics across cardiology and OB-GYN.",
    year: 2023,
  },
  {
    image: p2,
    title: "Al-Rahma Medical City",
    location: "Riyadh, Saudi Arabia",
    scope: "ICU expansion — 60 beds with full monitoring and ventilation.",
    year: 2022,
  },
  {
    image: p3,
    title: "Bayfront Children's Hospital",
    location: "Manila, Philippines",
    scope: "Pediatric ICU and NICU with neonatal ventilators and incubators.",
    year: 2022,
  },
];

export default function Projects() {
  return (
    <>
      <section className="border-b border-border bg-gradient-soft">
        <div className="container-tight py-14 sm:py-20">
          <span className="eyebrow">Selected projects</span>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Hospitals we're proud of.
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            From single-room upgrades to full hospital builds, here's a glimpse
            of the partners who trust MediCore.
          </p>
        </div>
      </section>

      <section className="container-tight py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <article
              key={i}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card-soft transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  width={500}
                  height={500}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute right-3 top-3 rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary backdrop-blur">
                  {p.year}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold">
                  {p.title}
                </h3>
                <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {p.location}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{p.scope}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTABanner
        title="Could your facility be next?"
        body="Send us your project brief and we'll respond with a tailored proposal within one business day."
      />
    </>
  );
}
