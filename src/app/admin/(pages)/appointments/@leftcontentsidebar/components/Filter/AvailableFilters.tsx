import { memo } from 'react'
import { Filter } from '.'

import { useAutocompleteFilter } from './useAutocompleteFilter'
import { TokenData } from '@/types'

interface Props {
  tokenData: TokenData
}

export const AvailableFilters = memo(function AvailableFilters({ tokenData }: Props) {

  const role = tokenData?.role
  const disabled = role === 'professional'

  const useAvailableProfessionalLogic = () =>
    useAutocompleteFilter('professionalAvailable', 'professionals', disabled, tokenData)

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
            disabled={disabled}
            useAutocompleteLogic={useAvailableProfessionalLogic}
            labelText="Profissional"
          />
        </div>
      )}
      {role === 'user' && (<></>)}
    </>
  )
})
