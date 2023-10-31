import { CSFetch } from '@/utils/api/clientFetch'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const nameSchema = z
  .string()
  .nonempty({ message: 'Esse campo não pode ficar vazio' })
const emailSchema = z
  .string()
  .nonempty({ message: 'Esse campo não pode ficar vazio' })
  .email({ message: 'Digite um e-mail válido' })
const passwordSchema = z
  .string()
  .nonempty({ message: 'Esse campo não pode ficar vazio' })
  .min(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
const confirmPasswordSchema = z
  .string()
  .nonempty({ message: 'Esse campo não pode ficar vazio' })
const clinicNameSchema = z
  .string()
  .nonempty({ message: 'Esse campo não pode ficar vazio' })
const clinicDocumentSchema = z
  .string()
  .nonempty({ message: 'Esse campo não pode ficar vazio' })

const signUpSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
    clinicName: clinicNameSchema,
    clinicDocument: clinicDocumentSchema,
  })
  .refine((fields) => fields?.password === fields?.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas precisam ser iguais',
  })

export type SignUpData = z.infer<typeof signUpSchema>

export function useSignUp() {
  const router = useRouter()

  const {
    data: createAccountData,
    mutateAsync,
    status,
    isError,
    isLoading,
    error,
  } = useMutation({
    mutationKey: ['post/signup/useSignup'],
    mutationFn: async (data: SignUpData) => {
      const response = await CSFetch<any>('sign-up', {
        method: 'POST',
        body: JSON.stringify(data),
        cache: 'no-store',
      })
      return response
    },
    cacheTime: 0,
  })

  const signUpForm = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onSubmit',
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = signUpForm

  async function handleSignUp(data: SignUpData) {
    mutateAsync(data)
  }

  function handleGoToLogin() {
    router.replace('/login')
  }

  useEffect(() => {
    if (status === 'success' && createAccountData) {
      handleGoToLogin()
    }
  }, [status])

  return {
    isError,
    error: error as any,
    loading: isLoading,
    handleGoToLogin,
    handleSignUp,
    isSubmitting,
    handleSubmit,
    signUpForm,
  }
}
