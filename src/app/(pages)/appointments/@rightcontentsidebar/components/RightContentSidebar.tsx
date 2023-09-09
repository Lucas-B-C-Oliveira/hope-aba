'use client'
import { memo } from 'react'
import { Form } from '@/components/Form'
import { ActionButton } from '@/components/ActionButton'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import { AppointmentForm } from './AppointmentForm'
import { ErrorFeedback } from '../../components/ErrorFeedback'
import { useMainLayoutStore } from '@/store/mainLayoutStore'
import { DatePickerAdapter } from '@/components/Form/DatePickerAdapter'
import { TimePickerAdapterEnd } from '@/components/Form/TimePickerAdapterEnd'
import { TimePickerAdapterStart } from '@/components/Form/TimePickerAdapterStart'
import { ContentSidebarContainer } from '../../components/ContentSidebarContainer'

export const RightContentSidebar = memo(function RightContentSidebar() {
  const { openAndCloseRightContentSidebar, rightContentSidebarIsOpen } =
    useMainLayoutStore()

  return (

    <ContentSidebarContainer
      isOpen={rightContentSidebarIsOpen}
      content={
        <AppointmentForm
          titleForm="Cadastrar Agendamento"
          patients={<Form.Autocomplete endPoint="patients" />}
          therapy={<Form.SelectByFormData />}
          professional={
            <Form.SelectFetchOptionsById endPoint="professionals" />
          }
          room={<Form.SelectFetchOptionsById endPoint="rooms" />}
          actionButton={
            <ActionButton type="submit">
              <ArrowUpCircleIcon
                className="pointer-events-none h-5 w-5 text-white"
                aria-hidden="true"
              />
              Cadastrar
            </ActionButton>
          }
          datePicker={<DatePickerAdapter />}
          timePickerStart={<TimePickerAdapterStart />}
          timePickerEnd={<TimePickerAdapterEnd />}
          errorFeedback={<ErrorFeedback />}
        />
      }
    />


  )
})
