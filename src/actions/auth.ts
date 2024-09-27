'use server'

import prisma from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { compare, hash } from "bcryptjs";
import { redirect } from "next/navigation";

export async function signUp(_prevState: unknown, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;

  if (!email || !password || !firstName || !lastName) {
    return { message: "All fields are required", status: 400 };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email }
    });
    if (existingUser) {
      return { message: "User already exists", status: 400 };
    }

    const hashedPassword = await hash(password, 10);
    await prisma.user.create({
      data: { email, password: hashedPassword, firstname: firstName, lastname: lastName }
    });

    return { message: "Successful!", status: 201 };
  } catch (error) {
    console.log(error)
    return { message: "Something went wrong, Please try again!", status: 500 };
  }
}

export async function signIn(_prevState: unknown, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const redirectTo = formData.get('redirectTo') as string;

  if (!email || !password) {
    return { message: "All fields are required", status: 400 };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) {
      return { message: "Invalid credentials", status: 400 };
    }
  
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return { message: "Invalid credentials", status: 400 };
    }
    await createSession(user);
  } catch (error) {
    console.log(error)
    return { message: "Something went wrong, Please try again!", status: 500 };
  }

  redirect(redirectTo);

}