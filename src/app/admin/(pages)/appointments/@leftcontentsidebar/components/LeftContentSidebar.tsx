'use client'
import { memo } from 'react'
import { AppointmentFilters } from './Filter/AppointmentFilters'
import { AvailableFilters } from './Filter/AvailableFilters'
import { ContentSidebarContainer } from '../../components/ContentSidebarContainer'
import { useMainLayoutStore } from '@/store/mainLayoutStore'
import { Role } from '@/types'

interface Props {
  role: Role
}

export const LeftContentSidebar = memo(function LeftContentSidebar({ role }: Props) {

  const { leftContentSidebarIsOpen } = useMainLayoutStore()

  return (
    <ContentSidebarContainer
      isOpen={leftContentSidebarIsOpen}
      content={
        <div className="px-[0.1rem]">
          <div className="overflow-y-auto max-h-[920px] py-2">
            <div className="flex flex-col gap-3  px-[1rem] ">
              <h2 className="text-left text-xl font-bold tracking-tight text-gray-600">
                Filtros
              </h2>
              <div className=" flex flex-col items-center  gap-4 w-60 rounded-2xl">
                <div className="relative flex flex-col gap-3 px-3 pt-7 pb-3 w-fit rounded-md shadow-sm ring-1 ring-inset ring-gray-300">
                  <h4 className="absolute -top-[0.75rem] left-2 inline-block bg-white px-2 text-base font-bold text-gray-600">
                    Disponibilidade
                  </h4>
                  <AvailableFilters role={role} />
                </div>

                <div className="relative flex flex-col gap-3 px-3 pt-7 pb-3 w-fit rounded-md shadow-sm ring-1 ring-inset ring-gray-300">
                  <h4 className="absolute -top-[0.75rem] left-2 inline-block bg-white px-2 text-base font-bold text-gray-600">
                    Agendamento
                  </h4>
                  <AppointmentFilters role={role} />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
})
