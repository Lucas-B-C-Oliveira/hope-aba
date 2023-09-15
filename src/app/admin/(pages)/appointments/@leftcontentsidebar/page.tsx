
import { cookies } from 'next/headers'
import { LeftContentSidebar } from './components/LeftContentSidebar'
import { tokenDecode } from '@/utils/functions/helpers'
import { ACCESS_TOKEN } from '@/utils/functions/constants'

export default async function LeftContentSidebarPage() {

  const cookieStore = cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value ?? ''
  const tokenData = tokenDecode(accessToken)

  console.log('tokenData', tokenData)

  // const clinicsData = cookieStore.get('clinicsData')
  // const currentClinicDataIndex = cookieStore.get('currentClinicDataIndex')?.value ?? 0


  return <LeftContentSidebar role={tokenData?.role ?? 'user'} />
}
