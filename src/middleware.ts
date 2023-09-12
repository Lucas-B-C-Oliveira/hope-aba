// import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { tokenDecode } from "./utils/functions/helpers"


export async function middleware(request: NextResponse) {
  // const session = await getServerSession(authOptions)
  console.log("FORA request.url ", request.url)


  const accessToken = request.cookies.get('accessToken')
  const clinicsData = request.cookies.get('clinicsData')



  const authenticatedUser =
    typeof accessToken?.value === 'string' &&
    typeof clinicsData?.value === 'string'

  console.log('accessToken', accessToken)
  console.log('clinicsData', clinicsData)
  const a = tokenDecode(accessToken?.value ?? '')
  console.log('a', a)


  if (!authenticatedUser) {
    console.log("DENTRO request.url ", request.url)

    const newURL = new URL("/login", request.url)
    console.log('newURL', newURL)

    return NextResponse.redirect(new URL("/login", request.url))
    // return NextResponse.redirect("/login")
  }
  // return NextResponse.redirect(new URL(request.url))
  return null
  // return null

}


export const config = {
  matcher: "/admin/:path*"
}