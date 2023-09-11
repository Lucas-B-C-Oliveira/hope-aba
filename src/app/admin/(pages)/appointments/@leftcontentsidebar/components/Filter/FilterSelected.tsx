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
import { XMarkIcon } from '@heroicons/react/24/solid'
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
  }

  return (
    <Form.Field className="flex flex-col gap-1 bg-sky-300">
      <Form.Label>{name}</Form.Label>
      <ActionButton onClick={handleButton} classNameToMerge="bg-red-500">
        <XMarkIcon className="w-6 h-6 text-pink-400 hover:text-pink-300" />
      </ActionButton>
    </Form.Field>
  )
})
