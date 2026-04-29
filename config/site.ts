// Site-wide brand & navigation config for MediCore Equipment.
import type { LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";

import {
  BedDouble,
  FlaskConical,
  HeartPulse,
  Scissors,
  Stethoscope,
  Wind,
} from "lucide-react";

export const site = {
  name: "Dream Vision Interantional",
  tagline: "Trusted Medical Equipment for Modern Healthcare",
  description:
    "Dream Vision supplies hospitals, clinics and laboratories with premium ICU, diagnostic, surgical and laboratory equipment — backed by installation, training and lifetime support.",
  phone: "+880 1744-879908",
  whatsapp: "01744-879908",
  email: "bddreamvision@gmail.com",
  address:
    "House: 83/B, Shiddeshwari Circular Road Mouchak Tower (9 Floor), Dhaka-1217, Bangladesh",
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

import catAnest from "../public/image/cat-anesthesia.jpg";
import catBeds from "../public/image/cat-beds.jpg";
import catDiag from "../public/image/cat-diagnostic.jpg";
import catIcu from "../public/image/cat-icu.jpg";
import catLab from "../public/image/cat-laboratory.jpg";
import catSurg from "../public/image/cat-surgical.jpg";

export const categories: Category[] = [
  {
    key: "icu",
    name: "ICU & Critical Care",
    blurb: "Patient monitors, ventilators, infusion pumps",
    icon: HeartPulse,
    image: catIcu,
  },
  {
    key: "diagnostic",
    name: "Diagnostic Imaging",
    blurb: "Ultrasound, ECG, defibrillators",
    icon: Stethoscope,
    image: catDiag,
  },
  {
    key: "laboratory",
    name: "Laboratory",
    blurb: "Analyzers, centrifuges, microscopes",
    icon: FlaskConical,
    image: catLab,
  },
  {
    key: "surgical",
    name: "Surgical",
    blurb: "Operating tables, lights, electrosurgical units",
    icon: Scissors,
    image: catSurg,
  },
  {
    key: "beds",
    name: "Hospital Beds",
    blurb: "ICU beds, recovery beds, stretchers",
    icon: BedDouble,
    image: catBeds,
  },
  {
    key: "anesthesia",
    name: "Anesthesia",
    blurb: "Workstations, vaporizers, breathing circuits",
    icon: Wind,
    image: catAnest,
  },
];

export const brands = [
  "Dream Vision",
  "Pulsewave",
  "BioLumen",
  "ClariScan",
  "SteriPro",
  "VitaSense",
  "OrthoLine",
  "AeroMed",
];
