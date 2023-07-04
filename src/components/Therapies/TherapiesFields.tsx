'use client'
import { memo } from 'react'
import { Form } from '../Form'

import {
  CHECKBOX_INPUT_CLASSNAME,
  TEXT_LABEL_OF_TEXT_INPUT_CLASSNAME,
} from '@/style/consts'
import { twMerge } from 'tailwind-merge'

interface TherapiesFieldsProps {
  therapiesAttendedFields: any
  classNameGrid?: string
  gridRowEnd?: string
}

export const TherapiesFields = memo(function TherapiesFields({
  therapiesAttendedFields,
  classNameGrid = 'row-start-3 col-start-2 col-end-2',
  gridRowEnd = '10',
}: TherapiesFieldsProps) {
  return (
    <Form.Field
      style={{
        gridRowEnd,
      }}
      className={twMerge('flex flex-col gap-1', classNameGrid)}
    >
      <div className="flex flex-row gap-1 items-center">
        <Form.Label>Terapias</Form.Label>
        <Form.ErrorMessage field="therapiesAttended" />
      </div>

      <div className="flex flex-col gap-2">
        {therapiesAttendedFields?.length > 0 &&
          therapiesAttendedFields.map((therapy: any, index: number) => {
            const fieldName = `therapiesAttended.${index}.checked`
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
