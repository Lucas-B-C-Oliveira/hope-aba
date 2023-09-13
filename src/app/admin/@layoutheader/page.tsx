import { useServerAuth } from '@/hooks/useServerAuth'
import { LayoutHeader } from './LayoutHeader'
import { cookies } from 'next/headers'
import { tokenDecode } from '@/utils/functions/helpers'

export default async function LayoutHeaderPage() {
  const cookieStore = cookies()
  const clinicsDataCookies = cookieStore.get('clinicsData')
  const accessToken = cookieStore.get('accessToken')

  const userData = tokenDecode(accessToken?.value ?? '')
  console.log('_____________userData', userData)

  const clinicsData = clinicsDataCookies?.value
    ? JSON.parse(clinicsDataCookies?.value)
    : []
  const currentClinicDataIndex = cookieStore.get('currentClinicDataIndex')
    ?.value
    ? Number(cookieStore.get('currentClinicDataIndex')?.value)
    : 0

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
