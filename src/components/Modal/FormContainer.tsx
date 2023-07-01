'use client'

import { BaseSyntheticEvent, ReactElement, cloneElement, memo } from 'react'
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormRegister,
  UseFormReturn,
} from 'react-hook-form'
import { Form } from '../Form'

interface Props {
  useFormReturn: UseFormReturn
  handleSubmit: <T extends FieldValues>(
    onValid: SubmitHandler<T>,
    onInvalid?: SubmitErrorHandler<T> | undefined,
  ) => (e?: BaseSyntheticEvent<T> | undefined) => Promise<T>
  handleSubmitData: (data: any) => void
  formFields: any[]
  register: UseFormRegister<FieldValues>
  ActionButton: ReactElement
  SpecialFields: ReactElement
  TherapiesFields: ReactElement
  titleForm: string
}

export const FormContainer = memo(function FormContainer({
  useFormReturn,
  handleSubmit,
  handleSubmitData,
  formFields,
  register,
  titleForm,
  ActionButton,
  SpecialFields,
  TherapiesFields,
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
              gridTemplateRows: 'repeat(10, 60px)',
              gridTemplateColumns: 'repeat(2, 190px)',
              gridAutoFlow: 'column',
              gridRowGap: '14px',
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

                        <select
                          {...register(formField?.name)}
                          className={formField.className}
                        >
                          <option value="">{formField.placeholder}</option>
                          {formField?.options?.length > 0 &&
                            formField.options.map((data: any) => (
                              <option key={data.key} value={data.key}>
                                {data.value}
                              </option>
                            ))}
                        </select>

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

            {TherapiesFields && cloneElement(TherapiesFields)}
          </div>

          {SpecialFields && cloneElement(SpecialFields)}
        </div>

        {ActionButton && cloneElement(ActionButton)}
      </form>
    </FormProvider>
  )
})
