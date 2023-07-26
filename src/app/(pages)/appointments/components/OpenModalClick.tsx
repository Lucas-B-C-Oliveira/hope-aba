'use client'
import { useRouter } from 'next/navigation'

export function OpenModalClick() {
  const router = useRouter()

  function handleClick() {
    const appointmentId = '00'
    const patientId = '00'
    const therapyId = '00'
    const professionalId = '00'
    const roomId = '00'

    router.push(
      // `/dashboard/appointmentmodal/${appointmentId}/${patientId}/${therapyId}/${professionalId}/${roomId}`,
      // `/appointmentmodal/${appointmentId}/${patientId}/${therapyId}/${professionalId}/${roomId}`,
      `/appointmentmodal?appointmentId=${appointmentId}&patientId=${patientId}&therapyId=${therapyId}&professionalId=${professionalId}&roomId=${roomId}`,
      // `/dashboard/agendamentos/appointmentmodal/${appointmentId}/${patientId}/${therapyId}/${professionalId}/${roomId}`,
    )
    // router.push(`/photo/1123123`)
  }

  return (
    <button
      onClick={handleClick}
      className="bg-red-100 text-black text-xs hover:bg-sky-600"
    >
      Open Modal
      {/* <h1 className="text-sky-400 text-sm">Photo Modal</h1> */}
    </button>
  )
}
