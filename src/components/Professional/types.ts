import { z } from 'zod'
import { professionalFormSchema } from './'
import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { ReactElement } from 'react'
import { FormFieldSettings, TableHeader, TherapyData } from '@/types'

export type ProfessionalFormData = z.infer<typeof professionalFormSchema>

export type DayNames =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'

export interface ProfessionalFormProps {
  mutationKey?: string
  queryKeys?: string[]
  endPoint?: string
  registerData?: ProfessionalFormData
  therapiesData?: TherapyData[]
  method?: 'POST' | 'PATCH'
  ActionButton?: ReactElement
  titleForm?: string
  setOpen?: (value: boolean) => void
}

export type Option = {
  key: string
  value: string
}

export type NameInputs = keyof ProfessionalFormData

export type FormProfessionalFieldSettings = {
  name: NameInputs
  options?: Option[]
} & FormFieldSettings

export interface UseProfessionalFormProps {
  queryKeys?: string[]
  mutateAsync: UseMutateAsyncFunction<any, unknown, any, unknown>
  setOpen?: (value: boolean) => void
}

export type TableHeaderProfessional = {
  key: NameInputs
} & TableHeader
