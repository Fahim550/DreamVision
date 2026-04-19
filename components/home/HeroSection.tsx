import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[870px] flex items-center overflow-hidden">
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
        <div className="text-white">
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white text-sm font-semibold tracking-wider uppercase mb-6">
            Established Precision
          </span>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Premium Medical Equipment for Hospitals &amp; Clinics
          </h1>
          <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-xl">
            Empowering healthcare institutions with precision-engineered
            clinical solutions designed for superior patient outcomes.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-primary px-10 py-5 rounded-md font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg active:scale-95">
              Request a Quote
            </button>
            <button className="border border-white/30 backdrop-blur-md text-white px-10 py-5 rounded-md font-bold text-lg hover:bg-white/10 transition-colors">
              Explore Catalog
            </button>
          </div>
        </div>

        {/* Accent Image */}
        <div className="hidden lg:block relative">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 blur-[120px] rounded-full" />
          <Image
            width={800}
            height={800}
            className="relative z-10 w-full h-[500px] object-cover rounded-xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700"
            alt="High-tech medical laboratory workstation"
            src="/image/hero-top.png"
          />
        </div>
      </div>
    </section>
  );
}
