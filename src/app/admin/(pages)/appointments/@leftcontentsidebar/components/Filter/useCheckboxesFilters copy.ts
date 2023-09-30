import { useAppointmentFilterStore } from '@/store/appointmentFilterStore'
import { FilterKey, TokenData } from '@/types'
import { CSFetch } from '@/utils/api/clientFetch'
import {
  makeQueryByArray,
  removeFirstCharacter,
  removeSpacesOfString,
} from '@/utils/functions/helpers'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

export function useCheckboxesFilters(
  endPoint?: string,
  tokenData?: TokenData,
  fieldToGetValue?: string,
  filterKey?: FilterKey,
) {
  const [loading, setLoading] = useState(false)
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
    error,
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
    enabled: queryEnabledTherapies,
  })

  const { data: responseRoomsData, refetch: roomsRefetch } = useQuery({
    queryKey: ['get/useCheckboxesFilters/rooms'],
    queryFn: async () => {
      try {
        if (!loading) {
          setLoading(true)
        }

        const therapyIds = makeQueryByArray('therapyIds', therapiesIds)
        const filterQueryWithoutSpaces = removeSpacesOfString(therapyIds)
        const queryFilters = removeFirstCharacter(filterQueryWithoutSpaces)

        const fetchQuery: string =
          tokenData?.role === 'admin'
            ? `${endPoint}`
            : `${endPoint}?${queryFilters}`

        console.log('endPoint', endPoint)
        console.log('fetchQuery', fetchQuery)

        const response = await CSFetch<any>(fetchQuery)
        setLoading(false)
        return response?.data
      } catch (error: unknown) {
        console.error('error', error)
      }
    },
    enabled: queryEnabledRooms,
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
      tokenData?.role === 'professional' &&
      responseTherapiesData?.length > 0
    ) {
      const therapiesIds = responseTherapiesData?.map((data: any) => {
        return data?.id
      })

      setValue('rooms', {
        therapiesIds,
      })
    }
  }, [responseTherapiesData, responseTherapiesStatus, therapiesFetchStatus])

  useEffect(() => {
    if (
      tokenData?.role === 'professional' &&
      therapiesIds &&
      therapiesIds?.length > 0
    ) {
      roomsRefetch()
    }
  }, [observedField])

  console.log('responseData', responseTherapiesData)

  return {
    responseData:
      endPoint === 'therapies' ? responseTherapiesData : responseRoomsData,
    loading,
    checkboxHandle,
  }
}
