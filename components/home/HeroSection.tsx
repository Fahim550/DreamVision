import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <section className="relative w-full h-9vh flex items-center overflow-hidden py-6">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          fill
          className="object-cover"
          alt="Modern high-end hospital corridor with bright surgical lighting"
          src="/image/hero-bg.png"
          priority
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-white animate-fade-up">
          <span className="inline-block px-4 py-1 rounded-full bg-primary-glow text-white text-sm font-semibold tracking-wider uppercase mb-6">
            Established Precision
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight  mb-8">
            Equipping hospitals to deliver extraordinary care.
          </h1>
          <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-xl">
            Supplying hospitals, clinics, and healthcare facilities with
            cutting-edge medical technology from globally trusted brands since
            2005.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl">
              <Link href="/quote">
                Request a Quote <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link href="/products">Browse catalogue</Link>
            </Button>
          </div>
        </div>

        {/* Accent Image */}
        <div className="hidden lg:block relative animate-fade-in">
          <div className="absolute -top-20 -right-20 w-50 h-60 bg-white/10 blur-[120px] rounded-full" />
          <Image
            width={800}
            height={800}
            className="relative z-10 w-full h-[380px] object-cover rounded-xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700"
            alt="High-tech medical laboratory workstation"
            src="/image/hero-top.png"
          />
        </div>
      </div>
    </section>
  );
}
