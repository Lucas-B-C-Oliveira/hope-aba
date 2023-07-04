'use client'
import { cloneElement, memo, useEffect } from 'react'

import { RoomFormData, RoomFormProps } from '.'

import { useRoomForm } from './hooks/useRoomForm'

import { useMutation } from '@tanstack/react-query'
import { CSFetch } from '@/utils/api/clientFetch'
import { Modal } from '../Modal'
import { TherapiesFields } from '../Therapies/TherapiesFields'

export const RoomForm = memo(function RoomForm({
  endPoint,
  mutationKey,
  queryKeys,
  therapiesData,
  method,
  registerData,
  ActionButton,
  titleForm,
  setOpen,
}: RoomFormProps) {
  const { mutateAsync, status } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: async (data: RoomFormData) => {
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
    handleSubmit,
    handleSubmitData,
    isSubmitting,
    setValue,
    therapiesAttendedFields,
    roomFormData,
    formFields,
    reset,
  } = useRoomForm({
    queryKeys,
    mutateAsync,
    setOpen,
  })

  useEffect(() => {
    if (typeof registerData !== 'undefined') {
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

      reset({
        ...registerData,
        therapiesAttended,
      })
    } else {
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
      useFormReturn={roomFormData}
      therapiesFieldsClassNameGrid="row-start-1 col-start-2 col-end-2"
      therapiesFieldsGridRowEnd="3"
      mainFieldsGridRowGap="2px"
      mainFieldsGridTemplateRows="repeat(6, 55px)"
      mainFieldsGridTemplateColumns="repeat(2, 190px)"
      ActionButton={
        ActionButton &&
        cloneElement(ActionButton, {
          disabled: isSubmitting,
          mutationStatus: status,
          isMutationAction: true,
        })
      }
      TherapiesFields={
        <TherapiesFields therapiesAttendedFields={therapiesAttendedFields} />
      }
    />
  )
})
