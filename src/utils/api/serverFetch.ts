/* eslint-disable prettier/prettier */
import { RequestInit } from 'next/dist/server/web/spec-extension/request'
import { cookies } from 'next/headers'
import { ACCESS_TOKEN, CLINICS_DATA, CURRENT_CLINIC_DATA_INDEX } from '../functions/constants'

export async function SSFetch<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN)
  const clinicsData = cookieStore.get(CLINICS_DATA)
  const currentClinicDataIndex = cookieStore.get(CURRENT_CLINIC_DATA_INDEX)?.value ?? 0

  const token = accessToken?.value

  let clinicsDataParsed

  const currentClinic: any | undefined =
    typeof clinicsData !== 'undefined'
      ? JSON.parse(clinicsData.value)
      : undefined;

  if (typeof currentClinic !== 'undefined') {
    clinicsDataParsed = currentClinic[currentClinicDataIndex]?.id
  }


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
