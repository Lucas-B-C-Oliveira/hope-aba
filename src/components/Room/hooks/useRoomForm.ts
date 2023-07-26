'use client'

import { useFieldArray, useForm } from 'react-hook-form'
import { formFields, RoomFormData, roomFormSchema, UseRoomFormProps } from '..'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'

export const useRoomForm = ({
  mutateAsync,
  queryKeys,
  setOpen,
}: UseRoomFormProps) => {
  const roomFormData = useForm<RoomFormData>({
    resolver: zodResolver(roomFormSchema),
  })

  const queryClient = useQueryClient()

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    setValue,
    reset,
  } = roomFormData

  const { fields: therapiesAttendedFields } = useFieldArray({
    control,
    name: 'therapiesAttended',
  })

  async function handleSubmitData(data: RoomFormData) {
    try {
      await mutateAsync(data)

      await queryClient.refetchQueries({
        queryKey: queryKeys,
        exact: true,
        type: 'all',
      })

      if (setOpen) setOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    handleSubmit,
    isSubmitting,
    setValue,
    therapiesAttendedFields,
    handleSubmitData,
    roomFormData,
    formFields,
    reset,
  }
}
