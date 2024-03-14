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

export function useCheckboxesRoomsFilters(
  endPoint?: string,
  tokenData?: TokenData,
  fieldToGetValue?: string,
  filterKey?: FilterKey,
) {
  const [loading, setLoading] = useState(false)
  const [checkboxes, setCheckboxes] = useState<any[] | []>([])
  const { addFilter, removeFilter } = useAppointmentFilterStore()

  const { getValues, control } = useFormContext()

  const formValues = getValues()

  const observedField = useWatch({
    name: `${fieldToGetValue}`,
    control,
  })

  const therapiesIds: string[] = formValues[`${fieldToGetValue}`]
  const queryEnabledRooms =
    tokenData?.role === 'admin' || tokenData?.role === 'attendant'

  const {
    data: responseRoomsData,
    status: responseRoomsStatus,
    refetch: roomsRefetch,
    error: roomsError,
    fetchStatus: roomsFetchStatus,
  } = useQuery({
    queryKey: ['get/useCheckboxesRoomsFilters/rooms'],
    queryFn: async () => {
      try {
        if (!loading) {
          setLoading(true)
        }

        const therapyIdsQuery =
          tokenData?.role === 'professional'
            ? `?${makeQueryByArray('therapyIds', therapiesIds)}`
            : ''

        const fetchQuery = `${endPoint}${therapyIdsQuery}`
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
      responseRoomsData &&
      responseRoomsData.length > 0 &&
      responseRoomsStatus === 'success'
    ) {
      if (!isEqual(responseRoomsData, checkboxes)) {
        setCheckboxes(responseRoomsData)
      }
    }
  }, [responseRoomsData, roomsFetchStatus])

  useEffect(() => {
    if (observedField && (checkboxes.length === 0 || !checkboxes)) {
      roomsRefetch()
    }
  }, [observedField])

  return {
    responseData: checkboxes,
    loading,
    checkboxHandle,
  }
}
