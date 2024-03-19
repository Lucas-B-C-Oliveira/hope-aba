import { Filter, FilterKey } from '@/types'
import { create } from 'zustand'

interface AppointmentFilterStore {
  professionalsAppointment?: Filter
  patientsAppointment?: Filter
  therapiesAppointment?: Filter[]
  roomsAppointment?: Filter[]

  professionalAvailable?: Filter

  addFilter: (filterKey: FilterKey, newFilterValue: Filter) => void
  removeFilter: (filterKey: FilterKey, filterToRemoveId?: string) => void

  filterButtonStatusAppointment: 'clicked' | 'idle'
  setButtonStatusAppointment: (newStatus: 'clicked' | 'idle') => void

  filterButtonStatusAvailable: 'clicked' | 'idle'
  setButtonStatusAvailable: (newStatus: 'clicked' | 'idle') => void //! TODO: Remover o estado do botão de Available
}

export const useAppointmentFilterStore = create<AppointmentFilterStore>()(
  (set, get) => ({
    professionalsAppointment: undefined,
    patientsAppointment: undefined,
    roomsAppointment: undefined,
    therapiesAppointment: undefined,

    professionalAvailable: undefined,

    addFilter: (filterKey, newFilterValue) => {
      if (filterKey === 'roomsAppointment') {
        const currentRooms = get()?.roomsAppointment ?? []
        const newRoomAlreadyExist = currentRooms.some(
          (room) => room?.id === newFilterValue?.id,
        )
        const newRooms = newRoomAlreadyExist
          ? currentRooms
          : [...currentRooms, newFilterValue]
        set(() => ({ roomsAppointment: newRooms }))
      } else if (filterKey === 'therapiesAppointment') {
        const currentTherapies = get()?.therapiesAppointment ?? []
        const newTherapyAlreadyExist = currentTherapies.some(
          (therapy) => therapy?.id === newFilterValue?.id,
        )
        const newTherapies = newTherapyAlreadyExist
          ? currentTherapies
          : [...currentTherapies, newFilterValue]
        set(() => ({ therapiesAppointment: newTherapies }))
      } else if (filterKey === 'patientsAppointment') {
        set(() => ({ patientsAppointment: newFilterValue }))
      } else if (filterKey === 'professionalsAppointment') {
        set(() => ({ professionalsAppointment: newFilterValue }))
      } else if (filterKey === 'professionalAvailable') {
        set(() => ({ professionalAvailable: newFilterValue }))
      }
    },
    removeFilter: (filterKey, filterToRemoveId) => {
      if (filterKey === 'roomsAppointment') {
        const currentRooms = get()?.roomsAppointment ?? []
        const newRooms = currentRooms.filter(
          (room) => room?.id !== filterToRemoveId,
        )
        set(() => ({ roomsAppointment: [...newRooms] }))
      } else if (filterKey === 'therapiesAppointment') {
        const currentTherapies = get()?.therapiesAppointment ?? []
        const newTherapies = currentTherapies.filter(
          (therapy) => therapy?.id !== filterToRemoveId,
        )
        set(() => ({ therapiesAppointment: [...newTherapies] }))
      } else if (filterKey === 'patientsAppointment') {
        set(() => ({ patientsAppointment: undefined }))
      } else if (filterKey === 'professionalsAppointment') {
        set(() => ({ professionalsAppointment: undefined }))
      } else if (filterKey === 'professionalAvailable') {
        set(() => ({ professionalAvailable: undefined }))
      }
    },

    filterButtonStatusAppointment: 'idle',
    setButtonStatusAppointment: (newStatus) => {
      set(() => ({ filterButtonStatusAppointment: newStatus }))
    },

    filterButtonStatusAvailable: 'idle',
    setButtonStatusAvailable: (newStatus) => {
      set(() => ({ filterButtonStatusAvailable: newStatus }))
    },
  }),
)
