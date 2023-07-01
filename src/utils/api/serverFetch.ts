import { cookies } from 'next/headers'

export async function SSFetch<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const clinicsData = cookieStore.get('clinicsData')

  const token = accessToken?.value
  const currentClinic =
    typeof clinicsData !== 'undefined' ? clinicsData?.value[0] : clinicsData

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'X-Clinic-Id': typeof clinicsData !== 'undefined' ? currentClinic?.id : '',
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
