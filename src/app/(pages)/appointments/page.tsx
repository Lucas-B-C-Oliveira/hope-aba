import { SSFetch } from '@/utils/api/serverFetch'
import { CalendarContainer } from './components/CalendarContainer'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export type AvailableTimeCard = {
  column: string
  gridRow: string
  id: string
  name: string
  email: string
  profession: string
  start: string
  end: string
}

function getGridColumnByWeekday(weekday: string) {
  if (weekday === 'monday') return 'col-start-1'
  else if (weekday === 'tuesday') return 'col-start-2'
  else if (weekday === 'wednesday') return 'col-start-3'
  else if (weekday === 'thursday') return 'col-start-4'
  else if (weekday === 'friday') return 'col-start-5'
}

function getHour(time: string) {
  if (time === '07') return 2
  else if (time === '08') return 44
  else if (time === '09') return 86
  else if (time === '10') return 128
  else if (time === '11') return 170
  else if (time === '12') return 212
  else if (time === '13') return 254
  else if (time === '14') return 296
  else if (time === '15') return 338
  else if (time === '16') return 380
  else if (time === '17') return 422
  else return 464
}

function getMin(time: string) {
  if (time === '50') return 35
  else if (time === '40') return 28
  else if (time === '30') return 21
  else if (time === '20') return 14
  else if (time === '7') return 10
  return 0
}

function getAvailableTimeCard(data: any): AvailableTimeCard[] {
  const HOUR_VALUE_IN_TABLE_HOUR = 42

  const { scheduleAvailability } = data

  // console.log('data', data)

  // console.log('scheduleAvailability', scheduleAvailability)
  const allCards: AvailableTimeCard[][] = scheduleAvailability.map(
    (obj: any) => {
      const [[key, values]] = Object.entries(obj)

      // console.log('obj', obj)
      // console.log('values', values)
      // console.log('key', key)

      const cards: AvailableTimeCard[] = values?.map(
        ({ start, end }: { start: string; end: string }) => {
          const splitStartTime = start.split(':')
          const startTimePartOfHour = splitStartTime[0]
          const startTimePartOfMin = splitStartTime[1]

          // console.log('c', c)
          const startTimePartOfHourInTableHourPrecision =
            getHour(startTimePartOfHour)
          // console.log('c[0]', c[0])
          // console.log('d', d)

          const startTimePartOfMinInTableHourPrecision =
            getMin(startTimePartOfMin)
          const timeStartInTableHourPrecision =
            startTimePartOfHourInTableHourPrecision +
            startTimePartOfMinInTableHourPrecision

          // console.log('start', start)
          // console.log('end', end)

          const startTimeInDate = new Date(`1970-01-01T${start}`)
          const endTimeInDate = new Date(`1970-01-01T${end}`)

          const differenceInMilliseconds = endTimeInDate - startTimeInDate

          const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60)

          const numberOfHours = Math.floor(differenceInHours)
          const minutes = (differenceInHours - numberOfHours) * 60

          const minInTableHourPrecision = getMin(String(minutes))

          const startPositionInTableHour = timeStartInTableHourPrecision

          const lengthOfCardInTableHour =
            numberOfHours * HOUR_VALUE_IN_TABLE_HOUR +
            minInTableHourPrecision +
            timeStartInTableHourPrecision

          return {
            gridRow: `${startPositionInTableHour} / span ${lengthOfCardInTableHour}`,
            column: getGridColumnByWeekday(key),
            id: uuidv4(),
            name: data.name,
            email: data.email,
            profession: data.profession,
            start,
            end,
          }
        },
      )

      return cards
    },
  )

  // console.log('allCards', allCards)

  const availableTimeCards: AvailableTimeCard[] = allCards.flat()

  return availableTimeCards
}

export default async function Appointments({ searchParams }: Props) {
  let availableTimeCards: AvailableTimeCard[] | undefined

  if (searchParams?.professionalId) {
    const { professionalId } = searchParams

    // console.log('professionalId', professionalId)
    const response = await SSFetch<any>(`professionals/${professionalId}`)
    availableTimeCards = getAvailableTimeCard(response?.data)
  }

  return (
    <div className="flex flex-col h-full w-full ">
      <CalendarContainer availableTimeCards={availableTimeCards} />
    </div>
  )
}
