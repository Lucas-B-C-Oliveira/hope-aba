'use client'
import { memo, useEffect, useState } from 'react'
import { AppointmentFilters } from './Filter/AppointmentFilters'
import { AvailableFilters } from './Filter/AvailableFilters'
import { ContentSidebarContainer } from '../../components/ContentSidebarContainer'
import { useMainLayoutStore } from '@/store/mainLayoutStore'
import { TokenData } from '@/types'

interface Props {
  tokenData: TokenData
}

export const LeftContentSidebar = memo(function LeftContentSidebar({
  tokenData,
}: Props) {
  const { leftContentSidebarIsOpen } = useMainLayoutStore()
  const [contentHeight, setContentHeight] = useState('0rem')
  const [startComponent, setStartComponent] = useState(false)

  useEffect(() => {
    if (window && startComponent) {

      const main = document.getElementById("main")
      const mainRef = main?.getBoundingClientRect()

      if (mainRef?.height) {
        const newContentHeight = `${mainRef?.height - 8}px`
        setContentHeight(newContentHeight)
      }
    }

  }, [startComponent]);

  useEffect(() => {
    setStartComponent(true)
  }, [])


  return (
    <ContentSidebarContainer
      isOpen={leftContentSidebarIsOpen}
      content={
        <div
          style={{
            maxHeight: contentHeight
          }}

          className={`h-full overflow-y-auto py-2 `}>
          <div className="flex flex-col gap-3 p-4">
            <h2 className="text-left text-xl font-bold tracking-tight text-gray-600">
              Filtros
            </h2>
            <div className="flex flex-col items-center gap-4 rounded-2xl">
              <div className="relative flex flex-col gap-3 p-4 rounded-md shadow-sm ring-1 ring-inset ring-gray-300">
                <h4 className="absolute -top-4 left-2 inline-block bg-white px-2 text-base font-bold text-gray-600">
                  Disponibilidade
                </h4>
                <AvailableFilters tokenData={tokenData} />
              </div>

              <div className="relative flex flex-col gap-3 p-4 rounded-md shadow-sm ring-1 ring-inset ring-gray-300">
                <h4 className="absolute -top-4 left-2 inline-block bg-white px-2 text-base font-bold text-gray-600">
                  Agendamento
                </h4>
                <AppointmentFilters tokenData={tokenData} />
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
})
