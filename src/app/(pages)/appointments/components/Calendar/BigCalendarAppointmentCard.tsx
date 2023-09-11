import { ActionButton } from '@/components/ActionButton'
import { Button } from '@/components/Button'
import { Form } from '@/components/Form'
import { Modal } from '@/components/Modal'
import { MAGIC_LABEL_CLASSNAME, TEXT_INPUT_CLASSNAME } from '@/style/consts'
import { doFetch } from '@/utils/actions/action'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import { memo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const TEXT_INPUT_STYLE = `block ${TEXT_INPUT_CLASSNAME}`

interface Props {
  dataAppointment: any
}

function getStatusName(status: 'cancel' | 'confirm' | 'done') {
  if (status === 'cancel') return 'Cancelado'
  else if (status === 'confirm') return 'Confirmado'
  else return 'Realizado'
}

interface Data {
  data?: any
  status?: string
}

export const BigCalendarAppointmentCard = memo(
  function BigCalendarAppointmentCard({ dataAppointment }: Props) {
    // console.log(
    //   '🚀 ~ file: Appointment.tsx:9 ~ dataAppointment:',
    //   dataAppointment,
    // )

    const appointmentId = dataAppointment?.id

    const { data: appointmentData, refetch } = useQuery({
      queryKey: ['getAppointmentData', appointmentId],
      queryFn: async () => {
        const response = (await doFetch<Data>(
          `appointments/${appointmentId}`,
        )) as Data
        const newData = {
          ...response?.data,
          status: getStatusName(response?.data?.status),
        }
        return newData
      },
    })

    const [loading, setLoading] = useState(false)

    async function handleChangeStatus(
      newStatus: 'cancel' | 'confirm' | 'done',
    ) {
      setLoading(true)
      const result = await doFetch(
        `appointments/${appointmentData?.id}/${newStatus}`,
        {
          method: 'PATCH',
        },
      )
      setLoading(false)
      refetch()
    }

    return (
      <Modal.Container
        openModalButton={
          <div
            onClick={() => console.log('eae _ CLiquei')}
            className=" sm:flex h-full w-full"
            style={{ paddingLeft: '4px', paddingRight: '4px' }}
          >
            <a
              href="#"
              className="border-gray-100 border-2 w-full h-full  overflow-y-auto flex flex-col rounded-lg bg-yellow-300 px-2 py-1 text-xs leading-4 hover:bg-yellow-400"
            >
              <p className="font-semibold text-gray-700">
                {dataAppointment?.patientNameLabel}
              </p>
              <p className="font-semibold text-gray-700">
                {dataAppointment?.therapyNameLabel}
              </p>
            </a>
          </div>
        }
      >
        <div className="flex flex-col gap-4 h-full w-full justify-between items-start">
          <h2 className="text-left text-xl font-bold tracking-tight text-gray-600">
            Agendamento
          </h2>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-4">
              <Form.Field className="relative">
                <Form.Label
                  className={twMerge(MAGIC_LABEL_CLASSNAME, 'z-10')}
                  htmlFor={appointmentData?.patient?.id}
                >
                  Paciente
                </Form.Label>
                <input
                  id={appointmentData?.patient?.id}
                  className={TEXT_INPUT_STYLE}
                  type="text"
                  name={appointmentData?.patient?.id}
                  disabled={true}
                  value={appointmentData?.patient?.name}
                />
              </Form.Field>

              <Form.Field className="relative">
                <Form.Label
                  className={twMerge(MAGIC_LABEL_CLASSNAME, 'z-10')}
                  htmlFor={appointmentData?.professional?.id}
                >
                  Profissional
                </Form.Label>
                <input
                  id={appointmentData?.professional?.id}
                  className={TEXT_INPUT_STYLE}
                  type="text"
                  name={appointmentData?.professional?.id}
                  disabled={true}
                  value={appointmentData?.professional?.name}
                />
              </Form.Field>

              <Form.Field className="relative">
                <Form.Label
                  className={twMerge(MAGIC_LABEL_CLASSNAME, 'z-10')}
                  htmlFor={appointmentData?.therapy?.id}
                >
                  Terapia
                </Form.Label>
                <input
                  id={appointmentData?.therapy?.id}
                  className={TEXT_INPUT_STYLE}
                  type="text"
                  name={appointmentData?.therapy?.id}
                  disabled={true}
                  value={appointmentData?.therapy?.name}
                />
              </Form.Field>

              <div className="flex flex-row gap-1">
                <Form.Field className="relative">
                  <Form.Label
                    className={twMerge(MAGIC_LABEL_CLASSNAME, 'z-10')}
                    htmlFor={appointmentData?.schedule?.day}
                  >
                    Dia
                  </Form.Label>
                  <input
                    id={appointmentData?.schedule?.day}
                    className={twMerge(TEXT_INPUT_STYLE, 'w-28')}
                    type="text"
                    name={appointmentData?.schedule?.day}
                    disabled={true}
                    value={appointmentData?.schedule?.day}
                  />
                </Form.Field>

                <Form.Field className="relative">
                  <Form.Label
                    className={twMerge(MAGIC_LABEL_CLASSNAME, 'z-10')}
                    htmlFor={appointmentData?.room?.id}
                  >
                    Sala
                  </Form.Label>
                  <input
                    id={appointmentData?.room?.id}
                    className={twMerge(TEXT_INPUT_STYLE, 'w-[4.5rem]')}
                    type="text"
                    name={appointmentData?.room?.id}
                    disabled={true}
                    value={appointmentData?.room?.name}
                  />
                </Form.Field>
              </div>

              <div className="flex flex-row gap-1">
                <Form.Field className="relative">
                  <Form.Label
                    className={twMerge(MAGIC_LABEL_CLASSNAME, 'z-10')}
                    htmlFor={appointmentData?.schedule?.start}
                  >
                    Início
                  </Form.Label>
                  <input
                    id={appointmentData?.schedule?.start}
                    className={twMerge(TEXT_INPUT_STYLE, 'w-[5.75rem]')}
                    type="text"
                    name={appointmentData?.schedule?.start}
                    disabled={true}
                    value={appointmentData?.schedule?.start}
                  />
                </Form.Field>

                <Form.Field className="relative">
                  <Form.Label
                    className={twMerge(MAGIC_LABEL_CLASSNAME, 'z-10')}
                    htmlFor={appointmentData?.schedule?.end}
                  >
                    Fim
                  </Form.Label>
                  <input
                    id={appointmentData?.schedule?.end}
                    className={twMerge(TEXT_INPUT_STYLE, 'w-[5.75rem]')}
                    type="text"
                    name={appointmentData?.schedule?.end}
                    disabled={true}
                    value={appointmentData?.schedule?.end}
                  />
                </Form.Field>
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-md border-0   items-center py-2 pt-3 px-2 box-content  shadow-sm ring-1 ring-inset ring-gray-300">
              <Form.Field className="relative">
                <Form.Label
                  className={twMerge(MAGIC_LABEL_CLASSNAME, 'z-10 ')}
                  htmlFor={appointmentData?.status}
                >
                  Status
                </Form.Label>
                <input
                  id={appointmentData?.status}
                  className={twMerge(TEXT_INPUT_STYLE, 'w-28')}
                  type="text"
                  name={appointmentData?.status}
                  disabled={true}
                  value={appointmentData?.status}
                />
              </Form.Field>

              <div className="flex flex-col gap-2">
                <ActionButton
                  onClick={() => handleChangeStatus('cancel')}
                  classNameToMerge="bg-red-600 hover:bg-red-500 w-24 items-center justify-center px-0"
                >
                  {!loading && 'Cancelar'}
                  {loading && 'Loading'}
                </ActionButton>

                <ActionButton
                  onClick={() => handleChangeStatus('confirm')}
                  classNameToMerge="bg-sky-600 hover:bg-sky-500 w-24 items-center justify-center px-0"
                >
                  {!loading && 'Confirmar'}
                  {loading && 'Loading'}
                </ActionButton>

                <ActionButton
                  onClick={() => handleChangeStatus('done')}
                  classNameToMerge="bg-emerald-600 hover:bg-emerald-500 w-24 items-center justify-center px-0"
                >
                  {!loading && 'Realizado'}
                  {loading && 'Loading'}
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </Modal.Container>
    )
  },
)
