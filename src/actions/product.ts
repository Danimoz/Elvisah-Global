'use server'

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { User } from "@prisma/client";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string, 
  api_key: process.env.CLOUDINARY_API_KEY as string, 
  api_secret: process.env.CLOUDINARY_API_SECRET as string,  
});


export async function createProduct(_prevState: unknown, formData: FormData){
  const session = await getSession();
  if (!session) return { message: "Unauthorized", status: 401 };

  const name = formData.get('name') as string;
  const img = formData.get('image') as File;
  const features = (formData.get('features') as string).split(',');
  const price = Number(formData.get('price'));
  const category = Number(formData.get('category'));
  if (!name  || !price|| img.size < 1 ) {
    return { message: "All fields are required", status: 400 };
  }

  const fileBuffer = await img.arrayBuffer();
  const base64Data = Buffer.from(fileBuffer).toString('base64');
  const fileUri = `data:${img.type};base64,${base64Data}`;
  let image

  try {
    const upload: UploadApiResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(fileUri, { folder: 'elvis/product' }, (error, result) => {
        if (error) reject(error);
        if (result) resolve(result);
      });
    });
  
    image = upload.secure_url;
    const user = session.user as Omit<User, 'password'>;
    const slug = name.toLowerCase().replace(/\s/g, '-');
    await prisma.product.create({
      data: { name, image, slug, features, price, categoryId: category, addedBy: user.id } 
    });

    revalidatePath('/', 'layout')
    return { message: "Successful!", status: 201 };
  } catch (error) {
    console.log(error);
  
    const errorMessage = error instanceof Error
      ? error.message
      : "Something went wrong, Please try again!";
  
    return { message: errorMessage, status: 500 };
  }
}

export default async function addCategory(_prevState: unknown, formData: FormData) {
  const session = await getSession();
  if (!session) return { message: "Unauthorized", status: 401 };
  
  const name = formData.get('name') as string;
  const img = formData.get('img') as File;
  const description = formData.get('description') as string;
  let image = ''

  if (!name || img.size < 1 ) {
    return { message: "All fields are required", status: 400 };
  }

  const fileBuffer = await img.arrayBuffer();
  const base64Data = Buffer.from(fileBuffer).toString('base64');
  const fileUri = `data:${img.type};base64,${base64Data}`;

  try {
    const upload: UploadApiResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(fileUri, { folder: 'elvis' }, (error, result) => {
        if (error) reject(error);
        if (result) resolve(result);
      });
    });
  
    image = upload.secure_url;
    
    const user = session.user as Omit<User, 'password'>;
    await prisma.category.create({
      data: { name, image, description, createdBy: user.id } 
    });

    revalidatePath('/', 'layout')
    return { message: "Successful!", status: 201 };
  } catch (error) {
    console.log(error)
    return { message: "Something went wrong, Please try again!", status: 500 };
  }
}

export async function updateProduct(id: number, name: string, price: number, inStock: boolean) { 
  const session = await getSession();
  if (!session) return { message: "Unauthorized", status: 401 };

  try {
    await prisma.product.update({
      where: { id },
      data: { name, price, inStock }
    });

    revalidatePath('/', 'layout')
    return { message: "Successful!", status: 200 };
  } catch (error) {
    console.log(error)
    return { message: "Something went wrong, Please try again!", status: 500 };
  }
}  