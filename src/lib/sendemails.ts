import { CartItem } from "@/components/cart/cartProvider";
import { Order } from "@prisma/client";
import { Resend } from "resend";


export async function sendAdminOrderNotificationEmail(
  shippingDetails: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    email: string;
    phone: string;
  },
  cart: CartItem[],
  order: Order
){
  const itemList = cart.map((item: CartItem) => (
    `Product: ${item.product.name} - Quantity: ${item.quantity} - Price: ${(item.product.price * item.quantity).toLocaleString()}`
  )).join('\n')
  const resend = new Resend(process.env.RESEND_API_KEY as string)
  
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM as string,
      to: [`${process.env.ADMIN_EMAIL}`],
      subject: `New Order Received!`,
      text: `A new order has been received. 
      
      Order Details:
      Date: ${new Date(order.createdAt).toLocaleString()}
      Total Amount: ₦${order.totalAmount.toLocaleString()}
      Customer Email: ${order.customerEmail}

      Items:
      ${itemList}

      Shipping Details:
      Name: ${shippingDetails.firstName} ${shippingDetails.lastName}
      Address: ${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.country}
      Phone: ${shippingDetails.phone}

      Please process this order as soon as possible.`,
    })

    return { status: 200, message: 'Email sent successfully!' }
  } catch (error) {
    console.log(error)
    return { status: 400, message: 'An error occured' }
  }
}


export async function sendOrderConfirmationEmail(
  shippingDetails: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    email: string;
    phone: string;
  },
  cart: CartItem[],
  order: Order
){
  const itemList = cart.map((item: CartItem) => (
    `Product: ${item.product.name} - Quantity: ${item.quantity} - Price: ${(item.product.price * item.quantity).toLocaleString()}`
  )).join('\n')
  const resend = new Resend(process.env.RESEND_API_KEY as string)
  
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM as string,
      to: [`${order.customerEmail}`],
      subject: `Order Confirmation!`,
      replyTo: process.env.ADMIN_EMAIL as string,
      text: `Thank you for your order. 
      
      Order Details:
      Date: ${new Date(order.createdAt).toLocaleString()}
      Total Amount: ₦${order.totalAmount.toLocaleString()}
      Customer Email: ${order.customerEmail}

      Items:
      ${itemList}

      Shipping Details:
      Name: ${shippingDetails.firstName} ${shippingDetails.lastName}
      Address: ${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.country}
      Phone: ${shippingDetails.phone}

      Your order is being processed and will be shipped soon.
      Thank you for shopping with us.
      `,
    })

    return { status: 200, message: 'Email sent successfully!' }
  } catch (error) {
    console.log(error)
    return { status: 400, message: 'An error occured' }
  }
}

export async function sendOrderStatusUpdate(order: Order){
  const resend = new Resend(process.env.RESEND_API_KEY as string)
  
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM as string,
      to: [`${order.customerEmail}`],
      subject: `Order Update!`,
      replyTo: process.env.ADMIN_EMAIL as string,
      text: `Your order has been updated. 
      
      Order Details:
      Date: ${new Date(order.createdAt).toLocaleString()}
      Total Amount: ₦${order.totalAmount.toLocaleString()}
      Customer Email: ${order.customerEmail}
      Status: ${order.status}

      
      ${order.status === 'SHIPPED' ? `Your order has been shipped. You will receive it soon.` : '' }
      ${order.status === 'DELIVERED' ? `Your order has been delivered. Thank you for shopping with us.` : "" }
      ${order.status === 'CANCELLED' ? `Your order has been cancelled. We are sorry for any inconvenience.`: '' }

      Thank you for shopping with us.
      `,
    })

    return { status: 200, message: 'Email sent successfully!' }
  } catch (error) {
    console.log(error)
    return { status: 400, message: 'An error occured' }
  }
}