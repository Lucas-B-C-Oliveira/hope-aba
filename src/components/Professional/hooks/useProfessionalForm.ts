'use client'

import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import {
  ProfessionalFormData,
  UseProfessionalFormProps,
  professionalFormSchema,
  formFields,
} from '../'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { documentMask } from '@/utils/functions'
import { useRouter } from 'next/navigation'

const START_TIME_DEFAULT = '07:00'
const END_TIME_DEFAULT = '18:00'

export const useProfessionalForm = ({
  mutateAsync,
  queryKeys,
  setOpen,
}: UseProfessionalFormProps) => {
  const professionalFormData = useForm<ProfessionalFormData>({
    resolver: zodResolver(professionalFormSchema),
  })

  const queryClient = useQueryClient()
  const router = useRouter()

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    setValue,
    reset,
  } = professionalFormData

  const { fields: therapiesAttendedFields } = useFieldArray({
    control,
    name: 'therapiesAttended',
  })

  const {
    fields: scheduleAvailabilityFields,
    update: scheduleAvailabilityUpdate,
  } = useFieldArray({
    control,
    name: 'scheduleAvailability',
  })

  const documentInputValue = useWatch({
    name: 'document',
    control,
  })

  if (typeof documentInputValue !== 'undefined') {
    const newValueWithMask = documentMask(documentInputValue)

    if (
      newValueWithMask !== documentInputValue &&
      typeof newValueWithMask !== 'undefined'
    ) {
      setValue('document', newValueWithMask)
    }
  }

  //! TODO: Terminar de fazer a função de escolher a terapia baseada no profession

  // const professionData = useWatch({ control, name: 'profession' })

  // if (typeof professionData !== 'undefined') {
  //   const newTherapiesAttended = {}
  //   setValue('therapiesAttended', {
  //     ...therapiesAttendedFields,
  //     ...newTherapiesAttended,
  //   })
  // }

  // console.log('professionData', professionData)

  function addHourRanges(availabilityFieldIndex: number) {
    const availabilityField = scheduleAvailabilityFields[availabilityFieldIndex]
    if (availabilityField.day.length < 3) {
      availabilityField.day.push({
        start: START_TIME_DEFAULT,
        end: END_TIME_DEFAULT,
      })

      scheduleAvailabilityUpdate(availabilityFieldIndex, availabilityField)
    }
  }

  function removeHourRanges(
    availabilityFieldIndex: number,
    hourRangesIndex: number,
  ) {
    const availabilityField = scheduleAvailabilityFields[availabilityFieldIndex]
    availabilityField?.day?.splice(hourRangesIndex, 1)
    scheduleAvailabilityUpdate(availabilityFieldIndex, availabilityField)
  }

  async function handleSubmitData(data: ProfessionalFormData) {
    try {
      await mutateAsync(data)

      await queryClient.refetchQueries({
        queryKey: queryKeys,
        exact: true,
        type: 'all',
      })

      if (setOpen) {
        setOpen(false)
        router.refresh()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    handleSubmit,
    isSubmitting,
    setValue,
    therapiesAttendedFields,
    addHourRanges,
    removeHourRanges,
    handleSubmitData,
    professionalFormData,
    scheduleAvailabilityFields,
    formFields,
    reset,
  }
}
