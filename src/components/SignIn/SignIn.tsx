'use client'

import { Form } from '@/components/Form'
import {
  BUTTON_CLASSNAME,
  MAGIC_INPUT_CLASSNAME,
  MAGIC_LABEL_CLASSNAME,
  TEXT_LABEL_OF_TEXT_INPUT_CLASSNAME,
} from '@/style/consts'
import { FormProvider } from 'react-hook-form'
import { memo } from 'react'
import logo from '@/assets/hopeAbaLogo.png'
import { useSignIn } from './useSignIn'
import Image from 'next/image'
import { ActionButton } from '../ActionButton'
import { twMerge } from 'tailwind-merge'
import { SpinnerLoading } from '../SpinnerLoading'

export const SignIn = memo(function SignIn() {
  const {
    isError,
    error,
    handleSignIn,
    handleSubmit,
    isSubmitting,
    loading,
    signInData,
    signInForm,
  } = useSignIn()

  return (
    <div className="w-full h-full flex flex-col items-center gap-4">
      <div className="flex flex-col gap-2 items-center">
        <Image src={logo} alt="logo" height={100} width={100} />
        <h2 className=" leading-9 tracking-tight  text-xl font-bold text-gray-600 ">
          Entrar
        </h2>
      </div>

      <FormProvider {...signInForm}>
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="flex flex-col px-6 py-3 w-fit h-fit gap-6 shadow-md rounded-2xl bg-white min-w-56"
        >
          <Form.Field className="relative w-fit h-fit">
            <Form.Label
              className={twMerge(MAGIC_LABEL_CLASSNAME, 'z-10')}
              htmlFor="email"
            >
              E-mail
            </Form.Label>

            <div className="absolute right-0 bg-blue-300">
              <Form.ErrorMessage
                position="center"
                field="email"
                specificStyle="z-40 absolute -top-[0.52rem] -right-[5px] animate-pulse bg-white"
              />
            </div>
            <Form.Input
              className={twMerge(
                MAGIC_INPUT_CLASSNAME,
                ' w-56 cursor-default text-left',
              )}
              name="email"
              type="text"
            />
          </Form.Field>

          <Form.Field className="relative w-fit h-fit">
            <Form.Label
              className={twMerge(MAGIC_LABEL_CLASSNAME, 'z-10')}
              htmlFor="password"
            >
              Senha
            </Form.Label>

            <div className="absolute right-0 bg-blue-300">
              <Form.ErrorMessage
                position="center"
                field="password"
                specificStyle="z-40 absolute -top-[0.52rem] -right-[5px] animate-pulse bg-white"
              />
            </div>
            <Form.Input
              className={twMerge(
                MAGIC_INPUT_CLASSNAME,
                ' w-56 cursor-default text-left',
              )}
              name="password"
              type="password"
            />
          </Form.Field>

          <div className="flex flex-col gap-1">
            <ActionButton
              type="submit"
              disabled={isSubmitting}
              className={`flex w-full ${BUTTON_CLASSNAME}`}
            >
              {loading && <SpinnerLoading />}
              {!loading && <p>Entrar</p>}
            </ActionButton>

            {isError && (
              <Form.Label
                className={twMerge(
                  TEXT_LABEL_OF_TEXT_INPUT_CLASSNAME,
                  'text-red-500 w-56 break-all',
                )}
                htmlFor="clinicDocument"
              >
                {error}
              </Form.Label>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  )
})
