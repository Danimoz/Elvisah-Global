'use client';

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

interface SubmitButtonProps {
  buttonText: string
}

export default function SubmitButton({ buttonText }: SubmitButtonProps){
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} aria-disabled={pending}>
      {pending ? "Submitting..." : buttonText}
    </Button>
  )
}