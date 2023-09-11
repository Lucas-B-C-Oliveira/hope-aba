import { useMainLayoutStore } from '@/store/mainLayoutStore'

export function useToolbar() {
  return useMainLayoutStore()
}
