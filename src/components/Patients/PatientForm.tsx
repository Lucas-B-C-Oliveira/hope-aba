'use client'
import { cloneElement, memo, useEffect } from 'react'

import { PatientFormData, PatientFormProps } from '.'

import { usePatientForm } from './hooks/usePatientForm'

import { useMutation } from '@tanstack/react-query'
import { CSFetch } from '@/utils/api/clientFetch'
import { Modal } from '../Modal'
import { TherapiesFields } from '../Therapies/TherapiesFields'
import { fixBackendDate, fixBackendTherapies } from '@/utils/functions'

export const PatientForm = memo(function PatientForm({
  endPoint,
  mutationKey,
  queryKeys,
  therapiesData,
  method,
  registerData,
  ActionButton,
  titleForm,
  setOpen,
}: PatientFormProps) {
  const { mutateAsync, status } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: async (data: PatientFormData) => {
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
    allowTherapiesFields,
    professionalFormData,
    formFields,
    reset,
  } = usePatientForm({
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
        allowTherapies: allowTherapiesArray,
        startTreatmentAt: startTreatmentAtBackend,
      } = registerData

      const bornDate = fixBackendDate(bornDateBackend)
      const startTreatmentAt = fixBackendDate(startTreatmentAtBackend)

      const allowTherapies = fixBackendTherapies(
        therapiesData,
        allowTherapiesArray,
      )

      reset({
        ...registerData,
        allowTherapies,
        startTreatmentAt,
        bornDate,
      })
    } else {
      if (typeof therapiesData !== 'undefined') {
        setValue(
          'allowTherapies',
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
      therapiesFieldsClassNameGrid="row-start-3 col-start-3 col-end-3"
      therapiesFieldsGridRowEnd="7"
      mainFieldsGridTemplateRows="repeat(7, 60px)"
      mainFieldsGridTemplateColumns="repeat(3, 190px)"
      TherapiesFields={
        <TherapiesFields
          therapiesFields={allowTherapiesFields}
          titleLabel="Terapias Permitidas"
          therapiesFieldName="allowTherapies"
        />
      }
    />
  )
})
