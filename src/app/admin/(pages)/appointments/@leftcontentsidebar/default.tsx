
import { cookies } from 'next/headers'
import { LeftContentSidebar } from './components/LeftContentSidebar'
import { ACCESS_TOKEN } from '@/utils/functions/constants'
import { tokenDecode } from '@/utils/functions/helpers'

export default async function Default() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value ?? ''
  const tokenData = tokenDecode(accessToken)
  console.log('tokenData', tokenData)

  return <LeftContentSidebar tokenData={tokenData} />
}
