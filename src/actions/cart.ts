'use server';

import { CartItem } from "@/components/cart/cartProvider";
import prisma from "@/lib/prisma";
import { sendAdminOrderNotificationEmail, sendOrderConfirmationEmail, sendOrderStatusUpdate } from "@/lib/sendemails";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getCart(){
  const cart = cookies().get('cart');
  return cart ? JSON.parse(cart.value) : [];
}

export async function updateCart(cart: CartItem[]) {
  cookies().set('cart', JSON.stringify(cart));
}

export async function createOrder(
  shippingDetails: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    email: string;
    phone: string;
  },
  paymentDetails: {
    paymentReference: string;
    totalAmount: number;
  }
){
  const cart = await getCart();
  const { email, ...shippingDataWithoutEmail } = shippingDetails;

  try {
    const order = await prisma.order.create({
      data: {
        OrderItem: {
          create: cart.map((item: CartItem) => ({
            productId: item.product.id,
            quantity: item.quantity,
          }))
        },
        shippingDetails: {
          create: shippingDataWithoutEmail
        },
        customerEmail: shippingDetails.email,
        totalAmount: paymentDetails.totalAmount,
        paymentReference: paymentDetails.paymentReference,
      },
    });
    await sendAdminOrderNotificationEmail(shippingDetails, cart, order);
    await sendOrderConfirmationEmail(shippingDetails, cart, order);
    await updateCart([]);    
    revalidatePath('/orders');
    return { success: true, orderId: order.id }
  } catch (error) {
    console.error('Failed to ', error)
    return { success: false, error: 'Failed to process payment' }
  }
}

export async function updateOrderStatus(orderId: number, status: OrderStatus){
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status }
    });
    await sendOrderStatusUpdate(order);
    revalidatePath('/admin/orders');
    revalidatePath('/orders');
    return { success: true }
  } catch (error) {
    console.error('Failed to update order status', error)
    return { success: false, error: 'Failed to update order status' }
  }
}