import { getCookie } from 'cookies-next'

export async function CSFetch<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  const accessToken = getCookie('accessToken')
  const clinicsData = getCookie('clinicsData')

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'X-Clinic-Id':
      typeof clinicsData !== 'undefined' ? JSON.parse(clinicsData)[0]?.id : '',
    Authorization: typeof accessToken !== 'undefined' ? accessToken : '',
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
