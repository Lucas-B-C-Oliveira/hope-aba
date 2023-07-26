'use client'
import { Transition } from '@headlessui/react'
import { Fragment, memo, useEffect, useState } from 'react'
import { AppointmentForm } from './Form/AppointmentForm'
import { Form } from '@/components/Form'
import { ActionButton } from '@/components/ActionButton'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { XMarkIcon } from '@heroicons/react/24/solid'

export const RightContentSidebar = memo(function RightContentSidebar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // isFirstRender.current = false
    setOpen(true)
  }, [])

  return (
    <Transition
      show={open}
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      afterLeave={() => router.back()}
    >
      <div
        // style={{ backgroundColor: '#f9fafc' }}

        className={`
                    pointer-events-auto transform  h-full rounded-2xl bg-white p-6 text-left shadow-xl transition-all w-fit 
                `}
      >
        <button
          className="absolute top-2 left-2"
          onClick={() => setOpen(false)}
        >
          <XMarkIcon className="w-6 h-6 text-pink-400 hover:text-pink-300" />
        </button>

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
        />
      </div>
    </Transition>
  )
})
