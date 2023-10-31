import { useServerAuth } from '@/hooks/useServerAuth'
import { LayoutLeftSidebar } from './LayoutLeftSidebar'
import { tokenDecode } from '@/utils/functions/helpers'

export default function Default() {
  const { authenticatedUser, accessToken } = useServerAuth()
  const tokenData = tokenDecode(accessToken?.value ?? '')
  return <>{authenticatedUser && <LayoutLeftSidebar tokenData={tokenData} />}</>
}
