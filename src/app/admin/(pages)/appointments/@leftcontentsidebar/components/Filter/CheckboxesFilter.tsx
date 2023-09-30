'use client'

import { Form } from '@/components/Form'
import { useAppointmentFilterStore } from '@/store/appointmentFilterStore'
import {
  CHECKBOX_INPUT_CLASSNAME,
  TEXT_LABEL_OF_TEXT_INPUT_CLASSNAME,
} from '@/style/consts'
import { FilterKey, TokenData } from '@/types'
import { doFetch } from '@/utils/actions/action'
import { memo, useEffect, useState } from 'react'
import { useCheckboxesTherapiesFilters } from './useCheckboxesTherapiesFilters'

interface Props {
  filterKey: FilterKey
  endPoint: string
  labelText: string
  tokenData: TokenData
}

export const CheckboxesFilter = memo(function CheckboxesFilter({
  filterKey,
  endPoint,
  labelText,
  tokenData,
}: Props) {
  const { checkboxHandle, loading, responseData } =
    useCheckboxesTherapiesFilters(endPoint, tokenData, 'therapies', filterKey)

  return (
    <Form.Field className="flex flex-col gap-1">
      <Form.Label>{labelText}</Form.Label>
      <div className="flex flex-col gap-2">
        {typeof responseData !== 'undefined' &&
          responseData?.length > 0 &&
          responseData.map((checkbox: any) => {
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
