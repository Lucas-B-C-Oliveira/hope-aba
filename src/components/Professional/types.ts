import { z } from 'zod'
import { professionalFormSchema } from './'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from '@tanstack/react-query'
import { MutableRefObject, ReactElement } from 'react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
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
  queryKey?: string
  endPoint?: string
  setOpen?: (value: boolean) => void
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
  status: 'error' | 'success' | 'loading'
  professionalData: MutableRefObject<ProfessionalFormData | undefined>
  router: AppRouterInstance
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<any, unknown>>
  setOpen: (value: boolean) => void
}
