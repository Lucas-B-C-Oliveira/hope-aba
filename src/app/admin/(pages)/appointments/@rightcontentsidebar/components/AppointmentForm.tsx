'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ReactElement, cloneElement, memo, useState } from 'react'
import { Form } from '@/components/Form'
import { twMerge } from 'tailwind-merge'
import { MAGIC_INPUT_CLASSNAME, MAGIC_LABEL_CLASSNAME } from '@/style/consts'
import { doFetch } from '@/utils/actions/action'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

const recurrenceSchema = z.enum([
  'dont_repeat',
  'weekly_for_the_whole_year',
  'weekly_for_current_month',
])

const scheduleSchema = z
  .object({
    start: z.string(),
    day: z.string(),
    end: z.string(),
  })
  .refine(
    (val) => {
      const startDate = new Date(`${val?.day}T${val?.start}:00`)
      const endDate = new Date(`${val?.day}T${val?.end}:00`)
      return startDate < endDate
    },
    {
      message: 'O valor de início tem que ser menor do que o valor de fim',
      path: ['start'],
    },
  )
  .refine(
    (val) => {
      const startDate = new Date(`${val?.day}T${val.start}:00`)
      const endDate = new Date(`${val?.day}T${val.end}:00`)
      return endDate > startDate
    },
    {
      message: 'O valor de início tem que ser menor do que o valor de fim',
      path: ['end'],
    },
  )

const appointmentSchema = z
  .object({
    patient: z.any(),
    therapy: z.object({
      name: z.string(),
      id: z.string(),
    }),
    professional: z.object({
      name: z.string(),
      id: z.string(),
    }),
    room: z.object({
      name: z.string(),
      id: z.string(),
    }),
    schedule: scheduleSchema,
    recurrence: recurrenceSchema,
  })
  .transform((fields) => {
    return {
      ...fields,
      schedule: {
        day: fields.schedule.day,
        start: fields.schedule.start,
        end: fields.schedule.end,
      },
      patient: {
        id: fields.patient.id,
        name: fields.patient.name,
      },
    }
  })
// .refine( //! => Depois que esse componente tiver os dados dos horários disponíveis do funcionário, vc tem q criar um campo nesse form invisível,
//! TODO: => que vai ser do horário disponível do profissional, e passar pra esse campo os dados, para jogar um erro pro usuário de que o horário
//! q ele selecionou, não está dentro dos horários disponíveis do profissional | Pelo menos por enquanto, no futuro será colocado no form de escolher o horario
//! TODO: Somente os horários disponíveis, ai o usuário não vai conseguir escolher um horário errado
//   (fields) => {
//     console.log('fields', fields)
//     // const startDate = new Date(`1970-01-01T${val.start}:00`)
//     // const endDate = new Date(`1970-01-01T${val.end}:00`)
//     // return startDate < endDate
//     return true
//   },
//   {
//     message: 'O valor de início tem que ser menor do que o valor de fim',
//     path: ['start'],
//   },
// )

export type AppointmentData = z.infer<typeof appointmentSchema>

interface Props {
  patients?: ReactElement
  therapy?: ReactElement
  professional?: ReactElement
  room?: ReactElement
  datePicker?: ReactElement
  timePickerStart?: ReactElement
  timePickerEnd?: ReactElement
  actionButton?: ReactElement
  errorFeedback?: ReactElement
  titleForm?: string
}

const DEFAULT_ERRORS = {
  'appointment(s)': 'Conflito de horário com outro(s) agendamento(s)',
  found: 'Profissional não encontrado',
  availability: 'Conflito de horário com disponibilidade do profissional',
}

function getLastWord(sentence: string) {
  sentence = sentence.trim()
  const words = sentence.split(' ')
  const lastWord = words[words.length - 1]
  return lastWord
}

function getErrorsMessage(defaultErrors: any, errorMessage: string) {
  const lastWord = getLastWord(errorMessage)
  const message = defaultErrors[`${lastWord}`]
  return message
}

function isEmptyObject(obj: any) {
  return Object.keys(obj)?.length === 0
}

interface Result {
  data?: {
    errors?: any
  }
}

export const AppointmentForm = memo(function AppointmentForm({
  patients,
  professional,
  room,
  therapy,
  titleForm,
  actionButton,
  errorFeedback,
  timePickerStart,
  timePickerEnd,
  datePicker,
}: Props) {
  const router = useRouter()

  const createAppointmentForm = useForm<AppointmentData>({
    resolver: zodResolver(appointmentSchema),
  })

  const [feedbackErrors, setFeedbackErrors] = useState<[] | string[][]>([])

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createAppointmentForm

  async function schedule(data: AppointmentData) {
    // console.log('data', data)
    const result = (await doFetch('appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    })) as Result

    const errors = result?.data?.errors || {}

    // const errors = (result && result?.data && result?.data?.errors) || {}

    console.log('errors', errors)
    console.log('!isEmptyObject(errors)', !isEmptyObject(errors))

    if (!isEmptyObject(errors)) {
      const translatedErrors = Object.entries(errors).map(([date, message]) => [
        date,
        getErrorsMessage(DEFAULT_ERRORS, message as string),
      ])

      console.log('translatedErrors', translatedErrors)
      setFeedbackErrors(translatedErrors)
    }
    //! TODO: Se não tiver erro => Chamar um popup de sucesso e fechar o modal de agendamento

    console.log('AppointmentForm Resultado do agendamento => result', result)

    toast.success('Agendamento criado com sucesso!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      onClose: () => router.refresh(),
    })

    // refetch()
  }

  return (
    <FormProvider {...createAppointmentForm}>
      <form
        onSubmit={handleSubmit(schedule)}
        className="flex flex-col gap-5 p-6"
      >
        <h2 className="text-left text-xl font-bold tracking-tight text-gray-600">
          {titleForm}
        </h2>

        <div className="flex flex-col items-start gap-4">
          {patients &&
            cloneElement(patients, {
              name: 'patient',
            })}
          {therapy &&
            cloneElement(therapy, {
              name: 'therapy',
              fieldNameToObserve: 'patient',
            })}
          {professional && cloneElement(professional)}
          {room && cloneElement(room)}

          {datePicker &&
            cloneElement(datePicker, {
              name: 'schedule.day',
              title: 'Data',
              professionalField: 'professional',
            })}

          {timePickerStart &&
            cloneElement(timePickerStart, {
              name: 'schedule.start',
              title: 'Início',
              fieldNameToObserve: 'schedule.day',
              professionalField: 'professional',
            })}

          {timePickerEnd &&
            cloneElement(timePickerEnd, {
              name: 'schedule.end',
              title: 'Fim',
              fieldDateToObserve: 'schedule.day',
              fieldStartTimeToObserve: 'schedule.start',
              professionalField: 'professional',
            })}

          <Form.Field className="relative">
            <Form.Label
              className={twMerge(MAGIC_LABEL_CLASSNAME, 'z-10')}
              htmlFor="recurrence"
            >
              Recorrência
            </Form.Label>

            <div className="absolute right-0">
              <Form.ErrorMessage
                field="recurrence"
                specificStyle="z-40 absolute -top-[0.65rem] right-0 animate-pulse bg-white"
              />
            </div>

            <Form.SelectByData
              name="recurrence"
              className={twMerge(
                MAGIC_INPUT_CLASSNAME,
                ' w-56 cursor-default text-left',
              )}
              options={[
                {
                  key: 'dont_repeat',
                  value: 'dont_repeat',
                },
                {
                  key: 'weekly_for_the_whole_year',
                  value: 'weekly_for_the_whole_year',
                },
                {
                  key: 'weekly_for_current_month',
                  value: 'weekly_for_current_month',
                },
              ]}
              placeholder="eae"
            />
          </Form.Field>
          {actionButton &&
            cloneElement(actionButton, {
              disabled: isSubmitting,
              errors: feedbackErrors?.length > 0,
            })}
          {errorFeedback &&
            cloneElement(errorFeedback, {
              errors: feedbackErrors,
            })}

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </form>
    </FormProvider>
  )
})
