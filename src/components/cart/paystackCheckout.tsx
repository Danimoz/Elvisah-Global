'use client';

import { generateReferenceId } from "@/lib/utils";
import { useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";

interface PaystackButtonProps {
  amount: number
  email: string
  disabled?: boolean
  onClose: () => void
  onSuccess: () => void
}


export default function PaystackCheckout({ email, amount, disabled, onClose, onSuccess }: PaystackButtonProps){
  const [referenceId, setReferenceId] = useState('')

  useEffect(() => {
    let storedReferenceId = localStorage.getItem('referenceId')
    if (!storedReferenceId) {
      storedReferenceId = generateReferenceId()
      localStorage.setItem('referenceId', storedReferenceId)
    }
    setReferenceId(storedReferenceId)
  }, [])


  const componentProps = {
    text: 'Proceed To Checkout',
    reference: referenceId,
    amount: amount * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
    email,
    onSuccess,
    onClose,
    className: 'p-4 font-bold text-xl rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 w-full',
  }

  return (
    <div className="flex items-center justify-center w-full">
      {!disabled && (
        <PaystackButton {...componentProps} disabled={disabled} />
      )}
    </div>
  )
}