import { ActionButton } from '@/components/ActionButton'
import { Form } from '@/components/Form'
import { Modal } from '@/components/Modal'
import { MAGIC_LABEL_CLASSNAME, TEXT_INPUT_CLASSNAME } from '@/style/consts'
import { doFetch } from '@/utils/actions/action'
import { useQuery } from '@tanstack/react-query'
import { memo, useCallback, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { AppointmentEvent } from './AppointmentEvent'
import { CSFetch } from '@/utils/api/clientFetch'
import { dateAdapter } from '@/utils/dateAdapter'
import { useRouter } from 'next/navigation'

export const TEXT_INPUT_STYLE = `block ${TEXT_INPUT_CLASSNAME}`

interface Props {
  dataAppointment: any
}

function getStatusName(status: 'canceled' | 'confirmed' | 'done' | 'pending') {
  if (status === 'canceled') return 'Cancelado'
  else if (status === 'confirmed') return 'Confirmado'
  else if (status === 'pending') return 'Pendente'
  else if (status === 'done') return 'Concluído'
}

function getStatusColor(status: 'canceled' | 'confirmed' | 'done' | 'pending') {
  if (status === 'canceled') return 'bg-red-600 hover:bg-red-500'
  else if (status === 'confirmed') return 'bg-sky-500 hover:bg-sky-400'
  else if (status === 'pending') return 'bg-yellow-500 hover:bg-yellow-400'
  else if (status === 'done') return 'bg-emerald-500 hover:bg-emerald-400'
}

interface Data {
  data?: any
  status?: string
}

export const BigCalendarAppointmentCard = memo(
  function BigCalendarAppointmentCard({ dataAppointment }: Props) {
    const appointmentId = dataAppointment?.id
    const appointmentStatus = dataAppointment?.status
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const router = useRouter()

    const setOpenModalCallback = useCallback(
      (newValue: boolean) => setOpenModal(newValue),
      [],
    )

    const { data: appointmentData } = useQuery({
      queryKey: ['getAppointmentData', appointmentId, appointmentStatus],
      queryFn: async () => {
        const response = (await CSFetch<Data>(
          `appointments/${appointmentId}`,
        )) as Data
        const newData = {
          ...response?.data,
          labelStatus: getStatusName(response?.data?.status),
        }
        return newData
      },
    })

    async function handleChangeStatus(
      newStatus: 'cancel' | 'confirm' | 'done',
      obs = '',
    ) {
      try {
        setLoading(true)

        const body = obs !== '' ? JSON.stringify({ obs }) : JSON.stringify({})
        await doFetch<any>(`appointments/${appointmentData?.id}/${newStatus}`, {
          method: 'PATCH',
          body,
        })

        setOpenModalCallback(false)
        router.refresh()
      } catch (error) {
        console.log('error on handleChangeStatus => ', error)
      } finally {
        setLoading(false)
      }
    }

    return (
      <>
        <AppointmentEvent.Card
          onClick={() => setOpenModalCallback(true)}
          patientNameLabel={dataAppointment?.patientNameLabel}
          therapyNameLabel={dataAppointment?.therapyNameLabel}
          status={dataAppointment?.status}
          statusLabel={getStatusName(dataAppointment?.status)}
          classNameToMerge={getStatusColor(dataAppointment?.status)}
        />

        <Modal.Content open={openModal} setOpen={setOpenModalCallback}>
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
                      value={dateAdapter(appointmentData?.schedule?.day).format(
                        'DD-MM-YYYY',
                      )}
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
                    htmlFor={appointmentData?.labelStatus}
                  >
                    Status
                  </Form.Label>
                  <input
                    id={appointmentData?.labelStatus}
                    className={twMerge(TEXT_INPUT_STYLE, 'w-28')}
                    type="text"
                    name={appointmentData?.labelStatus}
                    disabled={true}
                    value={appointmentData?.labelStatus}
                  />
                </Form.Field>

                <div className="flex flex-col gap-2">
                  <AppointmentEvent.CancelModal
                    appointmentData={dataAppointment}
                    openModalButton={
                      <ActionButton
                        disabled={
                          appointmentData?.status === 'done' ||
                          appointmentData?.status === 'canceled'
                        }
                        classNameToMerge={`${
                          appointmentData?.status === 'done' ||
                          appointmentData?.status === 'canceled'
                            ? 'bg-red-800 hover:bg-red-800'
                            : 'bg-red-600 hover:bg-red-500'
                        }  w-24 items-center justify-center px-0`}
                      >
                        {!loading && 'Cancelar'}
                        {loading && 'Loading'}
                      </ActionButton>
                    }
                  />

                  <ActionButton
                    disabled={appointmentData?.status !== 'pending'}
                    onClick={() => handleChangeStatus('confirm')}
                    classNameToMerge={`${
                      appointmentData?.status !== 'pending'
                        ? 'bg-sky-800 hover:bg-sky-800'
                        : 'bg-sky-600 hover:bg-sky-500'
                    }  w-24 items-center justify-center px-0`}
                  >
                    {!loading && 'Confirmar'}
                    {loading && 'Loading'}
                  </ActionButton>

                  <ActionButton
                    disabled={
                      appointmentData?.status !== 'confirmed' ||
                      appointmentData?.status === 'done'
                    }
                    onClick={() => handleChangeStatus('done')}
                    classNameToMerge={`${
                      appointmentData?.status !== 'confirmed' ||
                      appointmentData?.status === 'done'
                        ? 'bg-emerald-800 hover:bg-emerald-800'
                        : 'bg-emerald-500 hover:bg-emerald-400'
                    }  w-24 items-center justify-center px-0`}
                  >
                    {!loading && 'Concluir'}
                    {loading && 'Loading'}
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>
        </Modal.Content>
      </>
    )
  },
)
