'use server'

import { SSFetch } from '@/utils/api/serverFetch'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import { getGridColumnByWeekday, getHour, getMin } from '../functions'
import { dateAdapter } from '../dateAdapter'

export async function doFetch<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  try {
    const response = await SSFetch<T>(input, init)
    return response
  } catch (error: unknown | string | undefined) {
    throw new Error(error)
  }
}

const eventsTest = [
  {
    start: dateAdapter('2023-07-30T10:00:00').toDate(),
    end: dateAdapter('2023-07-30T10:40:00').toDate(),
    title: 'MRI Registration',
    data: {
      patient: 'Marcos',
      therapy: 'Fono',
    },
  },
  {
    start: dateAdapter('2023-07-30T10:00:00').toDate(),
    end: dateAdapter('2023-07-30T10:40:00').toDate(),
    title: 'TESTE',
    data: {
      patient: 'José',
      therapy: 'Fisio',
    },
  },
]

export async function getAppointmentsByRangeDate<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  try {
    const response = await SSFetch<T>(input, init)

    const cardsAppointment = response?.data.map((appointmentData: any) => {
      const { day, start, end } = appointmentData.schedule

      const { patient, therapy } = appointmentData

      const patientNameSplited = patient.name.split(' ')

      const patientNameLabel = `${patientNameSplited[0]} ${patientNameSplited[patientNameSplited.length - 1]
        }` //! TODO: Format this name to First upercase first lether

      return {
        start: dateAdapter(`${day}T${start}:00`).toDate(),
        end: dateAdapter(`${day}T${end}:00`).toDate(),
        data: {
          ...appointmentData,
          patientNameLabel,
          therapyNameLabel: therapy?.name,
        },
      }
    })

    return cardsAppointment
  } catch (error: unknown | string | undefined) {
    throw new Error(error)
  }
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

function convertTimeFormat(day: any, time: any, currentDate?: any) {
  const [hours, minutes] = time.split(':')
  const dayNumber = getDayNumber(day)
  const date =
    typeof currentDate !== 'undefined'
      ? dateAdapter(currentDate).startOf('isoWeek').day(dayNumber)
      : dateAdapter().startOf('isoWeek').day(dayNumber)
  return date.hours(hours).minutes(minutes).format('YYYY-MM-DDTHH:mm:ss')
}

function transformArray(inputArray: any[], currentDate?: any): any[] {
  return inputArray.map((dayObj) => {
    const day = Object.keys(dayObj)[0]
    const timeArray = dayObj[day].map((timeObj) => ({
      start: convertTimeFormat(day, timeObj.start, currentDate),
      end: convertTimeFormat(day, timeObj.end, currentDate),
      type: 'filter',
    }))

    return timeArray
  })
}

export async function getProfessionalScheduleAvailability(
  professionalId: string,
  currentDate?: any,
) {
  try {
    const response = await SSFetch<any>(`professionals/${professionalId}`)
    const {
      data: { scheduleAvailability },
    } = response

    const professionalScheduleAvailability = transformArray(
      scheduleAvailability,
      currentDate,
    )

    return professionalScheduleAvailability.flat()
  } catch (error: unknown | string | undefined) {
    throw new Error(error)
  }
}
