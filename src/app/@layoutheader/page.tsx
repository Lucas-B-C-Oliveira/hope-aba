import { useServerAuth } from '@/hooks/useServerAuth'
import { LayoutHeader } from './LayoutHeader'

export default async function LayoutHeaderPage() {
  const { authenticatedUser } = useServerAuth()
  return (
    <>
      {authenticatedUser && <LayoutHeader />}
    </>
  )
}
