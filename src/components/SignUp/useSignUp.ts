import { CSFetch } from '@/utils/api/clientFetch'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    data: createAccountData,
    mutateAsync,
    status,
  } = useMutation({
    mutationKey: ['post/signup'],
    mutationFn: async (data: SignUpData) => {
      try {
        setLoading(true)
        const response = await CSFetch<any>('sign-up', {
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

  const signUpForm = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onSubmit',
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = signUpForm

  async function handleSignUp(data: SignUpData) {
    await mutateAsync(data)
  }

  function handleGoToLogin() {
    router.replace('/login')
  }

  useEffect(() => {
    if (status === 'error') {
      if (loading) {
        setLoading(false)
      }
    }
  }, [status])

  useEffect(() => {
    if (status === 'success' && createAccountData) {
      handleGoToLogin()
    }
  }, [createAccountData])

  return {
    loading,
    handleGoToLogin,
    handleSignUp,
    isSubmitting,
    handleSubmit,
    signUpForm,
    createAccountData,
  }
}
