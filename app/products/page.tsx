import ProductsPage from "@/components/product/ProductsPage";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <ProductsPage />
    </Suspense>
  );
}
