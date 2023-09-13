import { Filter, FilterKey } from '@/types'
import { create } from 'zustand'

interface AppointmentFilterStore {
  professionals?: Filter
  patients?: Filter
  therapies?: Filter[]
  rooms?: Filter[]

  addFilter: (filterKey: FilterKey, newFilterValue: Filter) => void
  removeFilter: (filterKey: FilterKey, filterToRemoveId?: string) => void

  filterButtonStatus: 'clicked' | 'idle'
  setButtonStatus: (newStatus: 'clicked' | 'idle') => void

  getFilters: (filterKey: FilterKey) => Filter | Filter[] | undefined
}

export const useAppointmentFilterStore = create<AppointmentFilterStore>()(
  (set, get) => ({
    professionals: undefined,
    patients: undefined,
    rooms: undefined,
    therapies: undefined,
    addFilter: (filterKey, newFilterValue) => {
      if (filterKey === 'rooms') {
        const currentRooms = get()?.rooms ?? []
        const newRoomAlreadyExist = currentRooms.some(
          (room) => room?.id === newFilterValue?.id,
        )
        const newRooms = newRoomAlreadyExist
          ? currentRooms
          : [...currentRooms, newFilterValue]
        set(() => ({ rooms: newRooms }))
      } else if (filterKey === 'therapies') {
        const currentTherapies = get()?.therapies ?? []
        const newTherapyAlreadyExist = currentTherapies.some(
          (therapy) => therapy?.id === newFilterValue?.id,
        )
        const newTherapies = newTherapyAlreadyExist
          ? currentTherapies
          : [...currentTherapies, newFilterValue]
        set(() => ({ therapies: newTherapies }))
      } else if (filterKey === 'patients') {
        set(() => ({ patients: newFilterValue }))
      } else if (filterKey === 'professionals') {
        set(() => ({ professionals: newFilterValue }))
      }
    },
    removeFilter: (filterKey, filterToRemoveId) => {
      console.log('filterKey', filterKey)

      if (filterKey === 'rooms') {
        const currentRooms = get()?.rooms ?? []
        const newRooms = currentRooms.filter(
          (room) => room?.id !== filterToRemoveId,
        )
        set(() => ({ rooms: [...newRooms] }))
      } else if (filterKey === 'therapies') {
        const currentTherapies = get()?.therapies ?? []
        const newTherapies = currentTherapies.filter(
          (therapy) => therapy?.id !== filterToRemoveId,
        )
        set(() => ({ therapies: [...newTherapies] }))
      } else if (filterKey === 'patients') {
        set(() => ({ patients: undefined }))
      } else if (filterKey === 'professionals') {
        console.log('Entrei no Professionalls')
        // set((state) => ({ ...state, professionals: undefined }))
        const currentState = get()
        set({ ...currentState, professionals: undefined }, true)
      }
    },
    getFilters: (filterKey) => {
      if (filterKey === 'rooms') {
        return get().rooms
      } else if (filterKey === 'therapies') {
        return get().therapies
      } else if (filterKey === 'patients') {
        return get().patients
      } else if (filterKey === 'professionals') {
        return get().professionals
      }
    },

    filterButtonStatus: 'idle',
    setButtonStatus: (newStatus) => {
      set(() => ({ filterButtonStatus: newStatus }))
    },
  }),
)
