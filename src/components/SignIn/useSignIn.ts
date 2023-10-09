import { CSFetch } from '@/utils/api/clientFetch'
import { tokenDecode } from '@/utils/functions/helpers'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { setCookie, getCookie } from 'cookies-next'
import {
  ACCESS_TOKEN,
  CLINICS_DATA,
  CURRENT_CLINIC_DATA_INDEX,
} from '@/utils/functions/constants'

const emailSchema = z
  .string()
  .nonempty({ message: 'Esse campo não pode ficar vazio' })
  .email({ message: 'Digite um e-mail válido' })
const passwordSchema = z
  .string()
  .nonempty({ message: 'Esse campo não pode ficar vazio' })
  .min(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })

const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export type SignInData = z.infer<typeof signInSchema>

type SignInResponse = {
  token: string
}

type GetClinicsDataResponse = {
  id: string
  name: string
  document: string
}

export function useSignIn() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const currentError = useRef(undefined)

  const {
    data: getClinicsData,
    refetch: getClinicsDataRefetch,
    status: getClinicsDataStatus,
    error: getClinicsError,
  } = useQuery({
    queryKey: ['get/useSignIn/getClinicsData'],
    queryFn: async () => {
      try {
        const token = getCookie(ACCESS_TOKEN)

        if (typeof token !== 'string') {
          throw new Error('Invalid token')
        }

        const tokenData = tokenDecode(token)

        const clinicsIds = tokenData?.clinicIds ?? []

        const promises = clinicsIds.map((clinicId: string) => {
          return CSFetch<{ data: GetClinicsDataResponse }>(
            `clinics/${clinicId}`,
          )
        })

        return await Promise.all(promises)
      } catch (error: unknown) {
        console.error('error', error)
        throw new Error(`${error}`)
      }
    },
    enabled: false,
  })

  const {
    data: signInData,
    mutateAsync: signInMutate,
    status: signInStatus,
    error: signInError,
  } = useMutation({
    mutationKey: ['post/signin'],
    mutationFn: async (data: SignInData) => {
      try {
        setLoading(true)
        const response = await CSFetch<any>('sign-in', {
          method: 'POST',
          body: JSON.stringify(data),
        })
        setLoading(false)

        return response
      } catch (error: unknown) {
        console.error('error', error)
      }
    },
  })

  const signInForm = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    mode: 'onSubmit',
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = signInForm

  async function handleSignIn(data: SignInData) {
    await signInMutate(data)
  }

  function handleGoToAppointments() {
    router.replace('/admin/appointments')
  }

  function handleGoToSignup() {
    router.replace('/signup')
  }

  useEffect(() => {
    if (signInStatus === 'error' || getClinicsDataStatus === 'error') {
      if (loading) {
        setLoading(false)
      }
    }
  }, [signInStatus, getClinicsDataStatus])

  useEffect(() => {
    if (signInStatus === 'success' && signInData && !getClinicsData) {
      const token = (signInData?.token as any) ?? ''
      const value = `Bearer ${token}`
      const tokenData = tokenDecode(token as string)
      const expDefault = tokenData?.exp ?? 1 * 60 * 60 * 24 * 15
      const expDate = new Date(expDefault * 1000)
      setCookie(ACCESS_TOKEN, value, {
        expires: expDate,
      })
      currentError.current = undefined
      getClinicsDataRefetch()
    } else if (
      getClinicsDataStatus === 'success' &&
      getClinicsData &&
      signInData
    ) {
      const token = signInData?.token ?? ''
      const tokenData = tokenDecode(token)
      const expDefault = tokenData?.exp ?? 1 * 60 * 60 * 24 * 15
      const expDate = new Date(expDefault * 1000)

      const clinicsData = getClinicsData?.map(
        (element: { data: GetClinicsDataResponse }) => element?.data,
      )
      setCookie(CLINICS_DATA, clinicsData, {
        expires: expDate,
      })
      setCookie(CURRENT_CLINIC_DATA_INDEX, 0)

      currentError.current = undefined
      handleGoToAppointments()
    } else if (getClinicsDataStatus === 'error') {
      currentError.current = getClinicsError as any
    } else if (signInStatus === 'error') {
      currentError.current = signInError as any
    }
  }, [signInData, getClinicsDataStatus])

  return {
    error: currentError.current as any,
    loading,
    handleSignIn,
    isSubmitting,
    handleSubmit,
    signInForm,
    signInData,
    handleGoToSignup,
  }
}
