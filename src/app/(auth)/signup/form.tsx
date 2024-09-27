'use client';

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/submitButton";
import { signUp } from "@/actions/auth";
import { toast } from "sonner";

const initialActionState = {
  message: '',
  status: 0
};

export default function SignUpForm(){
  const [formState, formAction] = useFormState(signUp, initialActionState);
  const { replace } = useRouter();

  
  if (formState.status === 201) {
    toast.success(formState.message);
    replace('/login');
  } else {
    toast.error(formState.message);
  }

  return (
    <form action={formAction} className="my-4">
      <div className="mb-3 space-y-2">
        <Label htmlFor="firstName" className="text-lg mb-1">First Name</Label>
        <Input id='firstName' type="text" name='firstName' placeholder="Enter First Name" required />
      </div>
      <div className="mb-3 space-y-2">
        <Label htmlFor="lastName" className="text-lg mb-1">Last Name</Label>
        <Input id='lastName' type="text" name='lastName' placeholder="Enter Last Name" required />
      </div>
      <div className="mb-3 space-y-2">
        <Label htmlFor="email" className="text-lg mb-1">Email</Label>
        <Input id='email' type="email" name='email' placeholder="Enter email" required />
      </div>
      <div className="mb-3 space-y-2">
        <Label htmlFor="password" className="text-lg mb-1">Password</Label>
        <Input id='password' type="password" name='password' placeholder="Enter Password" required />
      </div>

      <div className="flex justify-center mt-4">
        <SubmitButton buttonText="Sign Up" />
      </div>
    </form>
  )
}
