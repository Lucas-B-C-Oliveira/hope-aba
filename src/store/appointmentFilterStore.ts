import { Filter, FilterKey } from '@/types'
import { create } from 'zustand'

interface AppointmentFilterStore {
  filters: {
    professionals?: Filter | undefined
    patients?: Filter
    therapies?: Filter[]
    rooms?: Filter[]
  }
  addFilter: (filterKey: FilterKey, newFilterValue: Filter) => void
  removeFilter: (filterKey: FilterKey, filterToRemoveId?: string) => void

  filterButtonStatus: 'clicked' | 'idle'
  setButtonStatus: (newStatus: 'clicked' | 'idle') => void
}

export const useAppointmentFilterStore = create<AppointmentFilterStore>()(
  (set, get) => ({
    filters: {
      professionals: undefined,
      patients: undefined,
      rooms: undefined,
      therapies: undefined,
    },
    addFilter: (filterKey, newFilterValue) => {
      const currentFiltersState = get().filters
      const currentFilters = currentFiltersState[filterKey]

      if (filterKey !== 'rooms' && filterKey !== 'therapies') {
        const newFilters = {
          ...currentFiltersState,
          [filterKey]: newFilterValue,
        }

        set(() => ({ filters: newFilters }))
      } else {
        if (
          typeof currentFilters !== 'undefined' &&
          Array.isArray(currentFilters)
        ) {
          const newFilterAlreadyIsInState = currentFilters?.some(
            (filter: Filter | undefined) => filter?.id === newFilterValue?.id,
          )
          if (!newFilterAlreadyIsInState) {
            const newFilters = [...currentFilters, newFilterValue]
            const newFilterState = {
              ...currentFiltersState,
              [filterKey]: newFilters,
            }
            set(() => ({ filters: newFilterState }))
          }
        } else {
          const newFilters = [newFilterValue]
          const newFilterState = {
            ...currentFiltersState,
            [filterKey]: newFilters,
          }
          set(() => ({ filters: newFilterState }))
        }
      }
    },
    removeFilter: (filterKey, filterToRemoveId) => {
      const currentFilterState = get().filters
      const currentFilters = currentFilterState[filterKey] as Filter[]
      if (filterKey !== 'rooms' && filterKey !== 'therapies') {
        // console.log('_____________ aaaaaa ___________ filterKey', filterKey)
        const newFilters = {
          ...currentFilterState,
          [filterKey]: {
            name: 'macarena',
            id: 'macarenaId',
          },
        }
        console.log('_____________ aaaaaa ___________ newFilters', newFilters)

        set(() => ({
          filters: {
            patients: undefined,
            professionals: undefined,
            rooms: undefined,
            therapies: undefined,
          },
        }))
        console.log(
          '_____________ aaaaaa ___________ currentFilterState',
          currentFilterState,
        )
      } else {
        if (
          typeof filterToRemoveId !== 'undefined' &&
          Array.isArray(currentFilters)
        ) {
          const newArray = currentFilters.filter(
            (filterValue) => filterValue?.id !== filterToRemoveId,
          )
          const newFilters = {
            ...currentFilterState,
            [filterKey]: newArray,
          }
          set(() => ({ filters: newFilters }))
        } else {
          const currentFilters = get().filters
          const newFilters = {
            ...currentFilters,
            [filterKey]: undefined,
          }
          set(() => ({ filters: newFilters }))
        }
      }
    },

    filterButtonStatus: 'idle',
    setButtonStatus: (newStatus) => {
      set(() => ({ filterButtonStatus: newStatus }))
    },
  }),
)
