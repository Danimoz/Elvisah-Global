'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function OrdersForm() {
  const searchParams = useSearchParams()
  const spEmail = searchParams.get('email') || ''
  const [email, setEmail] = useState(spEmail)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    router.push(`/orders?email=${encodeURIComponent(email)}`)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'View Orders'}
        </Button>
      </div>
    </form>
  )
}