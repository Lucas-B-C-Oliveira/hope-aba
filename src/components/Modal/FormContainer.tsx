'use client'

import { BaseSyntheticEvent, ReactElement, cloneElement, memo } from 'react'
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form'
import { Form } from '../Form'
import {
  CHECKBOX_INPUT_CLASSNAME,
  TEXT_LABEL_OF_TEXT_INPUT_CLASSNAME,
} from '@/style/consts'

interface Props {
  useFormReturn: UseFormReturn
  handleSubmit: <T extends FieldValues>(
    onValid: SubmitHandler<T>,
    onInvalid?: SubmitErrorHandler<T> | undefined,
  ) => (e?: BaseSyntheticEvent<T> | undefined) => Promise<T>
  handleSubmitData: (data: any) => void
  formFields: any[]
  ActionButton: ReactElement
  SpecialFields: ReactElement
  TherapiesFields: ReactElement
  titleForm: string
  therapiesFieldsClassNameGrid?: string
  therapiesFieldsGridRowEnd?: string
  mainFieldsGridRowGap?: string
  mainFieldsGridTemplateRows?: string
  mainFieldsGridTemplateColumns?: string
}

export const FormContainer = memo(function FormContainer({
  useFormReturn,
  handleSubmit,
  handleSubmitData,
  formFields,
  titleForm,
  ActionButton,
  SpecialFields,
  TherapiesFields,
  therapiesFieldsClassNameGrid = 'row-start-3 col-start-2 col-end-2',
  therapiesFieldsGridRowEnd = '10',
  mainFieldsGridRowGap = '14px',
  mainFieldsGridTemplateRows = 'repeat(10, 60px)',
  mainFieldsGridTemplateColumns = 'repeat(2, 190px)',
}: Props) {
  return (
    <FormProvider {...useFormReturn}>
      <form
        className="flex flex-col gap-4 h-full w-full justify-between"
        onSubmit={handleSubmit(handleSubmitData)}
      >
        <h2 className="text-left text-3xl font-bold tracking-tight text-gray-900">
          {titleForm}
        </h2>

        <div className="flex flex-row gap-6">
          <div
            style={{
              display: 'grid',
              gridTemplateRows: mainFieldsGridTemplateRows,
              gridTemplateColumns: mainFieldsGridTemplateColumns,
              gridAutoFlow: 'column',
              gridRowGap: mainFieldsGridRowGap,
              gridColumnGap: '24px',
            }}
          >
            {formFields?.length > 0 &&
              formFields.map((formField) => {
                if (formField.type === 'select') {
                  if (formField?.options) {
                    return (
                      <Form.Field key={formField.key}>
                        <div className="flex flex-row gap-1 items-center">
                          <Form.Label htmlFor={formField.name}>
                            {formField.labelText}
                          </Form.Label>
                          <Form.ErrorMessage field={formField.field} />
                        </div>

                        <Form.Select
                          name={formField?.name}
                          className={formField?.className}
                          options={formField?.options}
                          placeholder={formField.placeholder}
                        />
                      </Form.Field>
                    )
                  }
                }

                if (formField.type === 'date') {
                  return (
                    <Form.Field key={formField.key}>
                      <div className="flex flex-row gap-1 items-center">
                        <Form.Label htmlFor={formField.name}>
                          {formField.labelText}
                        </Form.Label>
                        <Form.ErrorMessage field={formField.field} />
                      </div>
                      <Form.Input
                        className={formField.className}
                        type={formField.type}
                        name={formField.name}
                      />
                    </Form.Field>
                  )
                }

                if (formField.type === 'checkbox') {
                  return (
                    <Form.Field
                      key={formField.key}
                      className="flex flex-row gap-2 items-center"
                    >
                      <Form.Input
                        className={`${CHECKBOX_INPUT_CLASSNAME} w-5 h-5`}
                        type={formField.type}
                        name={formField.name}
                      />

                      <div className="flex flex-row gap-1 items-center">
                        <Form.Label
                          className={TEXT_LABEL_OF_TEXT_INPUT_CLASSNAME}
                          htmlFor={formField.name}
                        >
                          {formField.labelText}
                        </Form.Label>
                        <Form.ErrorMessage field={formField.field} />
                      </div>
                    </Form.Field>
                  )
                }

                return (
                  <Form.Field key={formField.key}>
                    <div className="flex flex-row gap-1 items-center">
                      <Form.Label htmlFor={formField.name}>
                        {formField.labelText}
                      </Form.Label>
                      <Form.ErrorMessage field={formField.field} />
                    </div>
                    <Form.Input
                      className={formField.className}
                      placeholder={formField.placeholder}
                      type={formField.type}
                      name={formField.name}
                    />
                  </Form.Field>
                )
              })}

            {TherapiesFields &&
              cloneElement(TherapiesFields, {
                classNameGrid: therapiesFieldsClassNameGrid,
                gridRowEnd: therapiesFieldsGridRowEnd,
              })}
          </div>

          {SpecialFields && cloneElement(SpecialFields)}
        </div>

        {ActionButton && cloneElement(ActionButton)}
      </form>
    </FormProvider>
  )
})
