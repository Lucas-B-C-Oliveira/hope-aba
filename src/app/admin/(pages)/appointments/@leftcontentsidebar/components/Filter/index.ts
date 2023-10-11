import { AutocompleteFilter } from '../../../components/Filter/AutocompleteFilter'
import { CheckboxesFilter } from './CheckboxesFilter'
import { FilterSelected } from './FilterSelected'
import { FiltersSelected } from './FiltersSelected'

export const Filter = {
  Autocomplete: AutocompleteFilter,
  Checkboxes: CheckboxesFilter,
  Label: FilterSelected,
  Labels: FiltersSelected,
}
