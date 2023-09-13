import { cookies } from 'next/headers'
import { SSFetch } from '../api/serverFetch'
import { LoginParams } from '@/types'
import { tokenDecode } from './helpers'

export function checkServerAuth() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const clinicsData = cookieStore.get('clinicsData')

  const authenticatedUser =
    typeof accessToken?.value === 'string' &&
    typeof clinicsData?.value === 'string'
  return {
    authenticatedUser,
  }
}

export async function authenticate(loginParams: any) {
  console.log('loginParams', loginParams)

  try {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('')
      }, 5000)
    })

    const signinResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/sign-in`,
      {
        method: 'POST',
        body: JSON.stringify(loginParams),
      },
    )

    // const signinResponse = await SSFetch<any>('', {
    //   method: 'POST',
    //   body: JSON.stringify(loginParams),
    // })

    console.log('signinResponse', signinResponse)

    // const token = signinResponse?.token ?? ''
    const token = ''
    const value = `Bearer ${token}`

    console.log('valueToken', value)

    const { exp, clinicIds } = tokenDecode(token)
    const expDate = new Date(exp * 1000)
    // setCookie('accessToken', value, {
    //   expires: expDate,
    // })

    // const signinResponse = await SSFetch<any>('sign-in')

    // const clinicsPromises = clinicIds.map((clinicId: string) => {
    //   return SSFetch<{
    //     data: { id: string; name: string; document: string }
    //   }>(`clinics/${clinicId}`)
    // })

    const clinicsPromises = clinicIds.map((clinicId: string) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/sign-in/${clinicId}`,
      )
    })

    const clinicsResults = await Promise.all(clinicsPromises)

    console.log('clinicsResults', clinicsResults)

    const clinicsData = clinicsResults?.map((element: any) => element.data)
    console.log('clinicsData', clinicsData)

    // setCookie('clinicsData', clinicsData, {
    //   expires: expDate,
    // })
  } catch (error) {
    console.log('error', error)
  }

  return {
    name: 'name',
    email: 'email',
    id: 'id',
  }
}
