'use client'

import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form } from '../Form'
import { memo, useRef } from 'react'
// import { useQuery } from '@tanstack/react-query'
// import { CSFetch } from '@/utils/api/clientFetch'
// import { SelectByNoFetchQuery } from '../SearchData/SelectByNoFetchQuery'
// import { SelectFetchOptionsById } from '../SearchData/SelectFetchOptionsById'

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
  queryKeys: string[]
  patientsEndPoint: string
  professionalEndPoint: string
  roomEndPoint: string
  therapyIdByPatientQuery: string
}

export const AvailableTimesFilter = memo(function AvailableTimesFilter({
  queryKeys,
  patientsEndPoint,
  professionalEndPoint,
  roomEndPoint,
  therapyIdByPatientQuery,
}: Props) {
  const inputSearchData = useRef<AvailableTimesFilterData | undefined>(
    undefined,
  )
  // const { refetch } = useQuery({
  //   queryKey: [queryKey],
  //   queryFn: async () => {
  //     try {
  //       if (typeof inputSearchData?.current === 'undefined')
  //         throw new Error('searchData is undefined')

  //       const response = await CSFetch<any>(
  //         `${endPoint}?search=${inputSearchData?.current?.search}`,
  //       )

  //       if (response?.error) {
  //         throw new Error(response?.error)
  //       }

  //       return { ...response }
  //     } catch (error) {
  //       console.error(error)
  //       return error
  //     }
  //   },
  //   enabled: false,
  // })

  const createAvailableTimesFilterForm = useForm<AvailableTimesFilterData>({
    resolver: zodResolver(availableTimesFilterSchema),
  })

  const { handleSubmit, control } = createAvailableTimesFilterForm

  function search(data: AvailableTimesFilterData) {
    inputSearchData.current = data
    // refetch()
  }

  const patientSelected = useWatch({
    control,
    name: 'patient',
  })

  const therapySelected = useWatch({
    control,
    name: 'therapy',
  })

  // const teste = useWatch({
  //   control,
  //   name: 'professional',
  // })

  // console.log('teste', teste)

  return (
    <FormProvider {...createAvailableTimesFilterForm}>
      <form onSubmit={handleSubmit(search)} className="flex gap-6">
        <div className="flex flex-row items-center gap-1">
          {/* <Form.Autocomplete
            name="patient"
            endPoint={patientsEndPoint}
            queryKey={therapyIdByPatientQuery}
          />

          <SelectByNoFetchQuery
            name="therapy"
            options={patientSelected?.allowTherapies}
          />

          <SelectFetchOptionsById
            name="professional"
            endPoint={professionalEndPoint}
            title="Profissional"
            queryKey="get-professional-by-therapyid"
          />

          <SelectFetchOptionsById
            name="room"
            endPoint={roomEndPoint}
            title="Salas"
            queryKey="get-room-by-therapyid"
          /> */}

          {/* <Form.Input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Pesquisar..."
            type="search"
            name="search"
          />
          <Form.ErrorMessage field="search" /> */}
        </div>
      </form>
    </FormProvider>
  )
})
