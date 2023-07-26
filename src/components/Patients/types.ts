import { z } from 'zod'
import { patientFormSchema } from './'
import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { ReactElement } from 'react'
import { FormFieldSettings, TableHeader, TherapyData } from '@/types'

export type PatientFormData = z.infer<typeof patientFormSchema>

export interface PatientFormProps {
  mutationKey?: string
  queryKeys?: string[]
  endPoint?: string
  registerData?: PatientFormData
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

export type NameInputs = keyof PatientFormData

export type FormPatientFieldSettings = {
  name: NameInputs
  options?: Option[]
} & FormFieldSettings

export interface UsePatientFormProps {
  queryKeys?: string[]
  mutateAsync: UseMutateAsyncFunction<any, unknown, any, unknown>
  setOpen?: (value: boolean) => void
}

export type TableHeaderPatient = {
  key: NameInputs
} & TableHeader
