import { memo } from 'react'
import { Calendar, momentLocalizer, CalendarProps } from 'react-big-calendar'
import { dateAdapter } from '@/utils/dateAdapter'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './adapterCalendarStyles.css'

const localizer = momentLocalizer(dateAdapter)

export function AdapterCalendar(props: Omit<CalendarProps, 'localizer'>) {
  return <Calendar {...props} localizer={localizer} />
}
