'use client';

import { useFormState } from "react-dom";
import { useSearchParams } from "next/navigation";
import { signIn } from "@/actions/auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/submitButton";
import { toast } from "sonner";
import { useEffect } from "react";

const initialActionState = {
  message: '',
  status: 0
};

export default function LoginForm() {
  const [formState, formAction] = useFormState(signIn, initialActionState);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('to') ?? '/';

  useEffect(() => {
    if (formState.status !== 0 && formState.status !== 200 && formState.message) {
      toast.error(formState.message);
    }
  }, [formState]);
  
  return (
    <form action={formAction}>
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <div className="space-y-2 mb-4">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" required />
      </div>
      <div className="space-y-2 mb-6">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name='password' required />
      </div>
      <SubmitButton buttonText="Log In" />
    </form>
  )
}