'use client'
import { memo } from 'react'
import { Form } from '../Form'

import {
  CHECKBOX_INPUT_CLASSNAME,
  TEXT_LABEL_OF_TEXT_INPUT_CLASSNAME,
} from '@/style/consts'
import { twMerge } from 'tailwind-merge'

interface TherapiesFieldsProps {
  therapiesFields: any
  classNameGrid?: string
  gridRowEnd?: string
  titleLabel?: string
  therapiesFieldName?: string
}

export const TherapiesFields = memo(function TherapiesFields({
  therapiesFields,
  classNameGrid = 'row-start-3 col-start-2 col-end-2',
  gridRowEnd = '10',
  titleLabel = 'Terapias',
  therapiesFieldName = 'therapiesAttended',
}: TherapiesFieldsProps) {
  return (
    <Form.Field
      style={{
        gridRowEnd,
      }}
      className={twMerge('flex flex-col gap-1', classNameGrid)}
    >
      <div className="flex flex-row gap-1 items-center">
        <Form.Label>{titleLabel}</Form.Label>
        <Form.ErrorMessage field={therapiesFieldName} />
      </div>

      <div className="flex flex-col gap-2">
        {therapiesFields?.length > 0 &&
          therapiesFields.map((therapy: any, index: number) => {
            const fieldName = `${therapiesFieldName}.${index}.checked`
            return (
              <Form.Field
                key={therapy.id}
                className="flex flex-row gap-2 items-center"
              >
                <Form.Input
                  className={`${CHECKBOX_INPUT_CLASSNAME} w-5 h-5`}
                  type="checkbox"
                  name={fieldName}
                />
                <Form.Label
                  className={TEXT_LABEL_OF_TEXT_INPUT_CLASSNAME}
                  htmlFor={fieldName}
                >
                  {therapy.name}
                </Form.Label>
              </Form.Field>
            )
          })}
      </div>
    </Form.Field>
  )
})
