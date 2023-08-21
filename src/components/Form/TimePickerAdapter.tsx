'use client'

import { ChangeEvent, memo, useEffect, useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox, Listbox } from '@headlessui/react'
import { MAGIC_INPUT_CLASSNAME, MAGIC_LABEL_CLASSNAME } from '@/style/consts'
import { isEqual } from 'lodash'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import {
  doFetch,
  getProfessionalScheduleAvailability,
} from '@/utils/actions/action'
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import { useCalendarStore } from '@/store/calendarStore'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const shouldDisableTime: TimePickerProps<Dayjs>['shouldDisableTime'] = (
  value,
  view,
) => view === 'minutes' && value.minute() >= 45

// const defaultValue = dayjs().set('hour', 10).set('minute', 50).startOf('minute')
interface Props {
  name?: string
  title?: string
  endPoint?: string
  fieldNameToObserve?: string
  setProfessionalData?: (data: any) => void
}

export const TimePickerAdapter = memo(function TimePickerAdapter({
  endPoint,
  fieldNameToObserve,
  name,
  setProfessionalData,
  title,
}: Props) {
  const { professionalId } = useCalendarStore()

  useEffect(() => {
    if (typeof professionalId !== 'undefined') {
      //! TODO: Tem que passar a data selecionada no Input de Date
      getProfessionalScheduleAvailability(professionalId).then(async (data) => {
        // setProfessionalScheduleAvailable(data)
      })
    }
  }, [professionalId])

  return (
    <div className="relative">
      <Listbox.Label className={twMerge(MAGIC_LABEL_CLASSNAME, 'z-10 ')}>
        {title}
      </Listbox.Label>

      <div className="absolute right-0">
        {/* <Form.ErrorMessage
              field={`${name}`}
              specificStyle="z-40 absolute -top-[0.65rem] right-0 animate-pulse bg-white"
            /> */}
      </div>

      <TimePicker
        // defaultValue={defaultValue}
        shouldDisableTime={shouldDisableTime}
      />
    </div>
  )
})
