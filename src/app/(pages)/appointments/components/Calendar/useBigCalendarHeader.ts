import { dateAdapter } from '@/utils/dateAdapter'
import { capitalizedText } from '@/utils/functions'

interface Props {
  calendarDate: any
}

export const useBigCalendarHeader = ({ calendarDate }: Props) => {
  const date = dateAdapter(calendarDate, 'YYYY-MM-DD')

  const month = date.format('MMMM')
  const year = date.format('YYYY')
  const capitalizedMonth = capitalizedText(month)

  const dateLabel = `${capitalizedMonth} de ${year}`

  return {
    dateLabel,
  }
}
