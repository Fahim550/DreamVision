import Category from "@/components/home/Category";
import FeatureProduct from "@/components/home/FeatureProduct";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center ">
      {/* <Button>Shadcn is Working</Button> */}
      <HeroSection />
      <Category />
      <FeatureProduct />
    </div>
  );
}
