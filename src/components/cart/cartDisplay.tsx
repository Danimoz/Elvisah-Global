'use client';

import Image from 'next/image';
import Link from 'next/link'
import { LuMinus, LuPlus, LuShoppingCart, LuTrash2 } from "react-icons/lu";
import { useCart } from "./cartProvider";
import { Button } from '../ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CartDisplay() {
  const { items, removeItem, updateItemQuantity } = useCart();
  const [loading, setLoading] = useState<number | null>(null)

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleUpdateQuantity = async(id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setLoading(id)
    try {
      await updateItemQuantity(id, newQuantity)
    } catch(error) {
      toast.error('Failed to update quantity')
    } finally {
      setLoading(null)
    }
  }

  const handleRemoveItem = async (id: number) => {
    setLoading(id)
    try {
      await removeItem(id)
    } catch(error) {
      toast.error('Failed to remove item')
    } finally {
      setLoading(null)
    }
  }
    
  return (
    <div className='h-full relative'>
      <h4 className="mt-6 text-xl font-semibold">My Cart</h4>
      {items.length === 0 && (
        <div className="mt-20 space-y-4">
          <LuShoppingCart size={32} className="mx-auto text-gray-300" />
          <p className="mt-6 font-bold text-2xl text-center">Your cart is empty</p>
        </div>
      )}

      <div className="mt-4 space-y-8 overflow-y-auto w-full">
        {items.map(item => (
          <div key={item.product.id} className="flex items-center space-x-4 border-b pb-4">
            <Image
              src={item.product.image!}
              alt={item.product.name}
              width={64}
              height={64}
              className='rounded-lg object-cover h-full'
            />
            <div className='flex-1'>
              <h5 className="font-semibold text-xl">{item.product.name}</h5>
              <p className="text-gray-500">₦{(item.product.price * item.quantity).toLocaleString()}</p>
              <div className="flex items-center space-x-4 mt-2 border border-neutral-200 rounded-lg">
                <Button 
                  size='icon' 
                  variant='ghost'
                  onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                  disabled={loading === item.product.id || item.quantity <= 1}
                  className='w-full'
                >
                  <LuMinus size={16} />
                </Button>
                <span className='w-full text-center'>{item.quantity}</span>
                <Button 
                  size='icon' 
                  variant='ghost' 
                  className='w-full'
                  onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                  disabled={loading === item.product.id}
                >
                  <LuPlus size={16} />
                </Button>
              </div>
            </div>
            <div>
              <Button 
                size='sm'
                disabled={loading === item.product.id}
                onClick={() => handleRemoveItem(item.product.id)}
              >
                <LuTrash2 size={20} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div className='p-4 absolute bottom-0 space-y-4 w-full'>
          <div className="flex justify-between items-center border-b pb-2">
            <p className="font-semibold">Total</p>
            <p className="font-semibold">₦{total.toLocaleString()}</p>
          </div>
          <div className="max-w-full">
            <Button 
              size='lg' 
              className='rounded-xl p-4 w-full' 
              asChild
            >
              <Link href='/checkout'>
                Proceed to Checkout
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}