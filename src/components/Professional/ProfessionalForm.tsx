'use client'
import { cloneElement, memo, useEffect } from 'react'

import {
  ProfessionalFormData,
  ProfessionalFormProps,
  ScheduleAvailabilityFields,
  weekdayKeys,
  weekdayName,
} from '.'

import { useProfessionalForm } from './hooks/useProfessionalForm'

import { useMutation } from '@tanstack/react-query'
import { CSFetch } from '@/utils/api/clientFetch'
import { Modal } from '../Modal'
import { TherapiesFields } from '../Therapies/TherapiesFields'
import { fixBackendDate, fixBackendTherapies } from '@/utils/functions'

export const ProfessionalForm = memo(function ProfessionalForm({
  endPoint,
  mutationKey,
  queryKeys,
  therapiesData,
  method,
  registerData,
  ActionButton,
  titleForm,
  setOpen,
}: ProfessionalFormProps) {
  const { mutateAsync, status } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: async (data: ProfessionalFormData) => {
      try {
        const response = await CSFetch<any>(endPoint as string, {
          method,
          body: JSON.stringify(data),
        })

        if (response?.error) {
          throw new Error(response?.error)
        }

        return { ...response }
      } catch (error) {
        console.error(error)
      }
    },
  })

  const {
    addHourRanges,
    handleSubmit,
    handleSubmitData,
    isSubmitting,
    removeHourRanges,
    setValue,
    therapiesAttendedFields,
    professionalFormData,
    scheduleAvailabilityFields,
    formFields,
    reset,
  } = useProfessionalForm({
    queryKeys,
    mutateAsync,
    setOpen,
  })

  useEffect(() => {
    if (
      typeof registerData !== 'undefined' &&
      typeof therapiesData !== 'undefined'
    ) {
      const {
        bornDate: bornDateBackend,
        therapiesAttended: therapiesAttendedArray,
      } = registerData

      const bornDate = fixBackendDate(bornDateBackend)

      const scheduleAvailability = weekdayKeys.map((weekdayKey) => {
        if (typeof registerData !== 'undefined') {
          const { scheduleAvailability: scheduleAvailabilityArray } =
            registerData

          const foundObject = scheduleAvailabilityArray.find((item) => {
            const [key] = Object.entries(item)[0]

            return key === weekdayKey
          })

          if (foundObject) {
            const times = Object.values(foundObject)
            return { day: times[0] }
          }
        }

        return { day: [] }
      })

      const therapiesAttended = fixBackendTherapies(
        therapiesData,
        therapiesAttendedArray,
      )

      reset({
        ...registerData,
        therapiesAttended,
        scheduleAvailability,
        bornDate,
      })
    } else {
      setValue('scheduleAvailability', [
        { day: [] },
        { day: [] },
        { day: [] },
        { day: [] },
        { day: [] },
        { day: [] },
        { day: [] },
      ])

      if (typeof therapiesData !== 'undefined') {
        setValue(
          'therapiesAttended',
          therapiesData?.map((value) => {
            return {
              checked: false,
              id: value.id,
              name: value.name,
            }
          }),
        )
      }
    }
  }, [])

  return (
    <Modal.FormContainer
      formFields={formFields}
      handleSubmit={handleSubmit}
      handleSubmitData={handleSubmitData}
      titleForm={titleForm}
      useFormReturn={professionalFormData}
      ActionButton={
        ActionButton &&
        cloneElement(ActionButton, {
          disabled: isSubmitting,
          mutationStatus: status,
          isMutationAction: true,
        })
      }
      SpecialFields={
        <ScheduleAvailabilityFields
          addHourRanges={addHourRanges}
          removeHourRanges={removeHourRanges}
          scheduleAvailabilityFields={scheduleAvailabilityFields}
          weekdayName={weekdayName}
        />
      }
      TherapiesFields={
        <TherapiesFields therapiesFields={therapiesAttendedFields} />
      }
    />
  )
})
