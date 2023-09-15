'use client'

import { useAppointmentFilterStore } from '@/store/appointmentFilterStore'
import { FilterKey, FilterType } from '@/types'
import { memo, useEffect, useState } from 'react'
import { Filter } from '.'

interface Props {
  filterType: FilterType
}

export const FiltersSelected = memo(function FiltersSelected({
  filterType,
}: Props) {
  const [filtersSelected, setFiltersSelected] = useState<
    { name: string; filterKey: FilterKey; tag: string }[] | []
  >([])

  const {
    patientsAppointment,
    professionalsAppointment,
    professionalAvailable,
  } = useAppointmentFilterStore()

  useEffect(() => {
    if (filterType?.includes('Available')) {
      const newFilters = []
      if (typeof professionalAvailable !== 'undefined') {
        newFilters.push({
          name: professionalAvailable?.name,
          filterKey: 'professionalAvailable' as FilterKey,
          tag: 'Profissional',
        })
      }
      setFiltersSelected(newFilters)
    }
  }, [professionalAvailable])

  useEffect(() => {
    if (filterType?.includes('Appointment')) {
      const newFilters = []
      if (typeof patientsAppointment !== 'undefined') {
        newFilters.push({
          name: patientsAppointment?.name,
          filterKey: 'patientsAppointment' as FilterKey,
          tag: 'Paciente',
        })
      }
      if (typeof professionalsAppointment !== 'undefined') {
        newFilters.push({
          name: professionalsAppointment?.name,
          filterKey: 'professionalsAppointment' as FilterKey,
          tag: 'Profissional',
        })
      }
      setFiltersSelected(newFilters)
    }
  }, [patientsAppointment, professionalsAppointment])

  return (
    <>
      {filtersSelected.length > 0 && filtersSelected && (
        <div className="flex flex-col gap-1 h-fit p-0">
          {filtersSelected.map((filterSelected) => {
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
      )}
    </>
  )
})
