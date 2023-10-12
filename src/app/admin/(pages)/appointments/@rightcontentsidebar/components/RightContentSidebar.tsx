'use client'
import { memo, useEffect, useState } from 'react'
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
import { AutocompleteFilter } from '../../components/Filter/AutocompleteFilter'
import { useAutocompleteLogic } from './useAutocompleteLogic'

export const RightContentSidebar = memo(function RightContentSidebar() {
  const { rightContentSidebarIsOpen } =
    useMainLayoutStore()

  const [contentHeight, setContentHeight] = useState('0rem')
  const [startComponent, setStartComponent] = useState(false)

  useEffect(() => {
    if (window && startComponent) {

      const main = document.getElementById("main")
      const mainRef = main?.getBoundingClientRect()

      if (mainRef?.height) {
        const newContentHeight = `${mainRef?.height - 8}px`
        setContentHeight(newContentHeight)
      }
    }

  }, [startComponent]);

  useEffect(() => {
    setStartComponent(true)
  }, [])

  const usePatientLogic = () =>
    useAutocompleteLogic('patients', 'patient')

  return (
    <ContentSidebarContainer
      isOpen={rightContentSidebarIsOpen}
      content={
        <div
          style={{
            maxHeight: contentHeight
          }}
          className={`h-full overflow-y-auto py-2 `}
        >
          <AppointmentForm
            titleForm="Cadastrar Agendamento"
            patients={<AutocompleteFilter
              useAutocompleteLogic={usePatientLogic}
              labelText="Paciente"
            />}
            therapy={<Form.SelectByFormData />}
            professional={
              <Form.SelectFetchOptionsById endPoint="professionals" />
            }
            room={<Form.SelectFetchOptionsById endPoint="rooms" />}
            datePicker={<DatePickerAdapter />}
            timePickerStart={<TimePickerAdapterStart />}
            timePickerEnd={<TimePickerAdapterEnd />}
            actionButton={
              <ActionButton type="submit">
                <ArrowUpCircleIcon
                  className="pointer-events-none h-5 w-5 text-white"
                  aria-hidden="true"
                />
                Cadastrar
              </ActionButton>
            }
            errorFeedback={<ErrorFeedback />}
          />
        </div>
      }
    />
  )
})
