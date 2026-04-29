import {
  CheckCircle2,
  GraduationCap,
  PackageCheck,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import installImg from "../../public/image/service-install.jpg";
import maintainImg from "../../public/image/service-maintain.jpg";
import trainingImg from "../../public/image/service-training.jpg";
import { CTABanner } from "../common/CtaBanner";

const services = [
  {
    icon: PackageCheck,
    title: "Installation & commissioning",
    image: installImg,
    body: "From customs clearance to bedside power-on, our biomedical engineers handle every step of installation, calibration and acceptance testing.",
    points: [
      "On-site site survey",
      "Calibration to ISO standards",
      "Acceptance testing & sign-off",
      "Network & EMR integration",
    ],
  },
  {
    icon: Wrench,
    title: "Maintenance & service",
    image: maintainImg,
    body: "Preventive maintenance plans and 24/7 corrective service keep your equipment running with minimal downtime.",
    points: [
      "Annual PM contracts",
      "4-hour SLA in-region",
      "Genuine spare parts",
      "Loaner units available",
    ],
  },
  {
    icon: GraduationCap,
    title: "Clinical training",
    image: trainingImg,
    body: "Hands-on operator training and refresher courses delivered by certified clinical educators, in-person or online.",
    points: [
      "Operator certification",
      "Super-user programs",
      "On-demand video library",
      "Multi-language support",
    ],
  },
];

export default function Services() {
  return (
    <>
      <section className="border-b border-border bg-gradient-soft">
        <div className="container-tight py-14 sm:py-20">
          <span className="eyebrow">Services</span>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Beyond the box.
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Every Dream Vision International engagement includes installation
            planning, training and lifetime support — because medical equipment
            is only valuable when it's running.
          </p>
        </div>
      </section>

      <section className="container-tight space-y-16 py-16 sm:py-20">
        {services.map((s, i) => {
          const I = s.icon;
          return (
            <div
              key={s.title}
              className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-cta text-primary-foreground shadow-glow">
                  <I className="h-6 w-6" />
                </div>
                <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-3 text-muted-foreground sm:text-lg">
                  {s.body}
                </p>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-success" />
                      <span className="text-foreground/90">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border shadow-elevated">
                <Image
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          );
        })}
      </section>

      <CTABanner
        eyebrow="Service plans"
        title="Need a custom service contract?"
        body="We design service plans around your facility's clinical priorities, downtime tolerance and budget."
        primaryLabel="Talk to us"
        primaryHref="/contact"
      />
    </>
  );
}
