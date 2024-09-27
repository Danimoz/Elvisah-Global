import { getCategories } from "@/lib/fetchUtility";
import AddCategory from "./addCategory";
import AddProduct from "./addProduct";

export default async function AdminPage(){
  const categories = await getCategories();
  
  return (
    <section>
      <section className="grid md:grid-cols-2 gap-4">
        <AddProduct categories={categories}/>
        <AddCategory />
      </section>
    </section>
  ) 
}