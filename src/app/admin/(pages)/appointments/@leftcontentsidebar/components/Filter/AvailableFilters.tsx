import { memo } from 'react'
import { Filter } from '.'

import { useAutocompleteFilter } from './useAutocompleteFilter'
import { Role } from '@/types'

interface Props {
  role: Role
}

export const AvailableFilters = memo(function AvailableFilters({ role }: Props) {

  const useAvailableProfessionalLogic = () =>
    useAutocompleteFilter('professionalAvailable', 'professionals', role === 'professional')

  return (
    <>
      {role === 'admin' && (
        <div className="flex flex-col items-start gap-3">
          <Filter.Autocomplete
            useAutocompleteLogic={useAvailableProfessionalLogic}
            labelText="Profissionais"
          />
          <Filter.Labels filterType="Available" />
        </div>
      )}
      {role === 'professional' && (
        <div className="flex flex-col items-start gap-3">
          <Filter.Autocomplete
            disabled={true}
            useAutocompleteLogic={useAvailableProfessionalLogic}
            labelText="Profissional"
          />
        </div>
      )}
      {role === 'user' && (<></>)}
    </>
  )
})
