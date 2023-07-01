'use client'
import { cloneElement, memo, useEffect, useRef } from 'react'

import {
  ProfessionalFormData,
  ProfessionalFormProps,
  ScheduleAvailabilityFields,
  TherapiesFields,
  weekdayKeys,
  weekdayName,
} from '.'

import { useProfessionalForm } from './hooks/useProfessionalForm'

import { useQuery } from '@tanstack/react-query'
import { CSFetch } from '@/utils/api/clientFetch'

import { useRouter } from 'next/navigation'
import { Modal } from '../Modal'

export const ProfessionalForm = memo(function ProfessionalForm({
  endPoint,
  queryKey,
  therapiesData,
  method,
  setOpen,
  registerData,
  ActionButton,
  titleForm,
}: ProfessionalFormProps) {
  const router = useRouter()
  const professionalData = useRef<ProfessionalFormData | undefined>(undefined)

  const { refetch, status } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      try {
        if (typeof professionalData.current === 'undefined')
          throw new Error('professionalData.current is undefined')

        const response = await CSFetch<any>(endPoint, {
          method,
          body: JSON.stringify(professionalData.current),
        })

        if (response?.error) {
          throw new Error(response?.error)
        }

        return { ...response }
      } catch (error) {
        console.error(error)
        throw new Error(error)
      }
    },
    enabled: false,
  })

  const {
    addHourRanges,
    handleSubmit,
    handleSubmitData,
    isSubmitting,
    register,
    removeHourRanges,
    setValue,
    therapiesAttendedFields,
    professionalFormData,
    scheduleAvailabilityFields,
    formFields,
    reset,
  } = useProfessionalForm({
    status,
    refetch,
    professionalData,
    router,
    setOpen,
  }) //! TODO: Checar se precisa do router ou não, pq eu uso só pra fechar o modal, mas pode ser q precise dele

  useEffect(() => {
    if (typeof registerData !== 'undefined') {
      console.log('registerData', registerData)

      const { bornDate: bornDateBackend } = registerData
      const date = new Date(bornDateBackend as string)
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      // const bornDate = `${year}-${month}-${day}`
      const bornDate = `${day}-${month}-${year}`

      // 2023-06-04

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

        return { day: [{ start: '00:00', end: '00:00' }] }
      })

      const therapiesAttended = therapiesData?.map((value, index) => {
        const { therapiesAttended: therapiesAttendedArray } = registerData

        const checked = therapiesAttendedArray.some(
          (item) => item.name === value.name,
        )

        return {
          checked,
          id: value.id,
          name: value.name,
        }
      })

      console.log('bornDate', bornDate)

      reset({
        ...registerData,
        therapiesAttended,
        scheduleAvailability,
        bornDate,
      })
    } else {
      setValue('scheduleAvailability', [
        { day: [{ start: '00:00', end: '00:00' }] },
        { day: [{ start: '00:00', end: '00:00' }] },
        { day: [{ start: '00:00', end: '00:00' }] },
        { day: [{ start: '00:00', end: '00:00' }] },
        { day: [{ start: '00:00', end: '00:00' }] },
        { day: [{ start: '00:00', end: '00:00' }] },
        { day: [{ start: '00:00', end: '00:00' }] },
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
      register={register}
      titleForm={titleForm}
      useFormReturn={professionalFormData}
      ActionButton={
        ActionButton &&
        cloneElement(ActionButton, {
          disabled: isSubmitting,
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
        <TherapiesFields therapiesAttendedFields={therapiesAttendedFields} />
      }
    />
  )
})
