import { NextResponse } from "next/server";
import { getCookie, updateCookie } from "@/lib/cookies";

const LOGIN_URL = '/'

export async function middleware(request) {
  const cookie = await getCookie('session')
  console.log('MIDDLEWARE ', request.nextUrl.pathname);

  if (cookie) {
    const newCookie = updateCookie('session', cookie)

    const response = NextResponse.next();
    response.cookies.set(newCookie)

    return response
  }

  if (request.nextUrl.pathname != LOGIN_URL) {

    const loginUrl = new URL(LOGIN_URL, request.url)


    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)

    return NextResponse.redirect(loginUrl)
  }

}


export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}