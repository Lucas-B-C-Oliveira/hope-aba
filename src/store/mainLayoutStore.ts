import { create } from 'zustand'

interface MainLayoutStore {
  sidebarIsOpen: boolean
  openAndCloseSidebar: (open: boolean) => void
}

export const useMainLayoutStore = create<MainLayoutStore>()((set) => ({
  sidebarIsOpen: true,
  openAndCloseSidebar: (open) => set(() => ({ sidebarIsOpen: open })),
}))
