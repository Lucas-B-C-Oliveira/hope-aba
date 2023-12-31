import { z } from 'zod'
import { roomFormSchema } from './'
import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { ReactElement } from 'react'
import { FormFieldSettings, TableHeader, TherapyData } from '@/types'

export type RoomFormData = z.infer<typeof roomFormSchema>

export interface RoomFormProps {
  mutationKey?: string
  queryKeys?: string[]
  endPoint?: string
  registerData?: RoomFormData
  therapiesData?: TherapyData[]
  method?: 'POST' | 'PATCH'
  ActionButton?: ReactElement
  titleForm?: string
  setOpen?: (value: boolean) => void
}

type NameInputs = keyof RoomFormData

export type FormFieldRoomSettings = {
  name: NameInputs
} & FormFieldSettings

export interface UseRoomFormProps {
  queryKeys?: string[]
  mutateAsync: UseMutateAsyncFunction<any, unknown, any, unknown>
  setOpen?: (value: boolean) => void
}

export type TableHeaderRoom = {
  key: NameInputs
} & TableHeader
