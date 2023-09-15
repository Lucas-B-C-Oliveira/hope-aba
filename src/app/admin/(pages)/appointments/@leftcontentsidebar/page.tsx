'use client'
import { useMainLayoutStore } from '@/store/mainLayoutStore'
import { ContentSidebarContainer } from '../components/ContentSidebarContainer'
import { LeftContentSidebar } from './components/LeftContentSidebar'

export default function LeftContentSidebarPage() {
  const { leftContentSidebarIsOpen } = useMainLayoutStore()

  return (
    <ContentSidebarContainer
      isOpen={leftContentSidebarIsOpen}
      content={<LeftContentSidebar />}
    />
  )
}
