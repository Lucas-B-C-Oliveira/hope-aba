'use client'

import { AdapterCalendar } from './Content/AdapterCalendar'
import { BigCalendarHeader } from './Header/BigCalendarHeader'
import { BigCalendarWeekDay } from './BigCalendarWeekDay'
import { BigCalendarAppointmentCard } from './BigCalendarAppointmentCard'
import { BigCalendarFilterView } from './BigCalendarFilterView'

export const Calendar = {
  Header: BigCalendarHeader,
  Weekday: BigCalendarWeekDay,
  Content: AdapterCalendar,
  AppointmentCard: BigCalendarAppointmentCard,
  FilterView: BigCalendarFilterView,
}
