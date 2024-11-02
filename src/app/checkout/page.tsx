import { Suspense } from "react";
import CheckoutForm from "./form";
import InlineLoader from "@/lib/loader";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<InlineLoader />}>
      <CheckoutForm />
    </Suspense>
  )
}

export const dynamic = "force-dynamic";