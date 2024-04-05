import { useAppointmentFilterStore } from '@/store/appointmentFilterStore'
import { Filter } from '.'
import { ActionButton } from '@/components/ActionButton'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { useAutocompleteFilter } from './useAutocompleteFilter'
import { memo } from 'react'
import { TokenData } from '@/types'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCheckboxesTherapiesFilters } from './useCheckboxesTherapiesFilters'
import { useCheckboxesRoomsFilters } from './useCheckboxesRoomsFilters'

const therapiesSchema = z.object({
  therapies: z.array(z.string()),
})

export type TherapiesSchema = z.infer<typeof therapiesSchema>

interface Props {
  tokenData: TokenData
}

export const AppointmentFilters = memo(function AppointmentFilters({
  tokenData,
}: Props) {
  const role = tokenData?.role
  const disabled = role === 'professional'

  const createTherapiesSchema = useForm<TherapiesSchema>({
    resolver: zodResolver(therapiesSchema),
  })

  const {
    formState: { isSubmitting },
  } = createTherapiesSchema

  const { setButtonStatusAppointment } = useAppointmentFilterStore()
  function handleClick() {
    setButtonStatusAppointment('clicked')
  }

  const useProfessionalsLogic = () =>
    useAutocompleteFilter(
      'professionalsAppointment',
      'professionals',
      disabled,
      tokenData,
    )

  const usePatientsLogic = () =>
    useAutocompleteFilter('patientsAppointment', 'patients')

  const useTherapiesLogic = () =>
    useCheckboxesTherapiesFilters(
      'therapies',
      tokenData,
      'therapies',
      'therapiesAppointment',
    )
  const useRoomsLogic = () =>
    useCheckboxesRoomsFilters(
      'rooms',
      tokenData,
      'therapies',
      'roomsAppointment',
    )

  return (
    <div className="flex flex-col items-start gap-3 p-0 h-fit">
      {(role === 'admin' || role === 'attendant') && (
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

      <FormProvider {...createTherapiesSchema}>
        <Filter.Checkboxes
          labelText="Terapias"
          useCheckboxFilterLogic={useTherapiesLogic}
        />
        <Filter.Checkboxes
          labelText="Salas"
          useCheckboxFilterLogic={useRoomsLogic}
        />
      </FormProvider>

      <ActionButton onClick={handleClick}>
        <AdjustmentsHorizontalIcon
          className="pointer-events-none h-5 w-5 text-white"
          aria-hidden="true"
        />
        Filtrar
      </ActionButton>

      {(role === 'admin' || role === 'attendant') && (
        <Filter.Labels filterType="Appointment" />
      )}
    </div>
  )
})
