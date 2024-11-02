'use client'

import { Product } from "@prisma/client"
import { Button } from "../ui/button"
import { useState } from "react";
import { useCart } from "./cartProvider";
import { LuLoader2, LuShoppingCart } from "react-icons/lu";
import { toast } from "sonner";

export default function AddToCart({ product }: { product: Product }) {
  const [isLoading, setIsLoading] = useState(false);
  const { addItem, openCart } = useCart();

  if (!product.inStock) {
    return (
      <Button size='lg' disabled className="tracking-wide p-4">
        Out of Stock
      </Button>
    )
  }

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await addItem({ product, quantity: 1 });
      toast.success(`${product.name} added to cart`);
      openCart();
    } catch (error) {
      console.error(error);
      toast.error("Error adding to cart");
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <Button size='lg' className="p-4 tracking-wide" onClick={handleAddToCart}>
      {isLoading ? (
        <span>
          <LuLoader2 className="animate-spin mr-3" size={24} />
        </span>
      ): (
        <>
          <LuShoppingCart size={24} className="mr-3" />
          Add to Cart
        </>
      )}
    </Button>
  )
}