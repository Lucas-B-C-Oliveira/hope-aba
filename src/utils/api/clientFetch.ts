import { getCookie } from 'cookies-next'
import { RequestInit } from 'next/dist/server/web/spec-extension/request'
import { redirect } from 'next/navigation'

export async function CSFetch<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  const accessToken = getCookie('accessToken')
  const clinicsData = getCookie('clinicsData')

  if (typeof accessToken === 'undefined') {
    redirect('/')
  }

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

  // console.log('data', data)

  if (data?.statusText === 'No Content') {
    return data
  }

  const result = await data?.json()
  return result as T
}
