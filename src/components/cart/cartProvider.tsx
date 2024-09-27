'use client'

import { getCart, updateCart } from "@/actions/cart"
import { Product } from "@prisma/client"
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"

export interface CartItem {
  quantity: number
  product: Product
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => Promise<void>
  removeItem: (id: number) => Promise<void>
  clearCart: () => Promise<void>
  updateItemQuantity: (id: number, newQuantity: number) => Promise<void>
  openCart: () => void
  closeCart: () => void
  isCartOpen: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const openCart = useCallback(() => {setIsCartOpen(true)}, [])
  const closeCart = useCallback(() => {setIsCartOpen(false)}, [])

  useEffect(() => {
    const loadCart = async () => {
      const cart = await getCart()
      setItems(cart)
    }
    loadCart();
  }, [])

  const addItem = async (item: CartItem) => {
    const updatedItems = items.slice()
    const existingItem = updatedItems.find(i => i.product.id === item.product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      updatedItems.push({ ...item, quantity: 1 })
    }
    setItems(updatedItems)
    await updateCart(updatedItems)
  }

  const updateItemQuantity = async (id: number, newQuantity: number) => {
    const updatedItems = items.map(item => 
      item.product.id === id ? { ...item, quantity: newQuantity } : item
    )
    setItems(updatedItems)
    await updateCart(updatedItems)
  }

  const removeItem = async (id: number) => {
    const updatedItems = items.filter(item => item.product.id !== id)
    setItems(updatedItems)
    await updateCart(updatedItems)
  }

  const clearCart = async () => {
    setItems([])
    await updateCart([])
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, updateItemQuantity, openCart, isCartOpen, closeCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}