'use client'

import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import {
  PatientFormData,
  UsePatientFormProps,
  patientFormSchema,
  formFields,
} from '..'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { documentMask } from '@/utils/functions'
import { useRouter } from 'next/navigation'

export const usePatientForm = ({
  mutateAsync,
  queryKeys,
  setOpen,
}: UsePatientFormProps) => {
  const professionalFormData = useForm<PatientFormData>({
    resolver: zodResolver(patientFormSchema),
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

  const { fields: allowTherapiesFields } = useFieldArray({
    control,
    name: 'allowTherapies',
  })

  const documentInputValue = useWatch({
    name: 'document',
    control,
  })

  const responsibleDocumentInputValue = useWatch({
    name: 'responsibleDocument',
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

  if (typeof responsibleDocumentInputValue !== 'undefined') {
    const newValueWithMask = documentMask(responsibleDocumentInputValue)
    if (
      newValueWithMask !== responsibleDocumentInputValue &&
      typeof newValueWithMask !== 'undefined'
    ) {
      setValue('responsibleDocument', newValueWithMask)
    }
  }

  async function handleSubmitData(data: PatientFormData) {
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
    allowTherapiesFields,
    handleSubmitData,
    professionalFormData,
    formFields,
    reset,
  }
}
