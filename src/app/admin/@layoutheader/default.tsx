import { cookies } from 'next/headers'
import { LayoutHeader } from './LayoutHeader'
import { useServerAuth } from '@/hooks/useServerAuth'
import { tokenDecode } from '@/utils/functions/helpers'

export default async function Default() {
  const cookieStore = cookies()
  const clinicsDataCookies = cookieStore.get('clinicsData')

  const clinicsData = clinicsDataCookies?.value
    ? JSON.parse(clinicsDataCookies?.value)
    : []
  const currentClinicDataIndex = cookieStore.get('currentClinicDataIndex')
    ?.value
    ? Number(cookieStore.get('currentClinicDataIndex')?.value)
    : 0
  const accessToken = cookieStore.get('accessToken')

  const userData = tokenDecode(accessToken?.value ?? '')
  console.log('_____________userData', userData)

  const { authenticatedUser } = useServerAuth()

  return (
    <>
      {authenticatedUser && (
        <LayoutHeader
          userData={userData}
          clinicsData={clinicsData}
          currentClinicDataIndex={currentClinicDataIndex}
        />
      )}
    </>
  )
}
