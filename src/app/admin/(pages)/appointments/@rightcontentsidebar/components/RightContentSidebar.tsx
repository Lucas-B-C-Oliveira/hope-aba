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
import { SelectOptionsByFetch } from '@/components/Form/SelectOptionsByFetch'
import { useSelectOptionsByFetch } from '@/components/Form/useSelectOptionsByFetch'
import { Filter, FilterKey } from '@/types'
import { useAppointmentFilterStore } from '@/store/appointmentFilterStore'

export const RightContentSidebar = memo(function RightContentSidebar() {
  const { rightContentSidebarIsOpen } = useMainLayoutStore()
  const { addFilter } = useAppointmentFilterStore()

  const [contentHeight, setContentHeight] = useState('0rem')
  const [startComponent, setStartComponent] = useState(false)

  useEffect(() => {
    if (window && startComponent) {
      const main = document.getElementById('main')
      const mainRef = main?.getBoundingClientRect()

      if (mainRef?.height) {
        const newContentHeight = `${mainRef?.height - 8}px`
        setContentHeight(newContentHeight)
      }
    }
  }, [startComponent])

  useEffect(() => {
    setStartComponent(true)
  }, [])

  const usePatientLogic = () => useAutocompleteLogic('patients', 'patient')

  function setProfessionalData(professionalData: Filter) {
    const key: FilterKey = 'professionalAvailable'
    addFilter(key, professionalData)
  }

  const useSelectOptionsByFetchProfessionalLogic = () =>
    useSelectOptionsByFetch({
      currentFieldName: 'professional',
      endpointToFetch: 'professionals',
      mainFieldNameToObserve: 'therapy',
      firstFieldNameToObserveToCleanFormData: 'patient',
      setProfessionalData,
    })

  const useSelectOptionsByFetchRoomlLogic = () =>
    useSelectOptionsByFetch({
      currentFieldName: 'room',
      endpointToFetch: 'rooms',
      mainFieldNameToObserve: 'therapy',
      firstFieldNameToObserveToCleanFormData: 'patient',
      setProfessionalData,
    })

  return (
    <ContentSidebarContainer
      isOpen={rightContentSidebarIsOpen}
      content={
        <div
          style={{
            maxHeight: contentHeight,
          }}
          className={`h-full overflow-y-auto py-2 `}
        >
          <AppointmentForm
            titleForm="Cadastrar Agendamento"
            patients={
              <AutocompleteFilter
                useAutocompleteLogic={usePatientLogic}
                labelText="Paciente"
              />
            }
            therapy={<Form.SelectByFormData />}
            professional={
              <SelectOptionsByFetch
                labelText="Profissional"
                useLogic={useSelectOptionsByFetchProfessionalLogic}
              />
            }
            room={
              <SelectOptionsByFetch
                labelText="Sala"
                useLogic={useSelectOptionsByFetchRoomlLogic}
              />
            }
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
