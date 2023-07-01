'use client'

import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import {
  ProfessionalFormData,
  UseProfessionalFormProps,
  professionalFormSchema,
  formFields,
} from '../'
import { zodResolver } from '@hookform/resolvers/zod'

export const useProfessionalForm = ({
  professionalData,
  refetch,
  status,
  router,
  setOpen,
}: UseProfessionalFormProps) => {
  const professionalFormData = useForm<ProfessionalFormData>({
    resolver: zodResolver(professionalFormSchema),
  })

  const {
    register,
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

  if (
    typeof status !== 'undefined' &&
    typeof router !== 'undefined' &&
    status === 'success'
  ) {
    // router.refresh()
    // setOpen(false) //! TODO: Usar o router ou o setOpen?
  }

  const documentInputValue = useWatch({
    name: 'document',
    control,
  })

  if (typeof documentInputValue !== 'undefined') {
    const cpfRegex = /^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/

    const newValue = documentInputValue.replace(/\D/g, '')
    const newValueWithMask = newValue.replace(cpfRegex, '$1.$2.$3-$4')

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
        start: '03:00',
        end: '13:00',
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

  function handleSubmitData(data: ProfessionalFormData) {
    professionalData.current = data
    console.log('data', data)
    refetch()
  }

  return {
    register,
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
