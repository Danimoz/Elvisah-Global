'use client';

import { useState } from "react";
import { PaystackButton } from "react-paystack";

interface PaystackButtonProps {
  amount: number
  email: string
  disabled?: boolean
  onClose: () => void
  onSuccess: () => void
  reference: string
}


export default function PaystackCheckout({ email, amount, disabled, onClose, onSuccess, reference }: PaystackButtonProps){
  const [referenceId, setReferenceId] = useState(reference || '');

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