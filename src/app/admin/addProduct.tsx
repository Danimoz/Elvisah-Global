'use client';

import { createProduct } from "@/actions/product";
import SubmitButton from "@/components/submitButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@prisma/client";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

interface AddProductProps {
  categories: Category[]
}

const initialActionState = {
  message: '',
  status: 0
}

export default function AddProduct({ categories }: AddProductProps) {
  const [formState, formAction] = useFormState(createProduct, initialActionState);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    await formAction(formData);
    if (formState.status === 201) {
      toast.success(formState.message);
      formRef.current?.reset();
    } else if (formState.status >= 400) {
      toast.error(formState.message);
    }
  }

  
  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle>Add Product</CardTitle>
        <CardDescription>Fill out the form to add a new product to your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" action={handleSubmit} ref={formRef}>
          <div className="space-y-2">
            <Label htmlFor="product-name">Product Name *</Label>
            <Input id="product-name" name='name' placeholder="Enter product name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <select id="category" name='category' className="w-full p-2 border border-gray-300 rounded-md" required>
              <option value="" selected>Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="features">Features</Label>
            <Textarea id="features" name='features' placeholder="Enter Product Features separated by a Comma." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-price">Price *</Label>
            <Input id="product-price" name='price' placeholder="Enter product price"  type="number" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-discount">Discount</Label>
            <Input id="product-discount" name="discount" placeholder="Enter discount amount" type="number" step="0.01" min="0" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-image">Image *</Label>
            <Input id="product-image" name='image' placeholder="Enter product image URL" type="file" accept="image/*" required />
          </div>
          <SubmitButton buttonText="Add Product" />
        </form>
      </CardContent>
    </Card>
  )
}