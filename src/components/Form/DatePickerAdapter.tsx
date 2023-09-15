'use client'

import { memo, useEffect, useState } from 'react'
import {
  MAGIC_LABEL_CLASSNAME,
  MUI_INPUT_SX,
} from '@/style/consts'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { getProfessionalScheduleAvailabilityWeekDays } from '@/utils/actions/action'
import { DatePicker } from '@mui/x-date-pickers'
import { Form } from '.'
import { dateAdapter } from '@/utils/dateAdapter'
import { DATE_FORMAT } from '@/utils/globalConstants'
import { useAppointmentFilterStore } from '@/store/appointmentFilterStore'

interface Props {
  name?: string
  title?: string
  professionalField?: string
}

export const DatePickerAdapter = memo(function DatePickerAdapter({
  name,
  title,
  professionalField,
}: Props) {
  const { professionalAvailable } = useAppointmentFilterStore()

  const [weekDaysAvailable, setWeekDaysAvailable] = useState<number[]>([99])

  const {
    setValue,
    setError,
    clearErrors,
    getValues,
    formState: { errors }, //! TODO: Tirar o que não está usando
    control,
  } = useFormContext()

  const observedProfessionalField = useWatch({
    name: `${professionalField}`,
    control,
  })

  const formValues = getValues()

  function isDateDisabled(date: any) {
    const jsDate = date.toDate()
    const dayNumber: number = jsDate?.getDay() ?? 8
    return !weekDaysAvailable?.includes(dayNumber)
  }

  function handleCalendar(date: any) {
    const dateFormated = dateAdapter(date).format(DATE_FORMAT)

    console.log('observedProfessionalField', observedProfessionalField)
    console.log('errors', errors)

    if (!observedProfessionalField) {
      setError(`${name}`, {
        message: 'Selecione um profissional',
        type: 'string',
      })
    } else {
      const currentErrors = errors.schedule
      if (currentErrors && 'day' in currentErrors) {
        if (currentErrors?.day?.message === 'Selecione um profissional') {
          clearErrors()
        }
      }
      if (formValues?.schedule?.day !== dateFormated) {
        setValue(`${name}`, dateFormated)
      }
    }
  }

  useEffect(() => {
    if (typeof professionalAvailable?.id !== 'undefined') {
      getProfessionalScheduleAvailabilityWeekDays(professionalAvailable?.id).then(
        async (data) => {
          setWeekDaysAvailable(data)
        },
      )
    }
  }, [professionalAvailable?.id])

  return (
    <Form.Field className="relative">
      <Form.Label
        className={twMerge(MAGIC_LABEL_CLASSNAME, 'z-10')}
        htmlFor={name}
      >
        {title}
      </Form.Label>

      <div className="absolute right-0">
        <Form.ErrorMessage
          position="left"
          field={`${name}`}
          specificStyle="z-40 absolute -top-[0.65rem] right-0 animate-pulse bg-white"
        />
      </div>

      <DatePicker
        disablePast={true}
        shouldDisableDate={isDateDisabled}
        onChange={handleCalendar}
        onError={(error) => {
          if (error === 'invalidDate') {
            setError(`${name}`, {
              message: 'Escolha uma data válida',
              type: 'string',
            })
          } else if (!error) {
            clearErrors()
          }
        }}
        sx={MUI_INPUT_SX}
      />
    </Form.Field>
  )
})
