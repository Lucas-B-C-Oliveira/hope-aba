'use client'

import { memo, useEffect, useState } from 'react'
import { MAGIC_LABEL_CLASSNAME, MUI_INPUT_SX } from '@/style/consts'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { getAvailableScheduleTime } from '@/utils/actions/action'
import { TimePicker } from '@mui/x-date-pickers'
import { Form } from '.'
import { dateAdapter } from '@/utils/dateAdapter'
import { HOUR_MIN_FORMAT } from '@/utils/globalConstants'

interface Props {
  name?: string
  title?: string
  fieldNameToObserve?: string
  professionalField?: string
}

export const TimePickerAdapterStart = memo(function TimePickerAdapterStart({
  fieldNameToObserve,
  name,
  title,
  professionalField,
}: Props) {
  const [availableTimeRanges, setAvailableTimeRanges] = useState<
    [] | { start: string; end: string }[]
  >([])

  const {
    setValue,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
    control,
  } = useFormContext()

  const observedField = useWatch({
    name: `${fieldNameToObserve}`,
    control,
  })

  const observedProfessionalField = useWatch({
    name: `${professionalField}`,
    control,
  })

  const formValues = getValues()

  function shouldDisableTime(value: any) {
    const selectedTime = value.format(HOUR_MIN_FORMAT)

    const isTimeDisabled = !availableTimeRanges.some(
      (range) => selectedTime >= range.start && selectedTime <= range.end,
    )

    return isTimeDisabled
  }

  function handleTimePicker(date: any) {
    const dateFormated = dateAdapter(date).format('HH:mm')

    if (!observedProfessionalField) {
      setError(`${name}`, {
        message: 'Selecione um profissional',
        type: 'string',
      })
    } else {
      const currentErrors = errors.schedule
      if (currentErrors && 'end' in currentErrors) {
        if (currentErrors?.end?.message === 'Selecione um profissional') {
          clearErrors()
        }
      }

      if (formValues?.schedule?.start !== dateFormated) {
        setValue(`${name}`, dateFormated)
      }
    }
  }

  useEffect(() => {
    console.log('observedProfessionalField', observedProfessionalField)
    if (
      typeof observedProfessionalField?.id !== 'undefined' &&
      typeof observedField !== 'undefined'
    ) {
      getAvailableScheduleTime(
        observedProfessionalField?.id,
        observedField,
      ).then(async (data) => {
        setAvailableTimeRanges(data)
      })
    }
  }, [observedProfessionalField?.id, observedField])

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

      <TimePicker
        shouldDisableTime={shouldDisableTime}
        onChange={handleTimePicker}
        sx={MUI_INPUT_SX}
        onError={(error) => {
          if (error === 'shouldDisableTime-hours' || error === 'invalidDate') {
            setError(`${name}`, {
              message: 'Escolha um horário válido',
              type: 'string',
            })
          } else if (!error) {
            clearErrors()
          }
        }}
      />
    </Form.Field>
  )
})
