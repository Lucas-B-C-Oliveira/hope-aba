'use client'

import { memo, useEffect, useState } from 'react'
import { MAGIC_LABEL_CLASSNAME, MUI_INPUT_SX } from '@/style/consts'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import {
  getAvailableScheduleTime,
} from '@/utils/actions/action'
import { TimePicker } from '@mui/x-date-pickers'
import { useCalendarStore } from '@/store/calendarStore'
import { Form } from '.'
import { dateAdapter } from '@/utils/dateAdapter'
import { HOUR_MIN_FORMAT } from '@/utils/globalConstants'

interface Props {
  name?: string
  title?: string
  fieldNameToObserve?: string
}

export const TimePickerAdapterStart = memo(function TimePickerAdapterStart({
  fieldNameToObserve,
  name,
  title,
}: Props) {
  const { professionalId } = useCalendarStore()
  const [availableTimeRanges, setAvailableTimeRanges] = useState<[] | { start: string, end: string }[]>([]);

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

  const formValues = getValues()


  function shouldDisableTime(value: any) {
    const selectedTime = value.format(HOUR_MIN_FORMAT);

    const isTimeDisabled = !availableTimeRanges.some(
      (range) => selectedTime >= range.start && selectedTime <= range.end
    );

    return isTimeDisabled;
  };

  function handleTimePicker(date: any) {
    const dateFormated = dateAdapter(date).format("HH:mm")
    if (formValues?.schedule?.start !== dateFormated) {
      setValue(`${name}`, dateFormated)
    }

  }

  useEffect(() => {
    if (typeof professionalId !== 'undefined' && typeof observedField !== 'undefined') {
      getAvailableScheduleTime(professionalId, observedField).then(async (data) => {
        setAvailableTimeRanges(data);
      });
    }
  }, [professionalId, observedField]);

  return (

    <Form.Field className="relative">
      <Form.Label
        className={twMerge(MAGIC_LABEL_CLASSNAME, 'z-10')}
        htmlFor={name}
      >
        {title}
      </Form.Label>

      {/* <div className="absolute right-0"> //! TODO: Vai ter erro? 
        <Form.ErrorMessage
          field={name}
          specificStyle="z-40 absolute -top-[0.65rem] right-0 animate-pulse bg-white"
        />
      </div> */}

      <TimePicker
        shouldDisableTime={shouldDisableTime}
        onChange={handleTimePicker}

        sx={MUI_INPUT_SX}
      />
    </Form.Field>

  )
})
