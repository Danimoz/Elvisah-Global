import { User } from '@prisma/client';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import 'server-only';

const secretKey = process.env.AUTH_SECRET as string;
const encodedSecret = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any){
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(encodedSecret);
}

export async function decryptSession(session: string) {
  try {
    const { payload } = await jwtVerify(session, encodedSecret, {
      algorithms: ["HS256"]
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(user: Omit<User, 'password'>) {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 2);
  const session = await encrypt({ user, expiresAt });
  
  cookies().set('session', session, {
    expires: expiresAt,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    // this is when your backend and frontend are on same domain and port, if on a different domain, you can set sameSite to 'none'
    sameSite: 'strict',
  });
}

export async function updateSession() {
  const session = cookies().get('session')?.value;
  if (!session) return;
  const payload = await decryptSession(session);
  if (!payload) return;

  payload.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 2);
  const res = NextResponse.next();
  res.cookies.set({
    expires: payload.expiresAt as Date,
    httpOnly: true,
    name: 'session',
    value: await encrypt(payload),
  });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decryptSession(session);
}

export async function logout() {
  // Destroy the session
  cookies().delete('session');
}
