import Category from "@/components/home/Category";
import CtaBanner from "@/components/home/CtaBanner";
import FeatureProduct from "@/components/home/FeatureProduct";
import HeroSection from "@/components/home/HeroSection";
import TrustedBrand from "@/components/home/TrustedBrand";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default async function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center ">
      {/* <Button>Shadcn is Working</Button> */}
      <HeroSection />
      <Category />
      <FeatureProduct />
      <TrustedBrand />
      <WhyChooseUs />
      <CtaBanner />
    </div>
  );
}

// export default async function Page() {
//   const cookieStore = await cookies();
//   const supabase = createClient(cookieStore);

//   const { data: todos } = await supabase.from("todos").select();

//   return (
//     <ul>
//       {todos?.map((todo) => (
//         <li key={todo.id}>{todo.name}</li>
//       ))}
//     </ul>
//   );
// }
