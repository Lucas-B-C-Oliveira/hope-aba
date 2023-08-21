import { SSFetch } from '@/utils/api/serverFetch'
import { CalendarContainer } from './components/CalendarContainer'
import { v4 as uuidv4 } from 'uuid'
import { dateAdapter } from '@/utils/dateAdapter'

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

function getDayNumber(day: string) {
  const daysOfWeek = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]
  return daysOfWeek.indexOf(day.toLowerCase())
}

function convertTimeFormat(day: any, time: any) {
  const [hours, minutes] = time.split(':')
  const dayNumber = getDayNumber(day)
  const date = dateAdapter().startOf('isoWeek').day(dayNumber)
  return date.hours(hours).minutes(minutes).format('YYYY-MM-DDTHH:mm:ss')
}

function transformArray(inputArray) {
  return inputArray.map((dayObj) => {
    const day = Object.keys(dayObj)[0]
    const timeArray = dayObj[day].map((timeObj) => ({
      start: convertTimeFormat(day, timeObj.start),
      end: convertTimeFormat(day, timeObj.end),
      type: 'filter',
    }))

    return timeArray
  })
}

async function getProfessionalScheduleAvailable(searchParams: any) {
  try {
    if (!searchParams?.professionalId) {
      throw new Error('Failed because professionalId is not provided')
    }

    const { professionalId } = searchParams
    const response = await SSFetch<any>(`professionals/${professionalId}`)
    const {
      data: { scheduleAvailability },
    } = response

    const newArray = transformArray(scheduleAvailability)

    return newArray.flat()
  } catch (error) {
    return []

    // throw new Error(`Failed with error: ${error?.message}`)
  }
}

export default async function Appointments({ searchParams }: Props) {
  const professionalScheduleAvailable = await getProfessionalScheduleAvailable(
    searchParams,
  )

  //! TODO: Na verdade, vou separar cada parâmetro do searchParams e enviar ao CalendarContainer e lá, vou usar server Actions para buscar e arrumar os dados
  //! Pois precisamos buscar os dados e arrumá-los, toda vez que o usuário mudar a data

  console.log('professionalScheduleAvailable', professionalScheduleAvailable)

  return (
    <div className="flex flex-col h-full w-full ">
      <CalendarContainer />
    </div>
  )
}
