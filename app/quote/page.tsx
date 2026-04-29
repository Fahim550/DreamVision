import QuoteRequest from "@/components/quote/QuotePage";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <QuoteRequest />
    </Suspense>
  );
}
