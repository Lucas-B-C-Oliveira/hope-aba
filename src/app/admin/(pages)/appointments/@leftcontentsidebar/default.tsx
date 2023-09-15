'use client'
import { useMainLayoutStore } from '@/store/mainLayoutStore'
import { LeftContentSidebar } from './components/LeftContentSidebar'
import { ContentSidebarContainer } from '../components/ContentSidebarContainer'

export default function Default() {
  const { leftContentSidebarIsOpen } =
    useMainLayoutStore()

  return (

    <ContentSidebarContainer
      isOpen={leftContentSidebarIsOpen}
      content={<LeftContentSidebar />}
    />
  )
}
