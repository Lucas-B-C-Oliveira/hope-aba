import { useServerAuth } from '@/hooks/useServerAuth'
import { LayoutLeftSidebar } from './LayoutLeftSidebar'

export default async function LayoutLeftSidebarPage() {
  const { authenticatedUser } = useServerAuth()
  return (
    <>
      {authenticatedUser && <LayoutLeftSidebar />}
    </>
  )
}
