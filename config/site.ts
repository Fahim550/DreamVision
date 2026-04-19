// Site-wide brand & navigation config for MediCore Equipment.
import type { LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";

export const site = {
  name: "MediCore Equipment",
  tagline: "Trusted Medical Equipment for Modern Healthcare",
  description:
    "MediCore supplies hospitals, clinics and laboratories with premium ICU, diagnostic, surgical and laboratory equipment — backed by installation, training and lifetime support.",
  phone: "+1 (800) 555-0142",
  whatsapp: "18005550142",
  email: "sales@medicore-equipment.com",
  address: "1200 Medical Park Drive, Suite 400, Boston, MA 02118",
  hours: "Mon–Sat · 8:00 – 19:00 EST",
  yearsExperience: 22,
  hospitalsServed: 480,
  countriesServed: 34,
  productsCount: 1200,
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export type CategoryKey =
  | "icu"
  | "diagnostic"
  | "laboratory"
  | "surgical"
  | "beds"
  | "anesthesia";

export interface Category {
  key: CategoryKey;
  name: string;
  blurb: string;
  icon: LucideIcon;
  image: StaticImageData;
}

// import catAnest from "@/assets/cat-anesthesia.jpg";
// import catBeds from "@/assets/cat-beds.jpg";
// import catDiag from "@/assets/cat-diagnostic.jpg";
// import catIcu from "@/assets/cat-icu.jpg";
// import catLab from "@/assets/cat-laboratory.jpg";
// import catSurg from "@/assets/cat-surgical.jpg";

// export const categories: Category[] = [
//   {
//     key: "icu",
//     name: "ICU & Critical Care",
//     blurb: "Patient monitors, ventilators, infusion pumps",
//     icon: HeartPulse,
//     image: catIcu,
//   },
//   {
//     key: "diagnostic",
//     name: "Diagnostic Imaging",
//     blurb: "Ultrasound, ECG, defibrillators",
//     icon: Stethoscope,
//     image: catDiag,
//   },
//   {
//     key: "laboratory",
//     name: "Laboratory",
//     blurb: "Analyzers, centrifuges, microscopes",
//     icon: FlaskConical,
//     image: catLab,
//   },
//   {
//     key: "surgical",
//     name: "Surgical",
//     blurb: "Operating tables, lights, electrosurgical units",
//     icon: Scissors,
//     image: catSurg,
//   },
//   {
//     key: "beds",
//     name: "Hospital Beds",
//     blurb: "ICU beds, recovery beds, stretchers",
//     icon: BedDouble,
//     image: catBeds,
//   },
//   {
//     key: "anesthesia",
//     name: "Anesthesia",
//     blurb: "Workstations, vaporizers, breathing circuits",
//     icon: Wind,
//     image: catAnest,
//   },
// ];

export const brands = [
  "MediCore",
  "Pulsewave",
  "BioLumen",
  "ClariScan",
  "SteriPro",
  "VitaSense",
  "OrthoLine",
  "AeroMed",
];
