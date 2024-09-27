'use client';

import { ShoppingCart } from "lucide-react";
import { useCart } from "./cartProvider";

export default function CartIcon() {
  const { items } = useCart();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative">
      <ShoppingCart size={24} className="transition-all ease-in-out hover:scale-110"/>
      {itemCount > 0 && (
        <span className="absolute -top-2 right-3 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {itemCount}
        </span>
      )}
    </div>
  )
}