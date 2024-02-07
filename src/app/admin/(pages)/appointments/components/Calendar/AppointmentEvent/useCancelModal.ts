import { CSFetch } from '@/utils/api/clientFetch'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Props {
  appointmentData: any
}

function returnFormatedData(appointmentData: any) {
  const professionalId = appointmentData?.professional?.id
  const roomId = appointmentData?.room?.id
  const patientId = appointmentData?.patient?.id

  return {
    professionalId,
    roomId,
    patientId,
  }
}

export function useCancelModal({ appointmentData }: Props) {
  const [textAreaValue, setTextAreaValue] = useState('')
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)

  const router = useRouter()

  const {
    data: appointmentsData,
    refetch: appointmentsRefetch,
    status: appointmentsStatus,
    error: appointmentsError,
    fetchStatus,
  } = useQuery({
    queryKey: ['get/appointments/useCancelModal'],
    queryFn: async () => {
      try {
        const { patientId, professionalId, roomId } =
          returnFormatedData(appointmentData)

        const response = await CSFetch<any>(
          `appointments?professionalId=${professionalId}&roomId=${roomId}&patientId=${patientId}`,
        )
        return response?.data
      } catch (error: unknown) {
        console.error('error', error)
      }
    },
  })

  const { mutateAsync, status } = useMutation({
    mutationKey: ['cancel/allAppointment/useCancelModal'],
    mutationFn: async (data: any) => {
      try {
        const response = await CSFetch<any>(`appointments/cancel/batch`, {
          method: 'PATCH',
          body: JSON.stringify(data),
        })

        if (response?.error) {
          throw new Error(response?.error)
        }

        return { ...response }
      } catch (error) {
        console.error(error)
      }
    },
  })

  const { mutateAsync: mutate } = useMutation({
    mutationKey: ['cancel/Appointment/useCancelModal'],
    mutationFn: async (data: any) => {
      try {
        const response = await CSFetch<any>(
          `appointments/${appointmentData?.id}/cancel`,
          {
            method: 'PATCH',
            body: JSON.stringify(data),
          },
        )

        if (response?.error) {
          throw new Error(response?.error)
        }

        return { ...response }
      } catch (error) {
        console.error(error)
      }
    },
  })

  function handleTextArea(event: any) {
    const newValue = event.target.value
    setTextAreaValue(newValue)
  }

  async function handleCancelAllAppointments() {
    if (textAreaValue.length < 5) return
    const ids = appointmentsData?.map((appointment: any) => appointment?.id)

    const data = {
      ids,
      obs: textAreaValue,
    }

    await mutateAsync(data)

    setIsPopUpOpen(false)
    router.refresh()
  }

  async function handleCancelAppointment() {
    if (textAreaValue.length < 5) return
    const data = {
      obs: textAreaValue,
    }

    await mutate(data)

    setIsPopUpOpen(false)
    router.refresh()
  }

  const numberOfRecurringAppointments = appointmentsData?.length ?? 1

  const cancelAllAppointmentText = `Cancelar TODOS os agendamentos recorrentes (${numberOfRecurringAppointments})`

  return {
    setIsPopUpOpen,
    isPopUpOpen,
    textAreaValue,
    handleTextArea,
    cancelAllAppointmentText,
    handleCancelAllAppointments,
    handleCancelAppointment,
  }
}
