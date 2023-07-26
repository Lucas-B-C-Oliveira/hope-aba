'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ReactElement, cloneElement, memo, useRef } from 'react'
import { Form } from '@/components/Form'
import { twMerge } from 'tailwind-merge'
import { MAGIC_INPUT_CLASSNAME, MAGIC_LABEL_CLASSNAME } from '@/style/consts'
import { doFetch } from '@/utils/actions/action'
import { useRouter } from 'next/navigation'

const recurrenceSchema = z.enum([
  'dont_repeat',
  'weekly_for_the_whole_year',
  'weekly_for_current_month',
])

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
    schedule: z.object({
      day: z.string(),
      start: z.string(),
      end: z.string(),
    }),
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

export type AppointmentData = z.infer<typeof appointmentSchema>

interface Props {
  patients?: ReactElement
  therapy?: ReactElement
  professional?: ReactElement
  room?: ReactElement
  actionButton?: ReactElement
  titleForm?: string
}

export const AppointmentForm = memo(function AppointmentForm({
  patients,
  professional,
  room,
  therapy,
  titleForm,
  actionButton,
}: Props) {
  const router = useRouter()
  const createAppointmentForm = useForm<AppointmentData>({
    resolver: zodResolver(appointmentSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createAppointmentForm

  async function search(data: AppointmentData) {
    // console.log('data', data)
    const result = await doFetch('appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    // console.log('result', result)
    // refetch()
  }

  function setProfessionalData(professionalId: string) {
    // router.push(`/appointments?eae=${data.scheduleAvailability}`)
    console.log('Professional ==> professionalId', professionalId)
    router.push(`/appointments?professionalId=${professionalId}`)
  }

  return (
    <FormProvider {...createAppointmentForm}>
      <form onSubmit={handleSubmit(search)} className="flex flex-col gap-5">
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
          {professional &&
            cloneElement(professional, {
              name: 'professional',
              title: 'Profissional',
              fieldNameToObserve: 'therapy',
              setProfessionalData,
            })}
          {room &&
            cloneElement(room, {
              name: 'room',
              title: 'Salas',
              fieldNameToObserve: 'therapy',
            })}

          <Form.Field className="relative">
            <Form.Label
              className={twMerge(MAGIC_LABEL_CLASSNAME, 'z-10')}
              htmlFor="schedule.day"
            >
              Data
            </Form.Label>

            <div className="absolute right-0">
              <Form.ErrorMessage
                field="schedule.day"
                specificStyle="z-40 absolute -top-[0.65rem] right-0 animate-pulse bg-white"
              />
            </div>

            <Form.Input
              className={twMerge(
                MAGIC_INPUT_CLASSNAME,
                ' w-56 cursor-default text-left',
              )}
              type="date"
              name="schedule.day"
            />
          </Form.Field>

          <Form.Field className="relative">
            <Form.Label
              className={twMerge(MAGIC_LABEL_CLASSNAME, 'z-10')}
              htmlFor="schedule.start"
            >
              Início
            </Form.Label>

            <div className="absolute right-0">
              <Form.ErrorMessage
                field="schedule.start"
                specificStyle="z-40 absolute -top-[0.65rem] right-0 animate-pulse bg-white"
              />
            </div>

            <Form.Input
              className={twMerge(
                MAGIC_INPUT_CLASSNAME,
                ' w-56 cursor-default text-left',
              )}
              type="time"
              name="schedule.start"
            />
          </Form.Field>

          <Form.Field className="relative">
            <Form.Label
              className={twMerge(MAGIC_LABEL_CLASSNAME, 'z-10')}
              htmlFor="schedule.end"
            >
              Fim
            </Form.Label>

            <div className="absolute right-0">
              <Form.ErrorMessage
                field="schedule.end"
                specificStyle="z-40 absolute -top-[0.65rem] right-0 animate-pulse bg-white"
              />
            </div>

            <Form.Input
              className={twMerge(
                MAGIC_INPUT_CLASSNAME,
                ' w-56 cursor-default text-left',
              )}
              type="time"
              name="schedule.end"
            />
          </Form.Field>

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
            })}
        </div>
      </form>
    </FormProvider>
  )
})
