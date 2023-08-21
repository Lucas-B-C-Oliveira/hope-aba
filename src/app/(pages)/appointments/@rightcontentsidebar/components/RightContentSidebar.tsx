'use client'
import { Transition } from '@headlessui/react'
import { Fragment, memo, useEffect } from 'react'
import { Form } from '@/components/Form'
import { ActionButton } from '@/components/ActionButton'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { AppointmentForm } from '../../components/Form/AppointmentForm'
import { ErrorFeedback } from '../../components/ErrorFeedback'
import { useMainLayoutStore } from '@/store/mainLayoutStore'
import { TimePickerAdapter } from '@/components/Form/TimePickerAdapter'

export const RightContentSidebar = memo(function RightContentSidebar() {
  const { openAndCloseRightContentSidebar, rightContentSidebarIsOpen } =
    useMainLayoutStore()

  return (
    <Transition
      show={rightContentSidebarIsOpen}
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        // style={{ backgroundColor: '#f9fafc' }}

        className={`
          pointer-events-auto transform  h-full rounded-2xl bg-white p-6 text-left shadow-xl transition-all w-fit 
        `}
      >
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
          timePicker={<TimePickerAdapter />}
          errorFeedback={<ErrorFeedback />}
        />
      </div>
    </Transition>
  )
})
