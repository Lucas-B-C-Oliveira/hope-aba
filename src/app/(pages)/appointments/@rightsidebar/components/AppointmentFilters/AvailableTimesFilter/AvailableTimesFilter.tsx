'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ReactElement, cloneElement, memo, useRef } from 'react'

const availableTimesFilterSchema = z.object({
  patient: z.any(),
  therapy: z.object({
    name: z.string(),
    id: z.string(),
  }),
  professional: z.object({
    name: z.string(),
    id: z.string(),
  }),
  room: z.object({
    name: z.string(),
    id: z.string(),
  }),
})

export type AvailableTimesFilterData = z.infer<
  typeof availableTimesFilterSchema
>

interface Props {
  patients?: ReactElement
  therapy?: ReactElement
  professional?: ReactElement
  room?: ReactElement
}

export const AvailableTimesFilter = memo(function AvailableTimesFilter({
  patients,
  professional,
  room,
  therapy,
}: Props) {
  const inputSearchData = useRef<AvailableTimesFilterData | undefined>(
    undefined,
  )

  const createAvailableTimesFilterForm = useForm<AvailableTimesFilterData>({
    resolver: zodResolver(availableTimesFilterSchema),
  })

  const { handleSubmit } = createAvailableTimesFilterForm

  function search(data: AvailableTimesFilterData) {
    inputSearchData.current = data
    // refetch()
  }

  return (
    <FormProvider {...createAvailableTimesFilterForm}>
      <form onSubmit={handleSubmit(search)} className="flex gap-6">
        <div className="flex flex-col items-center gap-4">
          {patients &&
            cloneElement(patients, {
              name: 'patient',
            })}

          {therapy &&
            cloneElement(therapy, {
              name: 'therapy',
              fieldNameToObserve: 'patient',
            })}

          {professional &&
            cloneElement(professional, {
              name: 'professional',
              title: 'Profissional',
              fieldNameToObserve: 'therapy',
            })}

          {room &&
            cloneElement(room, {
              name: 'room',
              title: 'Salas',
              fieldNameToObserve: 'therapy',
            })}
        </div>
      </form>
    </FormProvider>
  )
})
