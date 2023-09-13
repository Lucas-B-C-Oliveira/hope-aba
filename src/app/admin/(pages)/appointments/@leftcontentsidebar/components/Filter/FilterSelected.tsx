'use client'

import { ActionButton } from '@/components/ActionButton'
import { Form } from '@/components/Form'
import { useAppointmentFilterStore } from '@/store/appointmentFilterStore'
import {
  CHECKBOX_INPUT_CLASSNAME,
  TEXT_LABEL_OF_TEXT_INPUT_CLASSNAME,
} from '@/style/consts'
import { FilterKey } from '@/types'
import { doFetch } from '@/utils/actions/action'
import { TrashIcon } from '@heroicons/react/24/solid'
import { memo, useEffect, useState } from 'react'

interface Props {
  filterKey: FilterKey
  name: string
  tag: string
}

export const FilterSelected = memo(function FilterSelected({
  filterKey,
  name,
  tag,
}: Props) {
  const { removeFilter } = useAppointmentFilterStore()

  function handleButton() {
    // console.log('_____________filterKey QUE VOU REMOVER', filterKey)
    removeFilter(filterKey)
    // clearFilters()
  }

  return (
    <Form.Field className="flex flex-row py-2 px-2 bg-indigo-600 rounded-full items-center w-48 justify-between gap-2 ">
      <Form.Label className="text-xs text-white font-semibold truncate overflow-hidden whitespace-nowrap">
        {name}
      </Form.Label>
      <ActionButton
        onClick={handleButton}
        classNameToMerge="bg-transparent hover:bg-transparent shadow-none p-0 h-fit w-fit"
      >
        <TrashIcon className="w-4 h-4 text-red-100 hover:text-red-50" />
      </ActionButton>
    </Form.Field>
  )
})
