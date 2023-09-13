'use server'

import { SSFetch } from '@/utils/api/serverFetch'
import {
  getAvailabilityTimeByDate,
  getAvailabilityTimeData,
  getAvailabilityWeekDays,
} from '../functions'
import { dateAdapter } from '../dateAdapter'

export async function doFetch<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  try {
    const response = await SSFetch<T>(input, init)
    return response
  } catch (error: unknown | string | undefined) {
    console.log('error', error)
    // throw new Error(error)
  }
}

interface Response {
  data?: any[]
}

export async function getAppointmentsByRangeDate<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  try {
    const response = (await SSFetch<T>(input, init)) as Response
    const cardsAppointment = response?.data
      ? response?.data.map((appointmentData: any) => {
          const { day, start, end } = appointmentData.schedule

          const { patient, therapy } = appointmentData

          const patientNameSplited = patient.name.split(' ')

          const patientNameLabel = `${patientNameSplited[0]} ${
            patientNameSplited[patientNameSplited.length - 1]
          }` //! TODO: Format this name to First upercase first lether

          const startDate = new Date(`${day}T${start}:00`)
          const endDate = new Date(`${day}T${end}:00`)

          return {
            start: startDate,
            end: endDate,
            // start: dateAdapter(`${day}T${start}:00`).toDate(),
            // end: dateAdapter(`${day}T${end}:00`).toDate(),
            data: {
              ...appointmentData,
              patientNameLabel,
              therapyNameLabel: therapy?.name,
            },
          }
        })
      : []

    return cardsAppointment
  } catch (error: unknown | string | undefined) {
    throw new Error(`${error}`)
  }
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

    const professionalScheduleAvailability = getAvailabilityTimeData(
      scheduleAvailability,
      currentDate,
    )

    return professionalScheduleAvailability.flat()
  } catch (error: unknown | string | undefined) {
    throw new Error(error as any)
  }
}

export async function getAvailableScheduleTime(
  professionalId: string,
  currentDate?: any,
) {
  try {
    const response = await SSFetch<any>(`professionals/${professionalId}`)
    const {
      data: { scheduleAvailability },
    } = response

    const professionalScheduleAvailability = getAvailabilityTimeByDate(
      scheduleAvailability,
      currentDate,
    )

    const newArrayFlat = professionalScheduleAvailability.flat()

    const scheduleAvailabilityFiltered = newArrayFlat.filter((date) => {
      return date?.start.split('T')[0] === currentDate
    })
    const availableTimeFormated = scheduleAvailabilityFiltered.map(
      (rangeTime: { start: string; end: string }) => {
        return {
          start: rangeTime?.start?.split('T')[1],
          end: rangeTime?.end?.split('T')[1],
        }
      },
    )

    return availableTimeFormated
  } catch (error: unknown | string | undefined) {
    console.log('error', error)
    throw new Error(error as any)
  }
}

export async function getProfessionalScheduleAvailabilityWeekDays(
  professionalId: string,
) {
  try {
    const response = await SSFetch<any>(`professionals/${professionalId}`)
    const {
      data: { scheduleAvailability },
    } = response

    const professionalScheduleAvailability =
      getAvailabilityWeekDays(scheduleAvailability)

    return professionalScheduleAvailability.flat()
  } catch (error: unknown | string | undefined) {
    throw new Error(`${error}`)
  }
}
