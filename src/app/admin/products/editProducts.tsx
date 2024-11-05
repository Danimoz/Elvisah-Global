'use client'

import { updateProduct } from "@/actions/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Product } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductTable({ products }: { products: Product[]}){
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [newName, setNewName] = useState('')
  const [newPrice, setNewPrice] = useState(0)
  const [newDiscount, setNewDiscount] = useState(0)
  const [newStock, setNewStock] = useState(false)

  const handleSave = async (id: number) => {
    setLoading(true)
    try {
      await updateProduct(id, newName, newPrice, newStock);
      toast.success('Product updated successfully')
      setEditingId(null)
    } catch(error){
      console.error(error)
      toast.error('Failed to update product')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setNewName('')
    setNewPrice(0)
    setNewDiscount(0)
    setNewStock(false)
  }

  const handleEdit = (id: number, name: string, price: number, stock: boolean, discount?: number) => {
    setEditingId(id)
    setNewName(name)
    setNewPrice(price)
    setNewDiscount(discount || 0)
    setNewStock(stock)
  }

  return (
    <TableBody>
      {products.map(product => (
        <TableRow key={product.id}>
          <TableCell>
            {editingId === product.id ? (
              <Input 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            ) : product.name}
          </TableCell>
          <TableCell>
            {editingId === product.id ? (
              <Input 
                value={newPrice}
                onChange={(e) => setNewPrice(Number(e.target.value))}
              />
            ) : `₦ ${product.price.toLocaleString()}`}
          </TableCell>
          <TableCell>
            {editingId === product.id ? (
              <Input 
                value={newDiscount}
                onChange={(e) => setNewPrice(Number(e.target.value))}
              />
            ) : `${product.discount?.toLocaleString() || '' }`}
          </TableCell>
          <TableCell>
            {editingId === product.id ? (
              <Input 
                checked={newStock}
                onChange={(e) => setNewStock(e.target.checked)}
                type="checkbox"
              />
            ) : product.inStock ? 'In Stock' : 'Out of Stock'}
          </TableCell>
          <TableCell>
            {editingId === product.id ? (
              <>
                <Button onClick={() => handleSave(product.id)} disabled={loading} className="mr-4">Save</Button>
                <Button onClick={handleCancel} disabled={loading}>Cancel</Button>
              </>
            ) : (
              <Button onClick={() => handleEdit(product.id, product.name, product.price, product.inStock, product.discount || 0)} disabled={loading}>Edit</Button>
            )}
          </TableCell>
        </TableRow>
      ))}

    </TableBody>
  )
}