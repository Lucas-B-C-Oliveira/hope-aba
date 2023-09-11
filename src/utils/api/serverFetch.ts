/* eslint-disable prettier/prettier */
import { RequestInit } from 'next/dist/server/web/spec-extension/request'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function SSFetch<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const clinicsData = cookieStore.get('clinicsData')

  if (
    typeof accessToken === 'undefined' ||
    typeof clinicsData === 'undefined'
  ) {
    redirect('/login') //! TODO: O Certo é chamar um modal de login e não redirecionar -> Como chamar um modal de login aqui?
  }

  const token = accessToken?.value

  let clinicsDataParsed

  const currentClinic: any | undefined =
    typeof clinicsData !== 'undefined'
      ? JSON.parse(clinicsData.value)
      : undefined;

  if (typeof currentClinic !== 'undefined') {
    clinicsDataParsed = currentClinic[0]?.id
  }


  console.log('clinicsDataParsed', clinicsDataParsed)


  const defaultHeaders = {
    'Content-Type': 'application/json',
    'X-Clinic-Id':
      typeof clinicsDataParsed !== 'undefined' && typeof clinicsDataParsed === 'string'
        ? (clinicsDataParsed as string)
        : '',
    Authorization: typeof token !== 'undefined' ? token : '',
  }
  const headers = init?.headers
    ? { ...defaultHeaders, ...init.headers }
    : defaultHeaders

  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/${input}`, {
    ...init,
    headers,
  })

  const result = await data.json()
  return result as T
}
