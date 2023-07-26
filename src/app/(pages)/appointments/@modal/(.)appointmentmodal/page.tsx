import { ServerModal } from '@/components/ServerModal'
import { AppointmentForm } from '../../components/Form/AppointmentForm'
import { Form } from '@/components/Form'
import { ActionButton } from '@/components/ActionButton'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import { RightContentSidebar } from '../../components/RightContentSidebar'
// import { Transition } from '@headlessui/react'
// import { Fragment } from 'react'

export default async function AppointmentModal() {
  return (
    <RightContentSidebar />
    // <div
    //   // style={{ backgroundColor: '#f9fafc' }}

    //   className={`
    //                 pointer-events-auto transform  h-full rounded-2xl bg-white p-6 text-left shadow-2xl transition-all w-fit
    //             `}
    // >
    //   <AppointmentForm
    //     titleForm="Cadastrar Agendamento"
    //     patients={<Form.Autocomplete endPoint="patients" />}
    //     therapy={<Form.SelectByFormData />}
    //     professional={<Form.SelectFetchOptionsById endPoint="professionals" />}
    //     room={<Form.SelectFetchOptionsById endPoint="rooms" />}
    //     actionButton={
    //       <ActionButton type="submit">
    //         <ArrowUpCircleIcon
    //           className="pointer-events-none h-5 w-5 text-white"
    //           aria-hidden="true"
    //         />
    //         Cadastrar
    //       </ActionButton>
    //     }
    //   />
    // </div>

    // <ServerModal.Container>
    //   <AppointmentForm
    //     titleForm="Cadastrar Agendamento"
    //     patients={<Form.Autocomplete endPoint="patients" />}
    //     therapy={<Form.SelectByFormData />}
    //     professional={<Form.SelectFetchOptionsById endPoint="professionals" />}
    //     room={<Form.SelectFetchOptionsById endPoint="rooms" />}
    //     actionButton={
    //       <ActionButton type="submit">
    //         <ArrowUpCircleIcon
    //           className="pointer-events-none h-5 w-5 text-white"
    //           aria-hidden="true"
    //         />
    //         Cadastrar
    //       </ActionButton>
    //     }
    //   />
    // </ServerModal.Container>

    // <AppointmentForm
    //   titleForm="Cadastrar Agendamento"
    //   patients={<Form.Autocomplete endPoint="patients" />}
    //   therapy={<Form.SelectByFormData />}
    //   professional={<Form.SelectFetchOptionsById endPoint="professionals" />}
    //   room={<Form.SelectFetchOptionsById endPoint="rooms" />}
    //   actionButton={
    //     <ActionButton type="submit">
    //       <ArrowUpCircleIcon
    //         className="pointer-events-none h-5 w-5 text-white"
    //         aria-hidden="true"
    //       />
    //       Cadastrar
    //     </ActionButton>
    //   }
    // />
  )
}
