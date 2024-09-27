import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchOrderById } from "@/lib/fetchUtility"
import InlineLoader from "@/lib/loader"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export default async function OrderDetails({ params }: { params: { id: string } }) {
  const order = await fetchOrderById(Number(params.id))
  if (!order) notFound()

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <Button variant='outline' asChild>
        <Link href='/orders'>
          Back to Orders
        </Link>
      </Button>
      <Suspense fallback={<InlineLoader />}>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Order #{order.id}</CardTitle>
            <CardDescription>Placed on {formatDate(order.createdAt)}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-semibold mb-2">Status: {order.status}</p>
            <p className="font-semibold mb-4">Total: ₦{order.totalAmount.toLocaleString()}</p>
            <h3 className="text-lg font-semibold mb-2">Items:</h3>
            <ul className="space-y-2">
              {order.OrderItem.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.product.name} (x{item.quantity})</span>
                  <span>₦{(item.product.price * item.quantity).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href='/product'>
                Continue Shopping
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </Suspense>
    </div>
  )
}