import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchOrders } from "@/lib/fetchUtility"
import Link from "next/link"
import OrdersForm from "./form"
import { Suspense } from "react"
import InlineLoader from "@/lib/loader"
import { formatDate } from "@/lib/utils"



export default async function OrdersPage({ searchParams } : { searchParams: { email: string, page: string } }) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const orders = searchParams.email ? await fetchOrders(searchParams.email, page) : { orders: [], hasNext: false, hasPrev: false }
 
  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      <OrdersForm />

      <Suspense fallback={<InlineLoader />}>
        {orders && orders.orders.length > 0 && (
          <Table>
            <TableCaption>A list of your recent orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>₦{order.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link href={`/orders/${order.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {orders.hasPrev && (
          <div className="flex justify-start mt-4">
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <Link href={`/orders?email=${searchParams.email}&page=${page - 1}`}>
                Previous
              </Link>
            </Button>
          </div>
        )}

        {orders.hasNext && (
          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <Link href={`/orders?email=${searchParams.email}&page=${page + 1}`}>
                Next
              </Link>
            </Button>
          </div>
        )}


        {orders.orders.length === 0 && (
          <p className="text-center text-gray-500 my-8">
            No orders found. Enter your email address to view your orders.
          </p>
        )}
      </Suspense>
    </div>
  )
}