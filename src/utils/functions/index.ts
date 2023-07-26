import { TherapyData } from '@/types'

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

export function getGridColumnByWeekday(weekday: string) {
  if (weekday === 'monday') return 'col-start-1'
  else if (weekday === 'tuesday') return 'col-start-2'
  else if (weekday === 'wednesday') return 'col-start-3'
  else if (weekday === 'thursday') return 'col-start-4'
  else if (weekday === 'friday') return 'col-start-5'
}

export function getHour(time: string) {
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

export function getMin(time: string) {
  if (time === '50') return 35
  else if (time === '40') return 28
  else if (time === '30') return 21
  else if (time === '20') return 14
  else if (time === '7') return 10
  return 0
}
