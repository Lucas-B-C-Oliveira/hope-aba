import { cookies } from 'next/headers'
import { LayoutHeader } from './LayoutHeader'
import { tokenDecode } from '@/utils/functions/helpers'
import { ACCESS_TOKEN, CLINICS_DATA, CURRENT_CLINIC_DATA_INDEX } from '@/utils/functions/constants'

export default async function LayoutHeaderPage() {
  const cookieStore = cookies()
  const clinicsDataCookies = cookieStore.get(CLINICS_DATA)

  const clinicsData = clinicsDataCookies?.value
    ? JSON.parse(clinicsDataCookies?.value)
    : []
  const currentClinicDataIndex = cookieStore.get(CURRENT_CLINIC_DATA_INDEX)
    ?.value
    ? Number(cookieStore.get(CURRENT_CLINIC_DATA_INDEX)?.value)
    : 0
  const accessToken = cookieStore.get(ACCESS_TOKEN)

  const userData = tokenDecode(accessToken?.value ?? '')
  console.log('_____________userData', userData)


  return (
    <LayoutHeader
      userData={userData}
      clinicsData={clinicsData}
      currentClinicDataIndex={currentClinicDataIndex}
    />
  )
}
