import { CSFetch } from "@/utils/api/clientFetch"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const signUpSchema = z.object({
  name: z.string().nonempty({ message: 'Esse campo não pode ficar vazio' }),
  email: z.string().nonempty({ message: 'Esse campo não pode ficar vazio' }),
  password: z.string().nonempty({ message: 'Esse campo não pode ficar vazio' }),
  confirmPassword: z.string().nonempty({ message: 'Esse campo não pode ficar vazio' }),
  clinicName: z.string().nonempty({ message: 'Esse campo não pode ficar vazio' }),
  clinicDocument: z.string().nonempty({ message: 'Esse campo não pode ficar vazio' }),
})

export type SignUpData = z.infer<typeof signUpSchema>

export function useSignUp() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    data: createAccountData,
    mutateAsync,
    status
  } = useMutation({
    mutationKey: ['post/signup'],
    mutationFn: async (data: SignUpData) => {
      try {
        const response = await CSFetch('sign-up', {
          method: "POST",
          body: JSON.stringify(data)
        })
        setLoading(false)

        return response?.data

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
    router.replace("/login")
  }

  useEffect(() => {
    if (status === 'error') {
      if (loading) {
        setLoading(false)
      }
    }
  }, [status])


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