/* eslint-disable @tanstack/query/exhaustive-deps */
import { CSFetch } from '@/utils/api/clientFetch'
import { useQuery } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export function useAutocompleteLogic(endPoint?: string, fieldName?: string) {
  const [selected, setSelected] = useState<any>(null)
  const [currentOptions, setCurrentOptions] = useState<any>([]) 

  const searchValue = useRef<undefined | string>(undefined)

  const ARE_THERE_OPTIONS_TO_SHOW = currentOptions && currentOptions?.length > 0

  const { setValue, getValues } = useFormContext()
  const formValues = getValues()
  const currentFieldValue = formValues[`${fieldName}`]

  const {
    data: optionsData,
    refetch: optionsRefetch,
    fetchStatus,
    status,
    isFetching,
  } = useQuery({
    queryKey: [`get/useAutocompleteLogic/${endPoint}`],
    queryFn: async () => {
      const response = await CSFetch<any>(
        `${endPoint}?search=${searchValue?.current}`,
        {
          cache: 'no-cache',
        },
      )
      return response?.data
    },
    enabled: false,
    cacheTime: 0,
  })

  async function onSearchChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    if (value?.length > 1) {
      searchValue.current = value
      setCurrentOptions(null)
      optionsRefetch()
    }
  }

  function searchAllData() {
    searchValue.current = ''
    optionsRefetch()
  }

  function clearSomeData() {
    if (selected !== null) {
      setSelected(null)
    }
    if (currentFieldValue !== undefined) {
      setValue(`${fieldName}`, undefined)
    }
  }

  useEffect(() => {
    if (optionsData && status === 'success' && optionsData?.length > 0) {
      if (!isEqual(optionsData, currentOptions)) {
        setCurrentOptions(optionsData)
        clearSomeData()
      }
    }
  }, [status, optionsData?.length, fetchStatus])

  useEffect(() => {
    if (selected) {
      setValue(`${fieldName}`, selected)
    } else {
      clearSomeData()
    }
  }, [selected])

  return {
    onSearchChange,
    ARE_THERE_OPTIONS_TO_SHOW,
    setSelected,
    loading: isFetching,
    selected,
    currentOptions,
    searchAllData,
  }
}
