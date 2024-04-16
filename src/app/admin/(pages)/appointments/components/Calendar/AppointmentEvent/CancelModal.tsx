import { ActionButton } from '@/components/ActionButton'
import { Form } from '@/components/Form'
import { Modal } from '@/components/Modal'
import { Content } from '@/components/Modal/Content'
import { MAGIC_LABEL_CLASSNAME, TEXT_INPUT_CLASSNAME } from '@/style/consts'
import { ReactElement, cloneElement, memo } from 'react'
import { twMerge } from 'tailwind-merge'
import { useCancelModal } from './useCancelModal'

export const TEXT_INPUT_STYLE = `block ${TEXT_INPUT_CLASSNAME}`

interface Props {
  openModalButton: ReactElement
  appointmentData: any
}

export const CancelModal = memo(function CancelModal({
  openModalButton,
  appointmentData,
}: Props) {
  const {
    handleTextArea,
    isPopUpOpen,
    setIsPopUpOpen,
    textAreaValue,
    cancelAllAppointmentText,
    handleCancelAllAppointments,
    handleCancelAppointment,
  } = useCancelModal({ appointmentData })

  return (
    <>
      {cloneElement(openModalButton, {
        onClick: () => setIsPopUpOpen(true),
      })}

      <Content
        open={isPopUpOpen}
        setOpen={setIsPopUpOpen}
        noExitButton={false}
        staticModal={true}
      >
        <div className="flex flex-col gap-4 h-full w-full justify-between items-start">
          <h2 className="text-left text-xl font-bold tracking-tight text-gray-600">
            Motivo do Cancelamento
          </h2>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-4">
              <Form.Field className="relative">
                <Form.Label
                  className={twMerge(MAGIC_LABEL_CLASSNAME, 'z-10')}
                  htmlFor={'obs'}
                >
                  Observação
                </Form.Label>
                <textarea
                  onChange={handleTextArea}
                  value={textAreaValue}
                  id={'obs'}
                  className={twMerge(
                    TEXT_INPUT_STYLE,
                    'min-h-40 h-40 w-52 max-h-[300px]',
                  )}
                  name={'obs'}
                />
              </Form.Field>

              <div className="flex flex-col gap-3">
                <ActionButton
                  actionFn={handleCancelAppointment}
                  classNameToMerge={`bg-red-600 hover:bg-red-500  w-fit items-center justify-center `}
                >
                  Cancelar APENAS ESSE agendamento (1)
                </ActionButton>

                <ActionButton
                  actionFn={handleCancelAllAppointments}
                  classNameToMerge={`bg-red-600 hover:bg-red-500  w-fit items-center justify-center `}
                >
                  {cancelAllAppointmentText}
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </>
  )
})
