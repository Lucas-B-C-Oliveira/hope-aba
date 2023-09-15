'use client'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { ReactElement, memo } from 'react'
import { useBigCalendarHeader } from './useBigCalendarHeader'
import { getCookie } from 'cookies-next'
import { tokenDecode } from '@/utils/functions/helpers'
import { Role } from '@/types'

interface CalendarHeaderProps {
  onNavigatePrev: () => void
  onNavigateNext: () => void
  onNavigateToday: () => void
  calendarDate?: any
  openLeftContentSidebarButton?: ReactElement
  openRightContentSidebarButton?: ReactElement
}

export const BigCalendarHeader = memo(function BigCalendarHeader({
  onNavigateNext,
  onNavigatePrev,
  onNavigateToday,
  calendarDate,
  openLeftContentSidebarButton,
  openRightContentSidebarButton,
}: CalendarHeaderProps) {
  const { dateLabel } = useBigCalendarHeader({ calendarDate })

  const accessToken =
    typeof getCookie('accessToken') === 'string' ? getCookie('accessToken') : ''
  const tokenData = tokenDecode(accessToken as string)
  const role: Role = tokenData?.role ?? 'user'

  return (
    <header
      style={{ backgroundColor: '#f9fafc' }}
      className="flex flex-none bg-white items-center justify-between border-b border-gray-200 px-6 py-4"
    >
      <div className="hidden md:flex md:items-center">
        {openLeftContentSidebarButton && openLeftContentSidebarButton}
        <div className="ml-6 h-6 w-px bg-gray-300" />
      </div>

      <div className="hidden md:ml-4 md:flex md:items-center">
        <div className="flex items-center gap-6">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            {dateLabel}
          </h1>
          <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <div
              className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-gray-300"
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={onNavigatePrev}
              className="flex items-center justify-center rounded-l-md py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Previous week</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={onNavigateToday}
              type="button"
              className="hidden px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
            >
              Hoje
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              onClick={onNavigateNext}
              type="button"
              className="flex items-center justify-center rounded-r-md py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Next week</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {role === 'admin' && (
          <>
            <div className="ml-6 mr-6 h-6 w-px bg-gray-300" />
            {openRightContentSidebarButton && openRightContentSidebarButton}
          </>
        )}
      </div>
    </header>
  )
})
