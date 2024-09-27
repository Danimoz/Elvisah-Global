'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function ThankYouPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if there's a payment reference in the URL
    const urlParams = new URLSearchParams(window.location.search)
    const reference = urlParams.get('reference')

    if (!reference) {
      // If there's no reference, redirect to home page
      toast.error('Invalid aCCESS', {
        description: "You've reached this page in error. Redirecting to home page.",
      })
      router.push('/')
    }
  }, [router])

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Thank You for Your Order!</h1>
      <p className="text-xl mb-8">Your order has been successfully placed and is being processed.</p>
      <p className="mb-8">You will receive an email confirmation shortly.</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/product">Continue Shopping</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/orders">View Orders</Link>
        </Button>
      </div>
    </div>
  )
}