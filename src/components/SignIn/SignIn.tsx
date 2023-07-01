'use client'

import { Form } from '@/components/Form'
import {
  BUTTON_CLASSNAME,
  TEXT_INPUT_CLASSNAME,
  TEXT_LABEL_OF_TEXT_INPUT_CLASSNAME,
} from '@/style/consts'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../Button'
import { useQuery } from '@tanstack/react-query'
import { memo, useRef } from 'react'
import { setCookie, getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { CSFetch } from '@/utils/api/clientFetch'

const signInSchema = z.object({
  email: z.string().nonempty({ message: 'Esse campo não pode ficar vazio' }),
  password: z.string().nonempty({ message: 'Esse campo não pode ficar vazio' }),
})

export type SignInData = z.infer<typeof signInSchema>

interface Props {
  queryKeys: string[]
}

function tokenDecode(token: string) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}

export const SignIn = memo(function SignIn({ queryKeys }: Props) {
  const router = useRouter()
  const signInData = useRef<undefined | SignInData>(undefined)

  const {
    data: getClinicsData,
    refetch: getClinicsDataRefetch,
    status: getClinicsDataStatus,
  } = useQuery({
    queryKey: [queryKeys[1]],
    queryFn: async () => {
      try {
        const token = getCookie('accessToken')

        if (typeof token !== 'string') {
          throw new Error('Invalid token')
        }

        const { clinicIds } = tokenDecode(token)

        const promises = clinicIds.map((clinicId: string) => {
          return CSFetch<{
            data: { id: string; name: string; document: string }
          }>(`clinics/${clinicId}`)
        })
        return await Promise.all(promises)
      } catch (error: unknown) {
        console.error('error', error)
        throw new Error(error)
      }
    },
    enabled: false,
  })

  if (getClinicsDataStatus === 'success') {
    const clinicsData = getClinicsData?.map((element: any) => {
      return element.data
    })

    setCookie('clinicsData', clinicsData)
    router.push('/dashboard')
  }

  const {
    data: signInQueryData,
    refetch: signInRefetch,
    status: signInStatus,
  } = useQuery({
    queryKey: [queryKeys[0]],
    queryFn: async () => {
      try {
        if (typeof signInData.current === 'undefined') throw new Error('')

        const response = await CSFetch<unknown>('sign-in', {
          method: 'POST',
          body: JSON.stringify(signInData.current),
        })

        if (response?.error) {
          throw new Error(response?.error)
        }

        return { ...response }
      } catch (error: unknown) {
        console.error('error', error)
        throw new Error(error)
      }
    },
    enabled: false,
  })

  if (signInStatus === 'success') {
    const { token } = signInQueryData
    const value = `Bearer ${token}`
    setCookie('accessToken', value)
    getClinicsDataRefetch()
  }

  const signInForm = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = signInForm

  function handleSignIn(data: SignInData) {
    signInData.current = data
    signInRefetch()
  }

  return (
    <section className="w-full h-full flex flex-col items-center gap-4">
      <div className="flex flex-col gap-2">
        <img
          className="h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Faça login em sua conta
        </h2>
      </div>

      <FormProvider {...signInForm}>
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="flex flex-col px-6 py-3 w-1/5 h-fit gap-6"
        >
          <Form.Field>
            <Form.Label
              className={TEXT_LABEL_OF_TEXT_INPUT_CLASSNAME}
              htmlFor="email"
            >
              E-mail
            </Form.Label>
            <Form.Input
              className={`block w-full ${TEXT_INPUT_CLASSNAME}`}
              name="email"
              type="email"
            />
            <Form.ErrorMessage field="email" />
          </Form.Field>
          <Form.Field>
            <div className="flex flex-row justify-between">
              <Form.Label
                className={TEXT_LABEL_OF_TEXT_INPUT_CLASSNAME}
                htmlFor="password"
              >
                Senha
              </Form.Label>
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500 text-sm"
              >
                Esqueceu a senha?
              </a>
            </div>
            <Form.Input
              className={TEXT_INPUT_CLASSNAME}
              name="password"
              type="password"
            />
            <Form.ErrorMessage field="password" />
          </Form.Field>
          +
          <Button
            queryKeys={queryKeys}
            type="submit"
            disabled={isSubmitting}
            className={`flex w-full ${BUTTON_CLASSNAME}`}
          >
            Entrar
          </Button>
        </form>
      </FormProvider>

      <div className="flex flex-col gap-0  items-center">
        <p className="text-center text-sm text-gray-500">
          Ainda não tem uma conta?
        </p>
        <a
          href="#"
          className="font-semibold text-sm leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Entre grátis por 7 dias
        </a>
      </div>
    </section>
  )
})
