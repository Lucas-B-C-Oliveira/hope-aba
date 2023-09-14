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
import { ColorRing } from 'react-loader-spinner'

export const SignIn = memo(function SignIn() {
  const {
    handleGoToSignup,
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
              {loading && (
                <ColorRing
                  visible={true}
                  height="24"
                  width="24"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={[
                    '#f29849',
                    '#bf6dd5',
                    '#db6f91',
                    '#f5a73c',
                    '#fbbc30',
                  ]}
                />
              )}
              Entrar
            </ActionButton>

            {error?.error && (
              <Form.Label
                className={twMerge(
                  TEXT_LABEL_OF_TEXT_INPUT_CLASSNAME,
                  'text-red-500 w-56 break-all',
                )}
                htmlFor="clinicDocument"
              >
                {error?.error?.message}
              </Form.Label>
            )}
          </div>
        </form>
      </FormProvider>

      <div className="flex flex-col gap-0  items-center">
        <p className="text-center text-sm text-gray-500">
          Ainda não tem uma conta?
        </p>
        <button
          onClick={handleGoToSignup}
          className="font-semibold text-sm leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Entre grátis por 7 dias
        </button>

        <button
          onClick={() => console.log('Need to implement that')}
          className="font-semibold mt-2 text-sm leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Esqueceu a senha?
        </button>
      </div>
    </div>
  )
})
