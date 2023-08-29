import { TherapyData } from '@/types'
import { dateAdapter } from '../dateAdapter'

export const fixBackendDate = (backendDate: string) => {
  const date = new Date(backendDate)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}

export const fixBackendTherapies = (
  therapiesData: TherapyData[],
  backendTherapies: any[],
) =>
  therapiesData?.map((value) => {
    const checked = backendTherapies.some((item) => item.name === value.name)
    return {
      checked,
      id: value.id,
      name: value.name,
    }
  })

export const documentMask = (inputValue: string) => {
  const cpfRegex = /^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/

  const newValue = inputValue.replace(/\D/g, '')
  return newValue.replace(cpfRegex, '$1.$2.$3-$4')
}


export function capitalizedText(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function getDayNumber(day: string) {
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

export function convertTimeFormat(day: any, time: any, currentDate?: any) {
  const [hours, minutes] = time.split(':')
  const dayNumber = getDayNumber(day)
  const date =
    typeof currentDate !== 'undefined'
      ? dateAdapter(currentDate).startOf('isoWeek').day(dayNumber)
      : dateAdapter().startOf('isoWeek').day(dayNumber)
  return date.hours(hours).minutes(minutes).format('YYYY-MM-DDTHH:mm')
}

export function getAvailabilityTimeData(inputArray: any[], currentDate?: any): any[] {
  return inputArray.map((dayObj) => {
    const day = Object.keys(dayObj)[0]
    const timeArray = dayObj[day].map((timeObj: any) => ({
      start: convertTimeFormat(day, timeObj.start, currentDate),
      end: convertTimeFormat(day, timeObj.end, currentDate),
      type: 'filter',
    }))

    return timeArray
  })
}

export function getAvailabilityTimeByDate(inputArray: any[], currentDate: string): any[] {
  return inputArray.map((dayObj) => {
    const day = Object.keys(dayObj)[0]
    const timeArray = dayObj[day].map((timeObj: any) => ({
      start: convertTimeFormat(day, timeObj.start, currentDate),
      end: convertTimeFormat(day, timeObj.end, currentDate),
    }))

    return timeArray
  })
}

export function getAvailabilityWeekDays(inputArray: any[]): any[] {
  return inputArray.map((dayObj) => {
    const day = Object.keys(dayObj)[0]
    return getDayNumber(day)
  })
}