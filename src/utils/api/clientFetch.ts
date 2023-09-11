import { getCookie } from 'cookies-next'
import { RequestInit } from 'next/dist/server/web/spec-extension/request'
// import { redirect } from 'next/navigation'

export async function CSFetch<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  const accessToken = getCookie('accessToken')
  const clinicsData = getCookie('clinicsData')

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
    clinicsDataParsed = JSON.parse(clinicsData)[0]?.id
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

  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/${input}`, {
    ...init,
    headers,
  })

  if (data?.statusText === 'No Content') {
    return data
  }

  const result = await data?.json()
  return result as T
}
