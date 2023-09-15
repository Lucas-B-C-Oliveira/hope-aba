import { NextResponse } from 'next/server'
import { ACCESS_TOKEN, CLINICS_DATA } from './utils/functions/constants'

export async function middleware(request: NextResponse) {
  // console.log('FORA request.url ', request.url)

  const accessToken = request.cookies.get(ACCESS_TOKEN)
  const clinicsData = request.cookies.get(CLINICS_DATA)

  const authenticatedUser =
    typeof accessToken?.value === 'string' &&
    typeof clinicsData?.value === 'string'


  // console.log(ACCESS_TOKEN, accessToken)
  // console.log(CLINICS_DATA, clinicsData)

  if (!authenticatedUser) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return null
}

export const config = {
  matcher: '/admin/:path*',
}
