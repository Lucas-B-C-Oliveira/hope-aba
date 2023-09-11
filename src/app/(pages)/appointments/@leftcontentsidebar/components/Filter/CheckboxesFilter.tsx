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

interface Props {
  filterKey: FilterKey
  endPoint: string
  labelText: string
}

export const CheckboxesFilter = memo(function CheckboxesFilter({
  filterKey,
  endPoint,
  labelText,
}: Props) {
  const { addFilter, removeFilter } = useAppointmentFilterStore()
  const [checkboxes, setCheckboxes] = useState<any>([])

  function checkboxHandle(inputData: any, checboxSelectedData: any) {
    const checked = inputData.target.checked
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

  async function onChangeHandle() {
    try {
      const data = await doFetch<any | { data: any }>(`${endPoint}?search`)
      if (data?.data.length > 0) {
        setCheckboxes(data?.data)
      }
    } catch (error) {
      console.error('SERVER ACTION ERROR - endPoint: ', endPoint, error)
    }
  }

  useEffect(() => {
    onChangeHandle()
  }, [])

  return (
    <Form.Field className="flex flex-col gap-1">
      <Form.Label>{labelText}</Form.Label>
      <div className="flex flex-col gap-2">
        {typeof checkboxes !== 'undefined' &&
          checkboxes?.length > 0 &&
          checkboxes.map((checkbox: any) => {
            return (
              <Form.Field
                key={checkbox.id}
                className="flex flex-row gap-2 items-center"
              >
                <input
                  id={checkbox.id}
                  className={`${CHECKBOX_INPUT_CLASSNAME} w-5 h-5`}
                  type="checkbox"
                  name={checkbox.id}
                  onChange={(inputData) => checkboxHandle(inputData, checkbox)}
                />
                <Form.Label
                  className={TEXT_LABEL_OF_TEXT_INPUT_CLASSNAME}
                  htmlFor={checkbox.id}
                >
                  {checkbox.name}
                </Form.Label>
              </Form.Field>
            )
          })}
      </div>
    </Form.Field>
  )
})
