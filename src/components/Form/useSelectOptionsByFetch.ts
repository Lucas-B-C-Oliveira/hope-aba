import { CSFetch } from '@/utils/api/clientFetch'
import { useQuery } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

const defaultSelected = { name: 'Selecione', id: '123123' }

export interface UseSelectOptionsByFetchProps {
  currentFieldName?: string
  endpointToFetch?: string
  mainFieldNameToObserve?: string
  firstFieldNameToObserveToCleanFormData?: string
  professionalFieldToObserve?: string
  setProfessionalData?: (data: any) => void
}

export function useSelectOptionsByFetch({
  currentFieldName,
  endpointToFetch,
  mainFieldNameToObserve,
  setProfessionalData,
  firstFieldNameToObserveToCleanFormData,
}: UseSelectOptionsByFetchProps) {
  const [selected, setSelected] = useState(defaultSelected)
  const [responseData, setResponseData] = useState<any>([]) //! TODO: Trocar o tipo para o tipo correto
  const therapyIds = useRef('')

  const {
    data: professionalResponse,
    refetch,
    status,
    fetchStatus,
    error,
    isFetching,
    isError,
  } = useQuery({
    queryKey: [
      `getProfessionalByTherapyIds/useSelectOptionsByFetch/${endpointToFetch}`,
      endpointToFetch,
      currentFieldName,
    ],
    queryFn: async () => {
      const response = await CSFetch<any>(
        `${endpointToFetch}/?therapyIds=${therapyIds?.current}`,
        {
          cache: 'no-store',
        },
      )

      return response
    },
    cacheTime: 0,
    enabled: false,
  })

  const {
    setValue,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
    control,
  } = useFormContext()

  const mainObservedField = useWatch({
    name: `${mainFieldNameToObserve}`,
    control,
  })

  const firstObservedFieldToCleanFormData = useWatch({
    name: `${firstFieldNameToObserveToCleanFormData}`,
    control,
  })

  const formValues = getValues()
  const currentFieldValue = formValues[`${currentFieldName}`]

  const ARE_THERE_OPTIONS_TO_SHOW =
    typeof responseData?.data !== 'undefined' && responseData?.data?.length > 0

  function cleanCurrentFormData() {
    setValue(`${currentFieldName}`, undefined)
    setResponseData([])

    if (!isEqual(selected, defaultSelected)) {
      setSelected(defaultSelected)
    }
  }

  function handleOnClickSelect() {
    if (typeof mainObservedField?.id === 'undefined') {
      setError(`${currentFieldName}`, {
        message:
          mainObservedField === 'therapy'
            ? 'Selecione uma terapia primeiro'
            : 'professional',
        type: 'string',
      })
    } else {
      if (typeof errors[`${currentFieldName}`]?.message !== 'undefined') {
        clearErrors()
      }
    }
  }

  useEffect(() => {
    cleanCurrentFormData()
    console.log('mainObservedField', mainObservedField)
    if (typeof mainObservedField?.id !== 'undefined') {
      therapyIds.current = mainObservedField?.id
      refetch()
    }
  }, [mainObservedField?.id])

  useEffect(() => {
    cleanCurrentFormData()
  }, [firstObservedFieldToCleanFormData])

  useEffect(() => {
    if (status === 'success' && professionalResponse) {
      if (
        typeof professionalResponse?.data === 'undefined' &&
        professionalResponse?.data?.length <= 0
      ) {
        // setSelected(defaultSelected)
        cleanCurrentFormData()
      } else {
        if (!isEqual(selected, professionalResponse)) {
          setResponseData(professionalResponse)
        }
      }
    }
  }, [professionalResponse, status, fetchStatus])

  function handleSelectOnChange(selectedData: any) {
    if (!isEqual(currentFieldValue, selectedData)) {
      setValue(`${currentFieldName}`, selectedData)
    }

    if (!isEqual(selected, selectedData)) {
      const newData = {
        id: selectedData?.id,
        name: selectedData?.name,
      }
      if (typeof setProfessionalData !== 'undefined') {
        setProfessionalData(newData)
      }
      setSelected(selectedData)
    }
  }

  return {
    handleSelectOnChange,
    handleOnClickSelect,
    ARE_THERE_OPTIONS_TO_SHOW,
    responseData,
    selected,
    isError,
    error,
    isFetching,
  }
}
