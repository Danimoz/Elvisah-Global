'use client'

import addCategory from "@/actions/product"
import SubmitButton from "@/components/submitButton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useRef } from "react"
import { useFormState } from "react-dom"
import { toast } from "sonner"

const initialActionState = {
  message: '',
  status: 0
}

export default function AddCategory() {
  const [formState, formAction] = useFormState(addCategory, initialActionState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.status === 201) {
      toast.success(formState.message);
      formRef.current?.reset();
    } else {
      toast.error(formState.message);
    }
  }, [formState.status])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Category</CardTitle>
        <CardDescription>Fill out the form to add a new category.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} className="space-y-4" action={formAction}>
          <div className="space-y-2">
            <Label htmlFor="category-name">Category Name</Label>
            <Input id="category-name" placeholder="Enter category name" name="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category-img">Image</Label>
            <Input id="category-img" type="file" accept="image/*" placeholder="Enter category name" name="img" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category-description">Description</Label>
            <Textarea id="category-description" placeholder="Enter category description" />
          </div>
          <SubmitButton buttonText="Add Category" />
        </form>
      </CardContent>
    </Card>
  )
}