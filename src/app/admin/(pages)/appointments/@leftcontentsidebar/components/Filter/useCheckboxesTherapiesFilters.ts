import { useAppointmentFilterStore } from '@/store/appointmentFilterStore'
import { FilterKey, TokenData } from '@/types'
import { CSFetch } from '@/utils/api/clientFetch'
import {
  makeQueryByArray,
  removeFirstCharacter,
  removeSpacesOfString,
} from '@/utils/functions/helpers'
import { useQuery } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

export function useCheckboxesTherapiesFilters(
  endPoint?: string,
  tokenData?: TokenData,
  fieldToGetValue?: string,
  filterKey?: FilterKey,
) {
  const [loading, setLoading] = useState(false)
  const [checkboxes, setCheckboxes] = useState<any[] | []>([])
  const { addFilter, removeFilter } = useAppointmentFilterStore()

  const { setValue, getValues, control } = useFormContext()

  const formValues = getValues()

  const observedField = useWatch({
    name: `${fieldToGetValue}`,
    control,
  })

  const queryEnabledTherapies = endPoint === 'therapies'
  const queryEnabledRooms =
    tokenData?.role === 'professional' && endPoint === 'rooms'
  const therapiesIds: string[] = formValues[`${fieldToGetValue}`]

  const {
    data: responseTherapiesData,
    status: responseTherapiesStatus,
    refetch: therapiesRefetch,
    error: therapiesError,
    fetchStatus: therapiesFetchStatus,
  } = useQuery({
    queryKey: ['get/useCheckboxesFilters/therapies'],
    queryFn: async () => {
      try {
        if (!loading) {
          setLoading(true)
        }

        const fetchQuery = `${endPoint}`
        console.log('endPoint', endPoint)
        console.log('fetchQuery', fetchQuery)
        const response = await CSFetch<any>(fetchQuery)
        setLoading(false)
        return response?.data
      } catch (error: unknown) {
        console.error('error', error)
      }
    },
  })

  function checkboxHandle(inputData: any, checboxSelectedData: any) {
    const checked = inputData.target.checked
    if (filterKey) {
      if (checked) {
        const newFilter = {
          name: checboxSelectedData?.name,
          id: checboxSelectedData?.id,
        }
        addFilter(filterKey, newFilter)
      } else {
        removeFilter(filterKey, checboxSelectedData?.id)
      }
    }
  }

  useEffect(() => {
    if (
      responseTherapiesData &&
      responseTherapiesData.length > 0 &&
      responseTherapiesStatus === 'success'
    ) {
      if (tokenData?.role === 'professional') {
        setValue('rooms', {
          responseTherapiesData,
        })
      }

      if (!isEqual(responseTherapiesData, checkboxes)) {
        setCheckboxes(responseTherapiesData)
      }
    }
  }, [responseTherapiesData, therapiesFetchStatus])

  return {
    responseData: checkboxes,
    loading,
    checkboxHandle,
  }
}
