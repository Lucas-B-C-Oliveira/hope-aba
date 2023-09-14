import { ActionButton } from '@/components/ActionButton'
import { Form } from '@/components/Form'
import { Modal } from '@/components/Modal'
import { MAGIC_LABEL_CLASSNAME, TEXT_INPUT_CLASSNAME } from '@/style/consts'
import { ReactElement, memo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const TEXT_INPUT_STYLE = `block ${TEXT_INPUT_CLASSNAME}`

interface Props {
  openModalButton: ReactElement
  patchFn: (newStatus: 'cancel' | 'confirm' | 'done', obs: string) => void
}

export const AppointmentEventObservationModal = memo(
  function AppointmentEventObservationModal({
    openModalButton,
    patchFn,
  }: Props) {
    const [textAreaValue, setTextAreaValue] = useState('')

    function handleTextArea(event: any) {
      const newValue = event.target.value
      setTextAreaValue(newValue)
    }

    return (
      <Modal.Container
        noExitButton={true}
        openModalButton={openModalButton}
        staticModal={true}
        childrenThatCanSetOpenModal={
          <ActionButton
            actionFn={() => patchFn('cancel', textAreaValue)}
            classNameToMerge={`bg-emerald-600 hover:bg-emerald-500  w-24 items-center justify-center px-0`}
          >
            Confirmar
          </ActionButton>
        }
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
            </div>
          </div>
        </div>
      </Modal.Container>
    )
  },
)
