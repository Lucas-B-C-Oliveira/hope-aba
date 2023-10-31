import { cookies } from 'next/headers'

export function useServerAuth() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const clinicsData = cookieStore.get('clinicsData')

  const authenticatedUser =
    typeof accessToken?.value === 'string' &&
    typeof clinicsData?.value === 'string'
  return {
    authenticatedUser,
    accessToken,
    clinicsData,
  }
}
