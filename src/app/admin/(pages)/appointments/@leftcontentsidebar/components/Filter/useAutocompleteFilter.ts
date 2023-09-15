import { useAppointmentFilterStore } from '@/store/appointmentFilterStore'
import { FilterKey, TokenData } from '@/types'
import { CSFetch } from '@/utils/api/clientFetch'
import { useQuery } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'

export function useAutocompleteFilter(
  filterKey?: FilterKey,
  endPoint?: string,
  disabled: boolean | undefined = false,
  tokenData: TokenData | undefined = undefined,
) {
  const [selected, setSelected] = useState<any>(null)
  const [currentOptions, setCurrentOptions] = useState<any>([]) //! TODO: Trocar o tipo para o tipo correto
  const [loading, setLoading] = useState(false)
  const {
    addFilter,
    patientsAppointment,
    professionalsAppointment,
    professionalAvailable,
  } = useAppointmentFilterStore()
  const searchValue = useRef<undefined | string>(undefined)

  const ARE_THERE_OPTIONS_TO_SHOW = currentOptions && currentOptions?.length > 0

  const {
    data: optionsData,
    refetch: optionsRefetch,
    status: optionsStatus,
    error: optionsError,
    fetchStatus,
  } = useQuery({
    queryKey: ['get/useAutocompleteFilter/options'],
    queryFn: async () => {
      try {
        if (!loading) {
          setLoading(true)
        }
        const response = await CSFetch<any>(
          `${endPoint}?search=${searchValue?.current}`,
        )
        setLoading(false)
        return response?.data
      } catch (error: unknown) {
        console.error('error', error)
      }
    },
    enabled: false,
  })

  async function onSearchChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    if (value?.length > 2 && value !== searchValue.current) {
      searchValue.current = value
      setCurrentOptions(null)
      optionsRefetch()
    }
  }

  function searchAllData() {
    searchValue.current = ''
    optionsRefetch()
  }

  useEffect(() => {
    if (optionsData && optionsStatus === 'success' && !optionsError) {
      if (!isEqual(optionsData, currentOptions)) {
        setCurrentOptions(optionsData)
      }
    }
  }, [optionsData, fetchStatus])

  useEffect(() => {
    if (optionsStatus === 'error' && optionsError) {
      setLoading(false)
    }
  }, [optionsStatus, optionsError])

  useEffect(() => {
    if (filterKey?.includes('Available') && !professionalAvailable) {
      setCurrentOptions(null)
      setSelected(null)
    } else if (
      filterKey === 'professionalsAppointment' &&
      !professionalsAppointment
    ) {
      setCurrentOptions(null)
      setSelected(null)
    } else if (filterKey === 'patientsAppointment' && !patientsAppointment) {
      setCurrentOptions(null)
      setSelected(null)
    }
  }, [professionalAvailable, professionalsAppointment, patientsAppointment])

  useEffect(() => {
    if (selected) {
      const filterData = {
        name: selected?.name,
        id: selected?.id,
      }

      if (filterKey?.includes('Available')) {
        const isNewFilter = professionalAvailable?.id !== selected?.id
        if (isNewFilter) {
          addFilter(filterKey as FilterKey, filterData)
        }
      } else if (filterKey === 'professionalsAppointment') {
        const isNewFilter = professionalsAppointment?.id !== selected?.id
        if (isNewFilter) {
          addFilter(filterKey as FilterKey, filterData)
        }
      } else if (filterKey === 'patientsAppointment') {
        const isNewFilter = patientsAppointment?.id !== selected?.id
        if (isNewFilter) {
          addFilter(filterKey as FilterKey, filterData)
        }
      }
    }
  }, [selected])

  useEffect(() => {
    if (disabled) {
      const newOption = [
        {
          name: tokenData?.name,
          id: tokenData?.professionalId,
        },
      ]

      setCurrentOptions(newOption)
      setSelected(newOption[0])
    }
  }, [disabled])

  return {
    onSearchChange,
    ARE_THERE_OPTIONS_TO_SHOW,
    setSelected,
    loading,
    selected,
    currentOptions,
    searchAllData,
  }
}
