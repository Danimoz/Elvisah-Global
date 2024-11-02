import { getAllProducts, getCategories, getProductsByCategory } from "@/lib/fetchUtility"
import { Suspense } from "react";
import InlineLoader from "@/lib/loader";
import { Product } from "@prisma/client";
import type { Metadata } from "next";
import ProductGrid from "@/components/product/product-grid";


interface searchParams {
  category?: string
  q?: string
}


export async function generateMetadata({ searchParams }: { searchParams: searchParams }): Promise<Metadata> {
  const category = searchParams.category
  return {
    title: category ? `Products in ${category}` : 'All Products | Elvisah Store',
    description: category ? `View all products in the ${category} category` : 'View all products',
  }
}

interface ProductsResponse {
  products: Product[]
  hasNext: boolean;
  hasPrev: boolean;
}

export default async function Products({ searchParams }: { searchParams: searchParams }) {
  const category = searchParams.category
  const search = searchParams.q

  let productsData: Product[] | ProductsResponse;
  
  if (category) {
    productsData = await getProductsByCategory(category);
  } else {
    productsData = await getAllProducts(1, 24, search);
  }

  const products = 'products' in productsData ? productsData.products : productsData;

  return (
    <main className="min-h-screen">
      <Suspense fallback={<InlineLoader />}>
        <ProductGrid products={products} />
      </Suspense>
    </main>
  )
}