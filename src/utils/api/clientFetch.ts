import { getCookie } from 'cookies-next'
import { RequestInit } from 'next/dist/server/web/spec-extension/request'
import {
  ACCESS_TOKEN,
  CLINICS_DATA,
  CURRENT_CLINIC_DATA_INDEX,
} from '../functions/constants'
// import { redirect } from 'next/navigation'

export async function CSFetch<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  const accessToken = getCookie(ACCESS_TOKEN)
  const clinicsData = getCookie(CLINICS_DATA)
  const currentClinicDataIndex =
    typeof getCookie(CURRENT_CLINIC_DATA_INDEX) === 'string'
      ? (getCookie(CURRENT_CLINIC_DATA_INDEX) as string)
      : 0

  const regex = /(clinics|sign-in)/
  const isSignOrClinicsEndPoint = String(input).match(regex)

  // if (
  //   (typeof accessToken === 'undefined' ||
  //     typeof clinicsData === 'undefined') &&
  //   !isSignOrClinicsEndPoint
  // ) {
  //   redirect('/login') //! TODO: O Certo é chamar um modal de login e não redirecionar -> Como chamar um modal de login aqui?
  // }

  let clinicsDataParsed

  if (typeof clinicsData !== 'undefined' && typeof clinicsData === 'string') {
    clinicsDataParsed = JSON.parse(clinicsData)[currentClinicDataIndex]?.id
  }

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'X-Clinic-Id': typeof clinicsData !== 'undefined' ? clinicsDataParsed : '',
    Authorization:
      typeof accessToken !== 'undefined' ? (accessToken as string) : '',
  }
  const headers = init?.headers
    ? { ...defaultHeaders, ...init.headers }
    : defaultHeaders

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/${input}`,
    {
      ...init,
      headers,
    },
  )

  if (!response.ok) {
    const errorDetails = await response.json()
    throw new Error(`${errorDetails.message}`)
  }

  if (response?.statusText === 'No Content') {
    return response
  }

  const result = await response?.json()
  return result as T
}
