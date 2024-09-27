'use client';

import { updateOrderStatus } from "@/actions/cart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OrderStatus } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";


export default function UpdateOrderStatus({ orderId }: { orderId: number }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    try {
      setIsLoading(true);
      const updatedOrder = await updateOrderStatus(orderId, newStatus as OrderStatus);
      if(updatedOrder.success){
        toast.success('Order status updated successfully')
      }
    } catch(error){
      console.log(error)
      toast.error('An error occured while updating order status')
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Select 
        onValueChange={(value) => handleStatusChange(value)} 
        disabled={isLoading}
      >
        <SelectTrigger>
          <SelectValue placeholder="Change Status" />
        </SelectTrigger>
        <SelectContent className={`${isLoading ? 'bg-gray-100 text-gray-400' : ''}`}>
          <SelectItem value="PAID">PAID</SelectItem>
          <SelectItem value="PROCESSING">PROCESSING</SelectItem>
          <SelectItem value="SHIPPED">SHIPPED</SelectItem>
          <SelectItem value="DELIVERED">DELIVERED</SelectItem>
          <SelectItem value="CANCELLED">CANCELLED</SelectItem>
        </SelectContent>        
      </Select>
    </div>
  )
}