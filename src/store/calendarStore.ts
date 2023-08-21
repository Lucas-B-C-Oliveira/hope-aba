import { create } from 'zustand'

interface CalendarStore {
  professionalId: string | undefined
  setProfessionalId: (id: string) => void
}

export const useCalendarStore = create<CalendarStore>()((set) => ({
  professionalId: undefined,
  setProfessionalId: (id) => set(() => ({ professionalId: id })),
}))
