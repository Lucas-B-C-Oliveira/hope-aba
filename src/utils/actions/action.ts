'use server'

import { SSFetch } from '@/utils/api/serverFetch'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import { getGridColumnByWeekday, getHour, getMin } from '../functions'

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

export async function getAppointmentsByRangeDate<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  try {
    const response = await SSFetch<T>(input, init)

    const cardsAppointment = response?.data.map((appointmentData) => {
      const HOUR_VALUE_IN_TABLE_HOUR = 42

      const {
        schedule: { day, start, end },
      } = appointmentData

      const weekDayNumber = dayjs(day).day()

      const weekdays = [
        '',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ]

      const currentWeekday = weekdays[weekDayNumber]
      console.log(
        '🚀 ~ file: action.ts:48 ~ cardsAppointment ~ currentWeekday:',
        currentWeekday,
      )

      const column = getGridColumnByWeekday(currentWeekday)
      console.log(
        '🚀 ~ file: action.ts:51 ~ cardsAppointment ~ column:',
        column,
      )

      const splitStartTime = start.split(':')
      const startTimePartOfHour = splitStartTime[0]
      const startTimePartOfMin = splitStartTime[1]

      const startTimePartOfHourInTableHourPrecision =
        getHour(startTimePartOfHour)

      const startTimePartOfMinInTableHourPrecision = getMin(startTimePartOfMin)

      const timeStartInTableHourPrecision =
        startTimePartOfHourInTableHourPrecision +
        startTimePartOfMinInTableHourPrecision

      const startTimeInDate = new Date(`1970-01-01T${start}`)
      const endTimeInDate = new Date(`1970-01-01T${end}`)

      const differenceInMilliseconds = endTimeInDate - startTimeInDate

      const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60)

      const numberOfHours = Math.floor(differenceInHours)

      const minutes = (differenceInHours - numberOfHours) * 60

      const minInTableHourPrecision = getMin(String(minutes))

      const startPositionInTableHour = timeStartInTableHourPrecision

      const lengthOfCardInTableHour =
        numberOfHours * HOUR_VALUE_IN_TABLE_HOUR + minInTableHourPrecision + 2

      return {
        ...appointmentData,
        gridRow: `${startPositionInTableHour} / span ${lengthOfCardInTableHour}`,
        column,
        id: uuidv4(),
      }
    })

    return cardsAppointment
  } catch (error: unknown | string | undefined) {
    throw new Error(error)
  }
}
