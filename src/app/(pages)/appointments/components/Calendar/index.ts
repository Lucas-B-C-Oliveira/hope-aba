import { Header } from './Header'
import { CalendarContent } from './CalendarContent'
import { CalendarWeekdayBar } from './CalendarWeekdayBar'
import { CalendarHourGrid } from './CalendarHourGrid/CalendarHourGrid'
import { WeekdayBarWeekday } from './WeekdayBarWeekday'

export const Calendar = {
  Header,
  Content: CalendarContent,
  WeekdayBar: CalendarWeekdayBar,
  HourGrid: CalendarHourGrid,
  Weekday: WeekdayBarWeekday,
}
