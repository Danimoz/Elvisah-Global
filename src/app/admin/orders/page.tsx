import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchAllOrders } from "@/lib/fetchUtility"
import UpdateOrderStatus from "./updateOrderStatus"
import InlineLoader from "@/lib/loader"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import OrderFilters from "./filters"


interface AllOrdersProps {
  searchParams?: {
    page?: string
    status?: string
    email?: string
  }
}

export default async function AllOrders({ searchParams }: AllOrdersProps) {
  const { page, status, email } = searchParams || {};

  const pageNo  = Number(page) || 1
  const statusFilter = status || ''
  const emailFilter = email || ''
  const orders = await fetchAllOrders(statusFilter, emailFilter, pageNo)
  
  return (
    <div>
      <h1 className="text-3xl font-semibold">All Orders</h1>
      <Suspense fallback={<InlineLoader />}>
        <OrderFilters />
        <Table className="mt-8">
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer Email</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.orders.map(order => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customerEmail}</TableCell>
                <TableCell>₦{order.totalAmount.toLocaleString()}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <ul>
                    {order.OrderItem.map(item => (
                      <li key={item.id}>
                        {item.product.name} - {item.quantity} x ₦{item.product.price.toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <UpdateOrderStatus orderId={order.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-8 flex gap-x-6">
          <Button disabled={!orders.hasPrev}>
            <Link href={`/admin/orders?page=${pageNo - 1}`}>
              Previous
            </Link>
          </Button>
          <Button disabled={!orders.hasNext}>
            <Link href={`/admin/orders?page=${pageNo + 1}`}>
              Next
            </Link>
          </Button>
        </div>
      </Suspense>
    </div>
  )
}