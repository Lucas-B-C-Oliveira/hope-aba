'use client'
import { Form } from '@/components/Form'
import { useMainLayoutStore } from '@/store/mainLayoutStore'
import { ContentSidebarContainer } from '../../components/ContentSidebarContainer'
import { Filter } from './Filter'
import { ActionButton } from '@/components/ActionButton'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { useAppointmentFilterStore } from '@/store/appointmentFilterStore'

export function LeftContentSidebar() {
  const { openAndCloseLeftContentSidebar, leftContentSidebarIsOpen } =
    useMainLayoutStore()
  const { setButtonStatus } = useAppointmentFilterStore()
  function handleClick() {
    setButtonStatus('clicked')
  }

  return (
    <ContentSidebarContainer
      isOpen={leftContentSidebarIsOpen}
      content={
        <div className="flex flex-col gap-5">
          <h2 className="text-left text-xl font-bold tracking-tight text-gray-600">
            Filtros
          </h2>
          <div className="flex flex-col items-start gap-4">
            <Filter.Autocomplete
              labelText="Profissionais"
              filterKey="professionals"
              endPoint="professionals"
            />
            <Filter.Autocomplete
              labelText="Pacientes"
              filterKey="patients"
              endPoint="patients"
            />
            <Filter.Checkboxes
              labelText="Terapias"
              filterKey="therapies"
              endPoint="therapies"
            />
            <Filter.Checkboxes
              labelText="Salas"
              filterKey="rooms"
              endPoint="rooms"
            />

            <ActionButton onClick={handleClick}>
              <AdjustmentsHorizontalIcon
                className="pointer-events-none h-5 w-5 text-white"
                aria-hidden="true"
              />
              Filtrar
            </ActionButton>

            <Filter.Labels />
          </div>
        </div>
      }
    />
  )
}
