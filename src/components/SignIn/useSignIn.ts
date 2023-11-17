import { CSFetch } from '@/utils/api/clientFetch'
import { tokenDecode } from '@/utils/functions/helpers'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { setCookie, getCookie, deleteCookie } from 'cookies-next'
import {
  ACCESS_TOKEN,
  CLINICS_DATA,
  CURRENT_CLINIC_DATA_INDEX,
} from '@/utils/functions/constants'

const emailSchema = z
  .string()
  .nonempty({ message: 'Esse campo não pode ficar vazio' })
  .email({ message: 'Digite um e-mail válido' })
  .transform((value) => value.toLowerCase())

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

function getTranslateError(error: { message: string } | any) {
  if (
    error?.message ===
    'Invalid credentials please check your email or password is correct.'
  )
    return 'Credenciais inválidas, verifique se seu e-mail ou senha estão corretos.'
  else return error?.message
}

export function useSignIn() {
  const router = useRouter()

  const {
    data: getClinicsData,
    refetch: getClinicsDataRefetch,
    status: getClinicsDataStatus,
    error: getClinicsError,
    isFetching: isLoadingClinicsData,
    isError: isErrorClinicsData,
  } = useQuery({
    queryKey: ['get/useSignIn/getClinicsData'],
    queryFn: async () => {
      const token = getCookie(ACCESS_TOKEN)
      const tokenData = tokenDecode(token as string)
      const clinicsIds = tokenData?.clinicIds ?? []
      const promises = clinicsIds.map((clinicId: string) => {
        return CSFetch<{ data: GetClinicsDataResponse }>(
          `clinics/${clinicId}`,
          {
            cache: 'no-store',
          },
        )
      })
      return await Promise.all(promises)
    },
    cacheTime: 0,
    enabled: false,
  })

  const {
    data: signInData,
    mutateAsync: signInMutate,
    status: signInStatus,
    error: signInError,
    isLoading: isLoadingSignInData,
    isError: isErrorSignInData,
  } = useMutation({
    mutationKey: ['post/useSignin/signin'],
    mutationFn: async (data: SignInData) => {
      const response = await CSFetch<any>('sign-in', {
        method: 'POST',
        body: JSON.stringify(data),
        cache: 'no-store',
      })
      return response
    },
    cacheTime: 0,
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
    console.log('data', data)
    signInMutate(data)
  }

  function handleGoToAppointments() {
    router.replace('/admin/appointments')
  }

  function handleGoToSignup() {
    router.replace('/signup')
  }

  console.log('signInStatus', signInStatus)
  console.log('getClinicsDataStatus', getClinicsDataStatus)

  useEffect(() => {
    if (signInStatus === 'success') {
      const token = (signInData?.token as any) ?? ''
      const value = `Bearer ${token}`
      const tokenData = tokenDecode(token as string)
      const expDefault = tokenData?.exp ?? 1 * 60 * 60 * 24 * 15
      const expDate = new Date(expDefault * 1000)
      console.log('Setou o token')
      const accessToken = getCookie(ACCESS_TOKEN)
      if (typeof accessToken === 'string') {
        deleteCookie(ACCESS_TOKEN)
      }
      setCookie(ACCESS_TOKEN, value, {
        expires: expDate,
      })
      console.log('token value', value)
      getClinicsDataRefetch()
    }
  }, [signInStatus])

  useEffect(() => {
    if (getClinicsDataStatus === 'success') {
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
      handleGoToAppointments()
    }
  }, [getClinicsDataStatus])

  return {
    isError: isErrorClinicsData || isErrorSignInData,
    error: isErrorSignInData
      ? getTranslateError(signInError)
      : isErrorClinicsData
      ? getTranslateError(getClinicsError)
      : (undefined as any | undefined),
    loading: isLoadingClinicsData || isLoadingSignInData,
    handleSignIn,
    isSubmitting,
    handleSubmit,
    signInForm,
    signInData,
    handleGoToSignup,
  }
}
