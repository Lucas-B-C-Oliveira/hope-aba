'use client'

import { ChangeEvent, memo, useEffect, useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox, Listbox } from '@headlessui/react'
import {
  MAGIC_INPUT_CLASSNAME,
  MAGIC_LABEL_CLASSNAME,
  MUI_INPUT_SX,
} from '@/style/consts'
import { isEqual } from 'lodash'
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
}

export const DatePickerAdapter = memo(function DatePickerAdapter({
  name,
  title,
}: Props) {
  const { professionals } = useAppointmentFilterStore()

  const [weekDaysAvailable, setWeekDaysAvailable] = useState<number[]>([99])

  const {
    setValue,
    setError,
    clearErrors,
    getValues,
    formState: { errors }, //! TODO: Tirar o que não está usando
    control,
  } = useFormContext()

  const formValues = getValues()

  function isDateDisabled(date: any) {
    const jsDate = date.toDate()
    const dayNumber: number = jsDate?.getDay() ?? 8
    return !weekDaysAvailable?.includes(dayNumber)
  }

  function handleCalendar(date: any) {
    const dateFormated = dateAdapter(date).format(DATE_FORMAT)
    if (formValues?.schedule?.day !== dateFormated) {
      setValue(`${name}`, dateFormated)
    }
  }

  useEffect(() => {
    if (typeof professionals?.id !== 'undefined') {
      getProfessionalScheduleAvailabilityWeekDays(professionals?.id).then(
        async (data) => {
          setWeekDaysAvailable(data)
        },
      )
    }
  }, [professionals?.id])

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
          field={`${name}`}
          specificStyle="z-40 absolute -top-[0.65rem] right-0 animate-pulse bg-white"
        />
      </div>

      <DatePicker
        disablePast={true}
        shouldDisableDate={isDateDisabled}
        onChange={handleCalendar}
        sx={MUI_INPUT_SX}
      />
    </Form.Field>
  )
})
