import { Suspense } from "react";
import Image from "next/image";
import HomeHero from "@/components/homeHero";
import { getCategories, getProductsFromRandomCategories } from "@/lib/fetchUtility";
import InlineLoader from "@/lib/loader";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import ProductGrid from "@/components/product/product-grid";

export default async function Home() {
  const categories = await getCategories();
  const products = await getProductsFromRandomCategories();

  return (
    <main>
      <HomeHero />

      {/* Categories section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="space-y-2 text-center flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Shop by Category</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Browse our wide selection of products across various categories to find what you need.
            </p>
          </div>

          <Suspense fallback={<InlineLoader />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {categories.map((category) => (
                <Card key={category.id}>
                  <div className="relative group overflow-hidden rounded-lg aspect-square">
                    <Link href={`/product?category=${category.name}`} className="absolute inset-0 z-10" />
                    <Image
                      alt={category.name}
                      src={category.image as string}
                      className="w-full h-[400px] rounded-xl object-cover group-hover:scale-90 transition-transform"
                      width={400}
                      height={400}
                      style={{ aspectRatio: '400/400', objectFit: 'cover' }}
                    />
                    <div className="border-t rounded-b-lg border-gray-200 dark:border-gray-800" />
                  </div>
                  <CardContent className="p-0 border-0">
                    <div className="space-y-2 px-4 py-2">
                      <CardTitle>{category.name}</CardTitle>
                      <p>{category.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Suspense>
        </div>
      </section>

      {/* Product section */}
      <section className="container mx-auto py-10 md:py-16">
        <h4 className="text-3xl font-bold text-center">Products Display</h4>

        <Suspense fallback={<InlineLoader />}>
          <ProductGrid products={products} />
        </Suspense>

      </section>

    </main>
  )
}
