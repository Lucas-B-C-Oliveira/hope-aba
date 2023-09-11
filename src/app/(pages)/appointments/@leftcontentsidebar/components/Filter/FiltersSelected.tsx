'use client'

import { Form } from '@/components/Form'
import { useAppointmentFilterStore } from '@/store/appointmentFilterStore'
import {
  CHECKBOX_INPUT_CLASSNAME,
  TEXT_LABEL_OF_TEXT_INPUT_CLASSNAME,
} from '@/style/consts'
import { FilterKey } from '@/types'
import { doFetch } from '@/utils/actions/action'
import { memo, useEffect, useState } from 'react'
import { FilterSelected } from './FilterSelected'
import { isEqual } from 'lodash'
import { Filter } from '.'

export const FiltersSelected = memo(function FiltersSelected() {
  const [filtersSelected, setFiltersSelected] = useState<
    { name: string; filterKey: FilterKey; tag: string }[] | []
  >([])

  const { filters } = useAppointmentFilterStore()

  useEffect(() => {
    const newFilters = []

    if (typeof filters?.patients !== 'undefined') {
      newFilters.push({
        name: filters?.patients?.name,
        filterKey: 'patients' as FilterKey, // Adicione a conversão para FilterKey aqui
        tag: 'Paciente',
      })
    }
    if (typeof filters?.professionals !== 'undefined') {
      newFilters.push({
        name: filters?.professionals?.name,
        filterKey: 'professionals' as FilterKey, // Adicione a conversão para FilterKey aqui
        tag: 'Profissional',
      })
    }

    setFiltersSelected(newFilters)
    // if (!isEqual(newFilters, filtersSelected)) {
    //   setFiltersSelected(newFilters)
    // }
  }, [filters.patients, filters.professionals])

  // console.log('filters', filters)
  // console.log('filtersSelected', filtersSelected)

  return (
    <div>
      {filtersSelected.length > 0 &&
        filtersSelected &&
        filtersSelected.map((filterSelected) => {
          return (
            <Filter.Label
              key={`${filterSelected?.name}-${filterSelected?.filterKey}-${filterSelected?.tag}`}
              filterKey={filterSelected?.filterKey}
              name={filterSelected?.name}
              tag={filterSelected?.tag}
            />
          )
        })}
    </div>
  )
})
