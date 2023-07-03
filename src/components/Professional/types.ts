import { z } from 'zod'
import { professionalFormSchema } from './'
import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { MutableRefObject, ReactElement } from 'react'
import { TherapyData } from '@/types'

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
}

export type Option = {
  key: string
  value: string
}

export type NameInputs =
  | 'address'
  | 'name'
  | 'bornDate'
  | 'gender'
  | 'email'
  | 'zipcode'
  | 'document'
  | 'jobRole'
  | 'maritalStatus'
  | 'placeOfBirth'
  | 'scholarity'
  | 'profession'

export type FormFieldSettings = {
  className: string
  placeholder: string
  type: string
  name: NameInputs
  htmlFor: string
  labelText: string
  key: string
  field: string
  options?: Option[]
}

export interface UseProfessionalFormProps {
  queryKeys?: string[]
  mutateAsync: UseMutateAsyncFunction<any, unknown, void, unknown>
}
