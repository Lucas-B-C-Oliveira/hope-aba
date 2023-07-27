import { FC } from 'react'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'

const eventsTest = [
  {
    start: moment('2023-07-28T10:00:00').toDate(),
    end: moment('2023-07-28T10:40:00').toDate(),
    title: 'MRI Registration',
  },
  {
    start: moment('2023-07-28T10:00:00').toDate(),
    end: moment('2023-07-28T10:40:00').toDate(),
    title: 'TESTE',
  },
]

export const ReactBigCalendarTest: FC = () => {
  return (
    <DnDCalendar
      defaultView="week"
      // events={events}
      events={eventsTest}
      localizer={localizer}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      resizable
      style={{ height: '100vh' }}
    />
  )
}
