"use client";

import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center ">
      {/* <Button>Shadcn is Working</Button> */}
      <HeroSection />

      {/* <div className="bg-primary text-primary-foreground">...</div>
      <div className="bg-primary-soft text-primary">...</div>
      <div className="font-display text-foreground">...</div>
      <div className="bg-success text-success-foreground">...</div> */}
    </div>
  );
}
