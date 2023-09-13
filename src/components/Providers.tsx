'use client'

import { queryClient } from '@/utils/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import '@/utils/dayjs'

import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {children}
      </LocalizationProvider>
    </QueryClientProvider>
  )
}
