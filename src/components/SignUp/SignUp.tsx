'use client'

import { Form } from '@/components/Form'
import {
  BUTTON_CLASSNAME,
  TEXT_INPUT_CLASSNAME,
  TEXT_LABEL_OF_TEXT_INPUT_CLASSNAME,
} from '@/style/consts'
import { FormProvider } from 'react-hook-form'
import { memo } from 'react'
import { ActionButton } from '../ActionButton'
import logo from '@/assets/hopeAbaLogo.png'
import Image from 'next/image'
import { useSignUp } from './useSignUp'

export const SignUp = memo(function SignUp() {

  const { handleGoToLogin, handleSignUp, handleSubmit, isSubmitting, signUpForm } = useSignUp()

  return (
    <div className="w-full h-full flex flex-col items-center gap-4">
      <div className="flex flex-col gap-2 items-center">
        <Image src={logo} alt="logo" height={100} width={100} />
        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Crie uma conta
        </h2>
      </div>

      <FormProvider {...signUpForm}>
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="flex flex-col px-6 py-3 w-1/5 h-fit gap-6"
        >
          <Form.Field>
            <Form.Label
              className={TEXT_LABEL_OF_TEXT_INPUT_CLASSNAME}
              htmlFor="name"
            >
              Nome
            </Form.Label>
            <Form.Input
              className={`block w-full ${TEXT_INPUT_CLASSNAME}`}
              name="name"
              type="text"
            />
            <Form.ErrorMessage field="name" />
          </Form.Field>

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
            <Form.Label
              className={TEXT_LABEL_OF_TEXT_INPUT_CLASSNAME}
              htmlFor="password"
            >
              Senha
            </Form.Label>

            <Form.Input
              className={TEXT_INPUT_CLASSNAME}
              name="password"
              type="password"
            />
            <Form.ErrorMessage field="password" />
          </Form.Field>

          <Form.Field>
            <Form.Label
              className={TEXT_LABEL_OF_TEXT_INPUT_CLASSNAME}
              htmlFor="confirmPassword"
            >
              Confirme a senha
            </Form.Label>

            <Form.Input
              className={TEXT_INPUT_CLASSNAME}
              name="confirmPassword"
              type="password"
            />
            <Form.ErrorMessage field="confirmPassword" />
          </Form.Field>

          <Form.Field>
            <Form.Label
              className={TEXT_LABEL_OF_TEXT_INPUT_CLASSNAME}
              htmlFor="clinicName"
            >
              Nome da Clínica
            </Form.Label>

            <Form.Input
              className={TEXT_INPUT_CLASSNAME}
              name="clinicName"
              type="text"
            />
            <Form.ErrorMessage field="clinicName" />
          </Form.Field>

          <Form.Field>
            <Form.Label
              className={TEXT_LABEL_OF_TEXT_INPUT_CLASSNAME}
              htmlFor="clinicDocument"
            >
              Documento da Clínica
            </Form.Label>

            <Form.Input
              className={TEXT_INPUT_CLASSNAME}
              name="clinicDocument"
              type="text"
            />
            <Form.ErrorMessage field="clinicDocument" />
          </Form.Field>

          <ActionButton
            type="submit"
            disabled={isSubmitting}
            className={`flex w-full ${BUTTON_CLASSNAME}`}
          >
            Cadastrar
          </ActionButton>
        </form>
      </FormProvider>

      <div className="flex flex-col gap-0  items-center">
        <p className="text-center text-sm text-gray-500">
          Já tem cadastro?
        </p>
        <button
          onClick={handleGoToLogin}
          className="font-semibold text-sm leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Faça Login
        </button>
      </div>
    </div>
  )
})
