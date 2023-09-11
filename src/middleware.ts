import { NextResponse } from "next/server"

export function middleware(request: NextResponse) {
  console.log(" middleware __")

  return NextResponse.redirect(new URL("/", request.url))
}


export const config = {
  matcher: "/admin/:path*"
}