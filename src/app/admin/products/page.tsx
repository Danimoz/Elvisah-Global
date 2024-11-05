import { Table, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { getAllProducts } from "@/lib/fetchUtility";
import InlineLoader from "@/lib/loader";
import { Suspense } from "react";
import ProductTable from "./editProducts";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProductsPageProps {
  searchParams?: {
    page?: string
    name?: string
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const products = await getAllProducts();
  const search = searchParams?.name || ''; 
  const page = Number(searchParams?.page) || 1;

  return (
    <section>
      <Suspense fallback={<InlineLoader />}>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      {'products' in products && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <ProductTable products={products.products} />
          </Table>

          <div className="flex justify-end gap-x-4 mt-4">
            <Button disabled={!products.hasPrev}>
              <Link href={{ pathname: "/admin/products", query: {
                ...(search ? { name: search } : {}),
                page: products.hasPrev ? page - 1 : 1
              }}}>
                Prev
              </Link>
            </Button>
            <Button disabled={!products.hasNext}>
              <Link href={{ pathname: "/admin/products", query: {
                ...(search ? { name: search } : {}),
                page: products.hasNext ? page + 1 : page
              }}}>
                Next
              </Link>
            </Button>
          </div>
        </>
      )}

      </Suspense>
    </section>
  )
}