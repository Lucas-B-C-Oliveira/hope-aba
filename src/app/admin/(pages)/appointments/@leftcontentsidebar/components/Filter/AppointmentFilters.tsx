import { useAppointmentFilterStore } from '@/store/appointmentFilterStore'
import { Filter } from '.'
import { ActionButton } from '@/components/ActionButton'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { useAutocompleteFilter } from './useAutocompleteFilter'
import { memo } from 'react'
import { TokenData } from '@/types'

interface Props {
  tokenData: TokenData
}

export const AppointmentFilters = memo(function AppointmentFilters({ tokenData }: Props) {

  const role = tokenData?.role
  const disabled = role === 'professional'


  const { setButtonStatusAppointment } = useAppointmentFilterStore()
  function handleClick() {
    setButtonStatusAppointment('clicked')
  }

  const useProfessionalsLogic = () =>
    useAutocompleteFilter('professionalsAppointment', 'professionals', disabled, tokenData)
  const usePatientsLogic = () =>
    useAutocompleteFilter('patientsAppointment', 'patients')

  return (
    <div className="flex flex-col items-start gap-3 p-0 h-fit">

      {role === 'admin' && (
        <div className="flex flex-col gap-6">
          <Filter.Autocomplete
            useAutocompleteLogic={useProfessionalsLogic}
            labelText="Profissionais"
          />
          <Filter.Autocomplete
            useAutocompleteLogic={usePatientsLogic}
            labelText="Pacientes"
          />
        </div>
      )}

      {role === 'professional' && (
        <div className="flex flex-col gap-6">
          <Filter.Autocomplete
            useAutocompleteLogic={useProfessionalsLogic}
            labelText="Profissional"
            disabled={disabled}
          />
        </div>
      )}

      <Filter.Checkboxes
        labelText="Terapias"
        filterKey="therapiesAppointment"
        endPoint="therapies"
      />
      <Filter.Checkboxes
        labelText="Salas"
        filterKey="roomsAppointment"
        endPoint="rooms"
      />

      <ActionButton onClick={handleClick}>
        <AdjustmentsHorizontalIcon
          className="pointer-events-none h-5 w-5 text-white"
          aria-hidden="true"
        />
        Filtrar
      </ActionButton>

      {role === 'admin' && (
        <Filter.Labels filterType="Appointment" />
      )}

    </div>
  )
})
