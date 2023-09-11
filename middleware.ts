import { NextResponse } from "next/server"

export function middleware(request: NextResponse) {
  console.log("_______________ middleware ")

  return NextResponse.redirect(new URL("/", request.url))
}


export const config = {
  matcher: "/:path*"
}