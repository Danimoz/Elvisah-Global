import { CartItem } from "@/components/cart/cartProvider";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateReferenceId() {
  const date = new Date().toISOString().slice(0,10).replace(/-/g,""); // YYYYMMDD format
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase(); // Using slice() to get the random part
    
  return `ORD-${date}-${randomPart}`;
}

export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' })
}

export const calculateItemTotal = (item: CartItem) => {
  const discountedPrice = item.product.discount && item.product.discount > 0
    ? item.product.discount
    : item.product.price
  
  return discountedPrice * item.quantity
}