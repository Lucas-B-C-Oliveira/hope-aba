export interface TableHeader {
  value: string
  id: string
}

export type TherapyData = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export type FetchTherapiesData = {
  data: TherapyData[]
  meta?: {
    page?: number
    perPage?: number
    total?: number
  }
}

export interface FormFieldSettings {
  className: string
  placeholder: string
  type: string
  htmlFor: string
  labelText: string
  key: string
  field: string
}

export type Filter = {
  name: string
  id: string
}

export type FilterKey =
  | 'patientsAppointment'
  | 'professionalsAppointment'
  | 'roomsAppointment'
  | 'therapiesAppointment'
  | 'patientsAvailable'
  | 'professionalAvailable'
  | 'roomsAvailable'
  | 'therapiesAvailable'
export type FilterType = 'Appointment' | 'Available'

export type LoginParams = {
  email: string
  password: string
}

export type Role = 'admin' | 'user' | 'professional' | 'attendant'

export type TokenData = {
  id: string
  accountId: string
  clinicIds: string
  name: string
  email: string
  role: Role
  iat: string
  exp: string
  professionalId?: string
}

export type GetClinicsDataResponse = {
  id: string
  name: string
  document: string
}

export interface Meta {
  page: number | string
  perPage: number | string
  total: number | string
}
