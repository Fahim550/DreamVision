// Flexible product schema with dynamic content blocks.
// Mirrors the admin's "blocks" system planned for Phase 2.
import type { CategoryKey } from "@/config/site";
import type { StaticImageData } from "next/image";

import prodAnalyzer from "../public/image/prod-analyzer.jpg";
import prodAnesthesia from "../public/image/prod-anesthesia.jpg";
import prodBed from "../public/image/prod-bed.jpg";
import prodDefib from "../public/image/prod-defib.jpg";
import prodMonitor from "../public/image/prod-monitor.jpg";
import prodOpTable from "../public/image/prod-optable.jpg";
import prodUltrasound from "../public/image/prod-ultrasound.jpg";
import prodVentilator from "../public/image/prod-ventilator.jpg";

// ---- Block types ----
export type SpecTableBlock = {
  type: "spec-table";
  title?: string;
  /** rows[i] is one row. First column is the spec name. */
  columns: string[]; // e.g. ["Parameter", "Value"] or ["Parameter", "Standard", "Pro", "Max"]
  rows: string[][];
};

export type LabeledGalleryBlock = {
  type: "labeled-gallery";
  title?: string;
  description?: string;
  items: { label: string; caption?: string; image: string | StaticImageData }[];
};

export type FeatureHighlightBlock = {
  type: "feature-highlight";
  title?: string;
  items: { title: string; description: string; icon?: string }[];
};

export type RichTextBlock = {
  type: "rich-text";
  title?: string;
  paragraphs: string[];
};

export type FAQBlock = {
  type: "faq";
  title?: string;
  items: { q: string; a: string }[];
};

export type ProductBlock =
  | SpecTableBlock
  | LabeledGalleryBlock
  | FeatureHighlightBlock
  | RichTextBlock
  | FAQBlock;

export interface Product {
  slug: string;
  name: string;
  model: string;
  brand: string;
  category: CategoryKey;
  shortDescription: string;
  highlights: string[];
  images: (string | StaticImageData)[];
  brochureUrl?: string;
  featured?: boolean;
  blocks: ProductBlock[];
}

export const products: Product[] = [
  {
    slug: "mc-9000-patient-monitor",
    name: "Multi-Parameter Patient Monitor",
    model: "MC-9000",
    brand: "Dream Vision",
    category: "icu",
    featured: true,
    shortDescription:
      "15-inch touchscreen monitor for ICU and OR with ECG, SpO2, NIBP, IBP, temperature, respiration and CO2.",
    highlights: [
      '15.6" capacitive touch display',
      "12-lead ECG with arrhythmia & ST analysis",
      "Up to 8 invasive pressures",
      "72-hour trend storage and HL7 export",
    ],
    images: [prodMonitor, prodMonitor, prodMonitor],
    brochureUrl: "#",
    blocks: [
      {
        type: "rich-text",
        title: "Designed for critical care",
        paragraphs: [
          "The MC-9000 brings precision monitoring to the bedside with a high-resolution capacitive touchscreen, fan-less silent operation and a battery that keeps you running for over 4 hours during transport.",
          "Modular parameter slots let you configure exactly the channels each unit needs — from a basic 5-parameter setup to full hemodynamic monitoring with cardiac output and EtCO2.",
        ],
      },
      {
        type: "feature-highlight",
        title: "Why clinicians choose MC-9000",
        items: [
          {
            title: "Anti-glare display",
            description:
              "1920×1080 resolution with wide viewing angles for fast bedside reading.",
          },
          {
            title: "Smart alarms",
            description:
              "Multi-level alarm logic reduces alarm fatigue while preserving safety.",
          },
          {
            title: "Network ready",
            description:
              "HL7 / FHIR integration with leading EMR and central monitoring stations.",
          },
          {
            title: "Easy disinfection",
            description:
              "Sealed front panel rated for hospital-grade cleaning agents.",
          },
        ],
      },
      {
        type: "spec-table",
        title: "Technical specifications",
        columns: [
          "Parameter",
          "MC-9000 Standard",
          "MC-9000 Pro",
          "MC-9000 Max",
        ],
        rows: [
          ["Display", '12.1" TFT', '15.6" Touch', '19" Touch'],
          ["ECG leads", "5-lead", "12-lead", "12-lead + Vector"],
          ["SpO2 technology", "Dream Vision", "Masimo SET®", "Masimo rainbow®"],
          ["Invasive pressures", "2", "4", "8"],
          ["Battery runtime", "2 h", "4 h", "6 h"],
          ["Trend storage", "24 h", "72 h", "168 h"],
          ["Weight", "5.2 kg", "6.4 kg", "7.8 kg"],
          ["Power", "100–240 V AC", "100–240 V AC", "100–240 V AC"],
        ],
      },
      {
        type: "labeled-gallery",
        title: "Parts and structure",
        description: "Service-friendly modular design.",
        items: [
          { label: "A", caption: '15.6" touchscreen', image: prodMonitor },
          { label: "B", caption: "Parameter modules", image: prodMonitor },
          { label: "C", caption: "Quick-release handle", image: prodMonitor },
          { label: "D", caption: "Multi-port back panel", image: prodMonitor },
        ],
      },
      {
        type: "faq",
        title: "Frequently asked questions",
        items: [
          {
            q: "Does it integrate with our central station?",
            a: "Yes — the MC-9000 ships with HL7 v2.5 and FHIR R4 connectors and pairs with the MC-Central nurse station.",
          },
          {
            q: "What's the warranty?",
            a: "Standard 24-month warranty with 7-year parts availability. Extended 5-year plans are available.",
          },
          {
            q: "Can we add modules later?",
            a: "Absolutely. All parameter modules are hot-swappable and can be added at any time.",
          },
        ],
      },
    ],
  },
  {
    slug: "mc-v8-icu-ventilator",
    name: "ICU Ventilator",
    model: "MC-V8",
    brand: "AeroMed",
    category: "icu",
    featured: true,
    shortDescription:
      "Adult, pediatric and neonatal invasive & non-invasive ventilator with closed-loop oxygen control.",
    highlights: [
      "Adult / Pediatric / Neonatal modes",
      '15.6" touchscreen with dual-screen option',
      "Closed-loop FiO2 and PEEP control",
      "Built-in nebulizer and air compressor",
    ],
    images: [prodVentilator, prodVentilator],
    brochureUrl: "#",
    blocks: [
      {
        type: "rich-text",
        paragraphs: [
          "The MC-V8 covers the full spectrum of ventilation needs — from neonatal HFOV to adult ARDS protocols — in a single, intuitive platform.",
        ],
      },
      {
        type: "feature-highlight",
        items: [
          {
            title: "Smart weaning",
            description:
              "Automated SBT and weaning indices speed up extubation decisions.",
          },
          {
            title: "Lung protective",
            description:
              "Driving pressure, P0.1 and stress index displayed in real time.",
          },
          {
            title: "Clean operation",
            description: "<35 dB whisper-quiet operation, even at high flow.",
          },
        ],
      },
      {
        type: "spec-table",
        columns: ["Parameter", "Specification"],
        rows: [
          ["Patient range", "0.3 kg – 250 kg"],
          ["Tidal volume", "2 – 2500 mL"],
          ["Frequency", "1 – 150 bpm"],
          ["FiO2", "21 – 100 %"],
          ["Battery", "Hot-swappable, 4 h"],
        ],
      },
    ],
  },
  {
    slug: "mc-us7-color-doppler",
    name: "Color Doppler Ultrasound",
    model: "MC-US7",
    brand: "ClariScan",
    category: "diagnostic",
    featured: true,
    shortDescription:
      "Premium color Doppler with shear-wave elastography and AI-assisted measurements for cardiac, OB-GYN and abdominal imaging.",
    highlights: [
      '23" articulated LED monitor',
      "AI auto-measurement (NT, EF, IMT)",
      "Shear-wave elastography",
      "Up to 4 active probe ports",
    ],
    images: [prodUltrasound, prodUltrasound],
    brochureUrl: "#",
    blocks: [
      {
        type: "feature-highlight",
        title: "Imaging capabilities",
        items: [
          {
            title: "B-mode & THI",
            description:
              "Tissue Harmonic Imaging for sharper border definition.",
          },
          {
            title: "4D real-time",
            description: "Up to 60 vps in 4D for OB studies.",
          },
          {
            title: "Vascular suite",
            description:
              "Triplex Doppler with auto-trace and resistance index.",
          },
        ],
      },
      {
        type: "spec-table",
        columns: ["Parameter", "Value"],
        rows: [
          ["Monitor", '23" full HD'],
          ["Probe ports", "4 active + 1 pencil"],
          ["Storage", "1 TB SSD"],
          ["Connectivity", "DICOM 3.0, Wi-Fi, HL7"],
        ],
      },
      {
        type: "faq",
        items: [
          {
            q: "Which probes are included?",
            a: "Convex C5-1, linear L12-3 and phased S5-1 are included as standard.",
          },
        ],
      },
    ],
  },
  {
    slug: "mc-d5-defibrillator",
    name: "Biphasic Defibrillator",
    model: "MC-D5",
    brand: "Pulsewave",
    category: "diagnostic",
    shortDescription:
      "Manual + AED biphasic defibrillator with pacing, SpO2 and 12-lead ECG.",
    highlights: [
      "1–360 J biphasic",
      "AED & manual modes",
      "Built-in pacer",
      'Color 8.4" display',
    ],
    images: [prodDefib],
    blocks: [
      {
        type: "spec-table",
        columns: ["Parameter", "Value"],
        rows: [
          ["Energy", "1–360 J biphasic"],
          ["Charge time", "<5 s to 200 J"],
          ["Battery", ">300 shocks per charge"],
        ],
      },
    ],
  },
  {
    slug: "mc-b7-icu-bed",
    name: "5-Function Electric ICU Bed",
    model: "MC-B7",
    brand: "OrthoLine",
    category: "beds",
    featured: true,
    shortDescription:
      "Premium ICU bed with CPR release, X-ray translucent backrest and integrated weighing scale.",
    highlights: [
      "5 motor functions + Trendelenburg",
      "Integrated patient scale (±100 g)",
      "X-ray translucent backrest",
      "Anti-bacterial ABS panels",
    ],
    images: [prodBed, prodBed],
    blocks: [
      {
        type: "labeled-gallery",
        title: "Bed structure",
        items: [
          { label: "1", caption: "ABS head & footboard", image: prodBed },
          { label: "2", caption: "Quick-release CPR handle", image: prodBed },
          { label: "3", caption: "Integrated weighing scale", image: prodBed },
          { label: "4", caption: "Central locking castors", image: prodBed },
        ],
      },
      {
        type: "spec-table",
        columns: ["Parameter", "Value"],
        rows: [
          ["Safe working load", "250 kg"],
          ["Height range", "40 – 80 cm"],
          ["Backrest tilt", "0 – 75°"],
          ["Knee tilt", "0 – 45°"],
          ["Trendelenburg", "±15°"],
        ],
      },
    ],
  },
  {
    slug: "mc-l3-hematology-analyzer",
    name: "5-Part Hematology Analyzer",
    model: "MC-L3",
    brand: "BioLumen",
    category: "laboratory",
    shortDescription:
      "Fully automated 5-part diff hematology analyzer with 60 samples/hour throughput.",
    highlights: [
      "29 parameters",
      "60 samples / hour",
      '10.4" touchscreen',
      "Auto-loader for 50 tubes",
    ],
    images: [prodAnalyzer],
    blocks: [
      {
        type: "spec-table",
        columns: ["Parameter", "Value"],
        rows: [
          ["Throughput", "60 samples / hour"],
          ["Sample volume", "20 µL"],
          ["Reagents", "4 (closed system)"],
        ],
      },
    ],
  },
  {
    slug: "mc-ot2-operating-table",
    name: "Hydraulic Operating Table",
    model: "MC-OT2",
    brand: "SteriPro",
    category: "surgical",
    shortDescription:
      "Multi-position hydraulic operating table for general, orthopedic and gynecological procedures.",
    highlights: [
      "360° rotation",
      "Manual hydraulic lift",
      "Removable head & leg sections",
      "X-ray compatible",
    ],
    images: [prodOpTable],
    blocks: [
      {
        type: "spec-table",
        columns: ["Parameter", "Value"],
        rows: [
          ["Length", "2050 mm"],
          ["Width", "500 mm"],
          ["Height range", "750 – 1050 mm"],
          ["Load", "200 kg"],
        ],
      },
    ],
  },
  {
    slug: "mc-a6-anesthesia-workstation",
    name: "Anesthesia Workstation",
    model: "MC-A6",
    brand: "VitaSense",
    category: "anesthesia",
    shortDescription:
      "Advanced anesthesia workstation with electronic flowmeter and integrated patient monitor.",
    highlights: [
      "Electronic flowmeter",
      "Volume / Pressure / SIMV / PSV modes",
      "Two vaporizer mounts",
      "Integrated AGSS",
    ],
    images: [prodAnesthesia],
    blocks: [
      {
        type: "spec-table",
        columns: ["Parameter", "Value"],
        rows: [
          ["Tidal volume", "20 – 1500 mL"],
          ["Frequency", "4 – 100 bpm"],
          ["O2 / Air / N2O", "Pin-indexed"],
        ],
      },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
