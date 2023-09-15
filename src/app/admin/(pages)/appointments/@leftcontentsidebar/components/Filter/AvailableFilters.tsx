import { useAppointmentFilterStore } from '@/store/appointmentFilterStore'
import { Filter } from '.'
import { ActionButton } from '@/components/ActionButton'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { useAutocompleteFilter } from './useAutocompleteFilter'

export function AvailableFilters() {
  // const { setButtonStatusAvailable } = useAppointmentFilterStore()
  // function handleClick() {
  //   setButtonStatusAvailable('clicked')
  // }

  const useAvailableProfessionalLogic = () =>
    useAutocompleteFilter('professionalAvailable', 'professionals')

  return (
    <div className="flex flex-col items-start gap-3">
      <Filter.Autocomplete
        useAutocompleteLogic={useAvailableProfessionalLogic}
        labelText="Profissionais"
      />
      {/* <ActionButton onClick={handleClick}>
        <AdjustmentsHorizontalIcon
          className="pointer-events-none h-5 w-5 text-white"
          aria-hidden="true"
        />
        Filtrar
      </ActionButton> */}

      <Filter.Labels filterType="Available" />
    </div>
  )
}
