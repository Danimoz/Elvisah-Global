import { NextRequest, NextResponse } from "next/server";
import { decryptSession, updateSession } from "@/lib/session";

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get('session')?.value;
  const session = await decryptSession(cookie as string);

  if (!session && request.nextUrl.pathname.startsWith('/admin')) {
    const loginUrl = new URL('/login', request.nextUrl);
    loginUrl.searchParams.set('to', request.nextUrl.pathname);

    return NextResponse.redirect(loginUrl.toString());
  }

  await updateSession();
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path'],
};