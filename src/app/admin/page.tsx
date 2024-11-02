import { getCategories } from "@/lib/fetchUtility";
import AddCategory from "./addCategory";
import AddProduct from "./addProduct";
import { Suspense } from "react";
import InlineLoader from "@/lib/loader";

export default async function AdminPage(){
  const categories = await getCategories();
  
  return (
    <section>
      <section className="grid md:grid-cols-2 gap-4">
        <Suspense fallback={<InlineLoader />}>
          <AddProduct categories={categories}/>
          <AddCategory />
        </Suspense>
      </section>
    </section>
  ) 
}