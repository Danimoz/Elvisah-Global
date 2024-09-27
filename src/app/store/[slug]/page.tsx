import AddToCart from "@/components/cart/addToCart";
import ProductGrid from "@/components/product/product-grid";
import { getProductBySlug, getRelatedProducts } from "@/lib/fetchUtility"
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";


export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();
  
  return {
    title: `${product.name} | Elvisah Store`,
  }
}

export default async function SingleProduct({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();
  const relatedProducts = await getRelatedProducts(product.id, product.categoryId);

  return (
    <main className="bg-neutral-50 px-4 py-6 min-h-screen">
      <section className="container rounded-xl flex flex-col md:flex-row gap-6 px-6 py-12 bg-white border border-neutral-200">
        <Suspense fallback={<div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />}>
          <div>
            <Image 
              src={product.image!} 
              alt={product.name} 
              width={500} 
              height={500}
              priority={true}
              className="rounded-xl w-full h-full object-contain"
            />
          </div>

          <div className="md:flex-1 px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-2">{product.name}</h2>
        
            <h4 className="text-2xl tracking-wide font-semibold mb-4">₦ {Number(product.price.toFixed(2)).toLocaleString()}</h4>

            <div className="my-4">
              {product.features?.map(feature => (
                <div key={feature} className="border-b border-gray-200 mb-2">
                  <span className="text-neutral-500">{feature}</span>
                </div>
              ))}
            </div>

            <AddToCart product={product} />
          </div>
        </Suspense>
      </section>

      {relatedProducts.length > 0 && (
        <section className="container py-12">
          <Suspense
            fallback={
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="aspect-square h-24 w-24 bg-neutral-200 animate-pulse" />
              </div>
            }
          >
            <h3 className="text-3xl font-bold mb-4">Related Products</h3>
            <ProductGrid products={relatedProducts} />
          </Suspense>
        </section>
      )}
    </main>
  )
}