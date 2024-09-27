'use client';

import { createOrder } from "@/actions/cart";
import { useCart } from "@/components/cart/cartProvider";
import PaystackCheckout from "@/components/cart/paystackCheckout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InlineLoader from "@/lib/loader";
import { generateReferenceId } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function CheckoutForm(){
  const { items, clearCart, closeCart } = useCart()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [isFormValid, setIsFormValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [referenceId, setReferenceId] = useState('')
  const { push } = useRouter();
  
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const validateForm = useCallback(() => {
    const errors: Record<string, string> = {};
    let isValid = true;
  
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
        isValid = false;
      }
    });

    // Special case for email validation
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }
  
    setFormErrors(errors);
    setIsFormValid(isValid);
    return isValid;
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setTouchedFields(prev => ({ ...prev, [name]: true }))
    validateForm()
  }

  const handlePaymentSuccess = async () => {
    setIsLoading(true)
    await createOrder(formData, { paymentReference: referenceId, totalAmount: total })
    await clearCart()
    toast.success('Payment successful')
    push(`/thank-you?reference=${referenceId}`)
  }

  const handlePaymentCancel = () => {
    toast.error('Payment cancelled')
  }

  useEffect(() => {
    closeCart()
  }, [])

  useEffect(() => {
    const refId = generateReferenceId()
    setReferenceId(refId)
  }, [])

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <InlineLoader />
    </div>
  )

  return (
    <section className="min-h-screen container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                {touchedFields.firstName && formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
                {touchedFields.lastName && formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {touchedFields.email && formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              {touchedFields.phone && formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
              {touchedFields.address && formErrors.address && <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
                {touchedFields.city && formErrors.city && <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>}
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
                {touchedFields.country && formErrors.country && <p className="text-red-500 text-sm mt-1">{formErrors.country}</p>}
              </div>
            </div>
          </form>
        </div>

        <div>
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.product.id} className="flex justify-between">
                <span>{item.product.name} x {item.quantity}</span>
                <span>₦{(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <PaystackCheckout 
              email={formData.email}
              amount={total}
              onSuccess={handlePaymentSuccess}
              onClose={handlePaymentCancel}
              disabled={!isFormValid}
              reference={referenceId}
            />
          </div>
          
        </div>
      </div>
    </section>
  )
}