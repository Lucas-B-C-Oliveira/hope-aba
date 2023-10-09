import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ACCESS_TOKEN, CLINICS_DATA } from './utils/functions/constants'

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN)
  const cookieClinicsData = request.cookies.get(CLINICS_DATA)
  const authenticatedUser =
    typeof accessToken?.value === 'string' &&
    typeof cookieClinicsData?.value === 'string'

  if (!authenticatedUser) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return null
}

export const config = {
  matcher: '/admin/:path*',
}
