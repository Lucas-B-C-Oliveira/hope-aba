import { SELECT_INPUT_CLASSNAME, TEXT_INPUT_CLASSNAME } from '@/style/consts'

import { v4 as uuidv4 } from 'uuid'
import { FormPatientFieldSettings, TableHeaderPatient } from './types'

export const TEXT_INPUT_STYLE = `block w-full ${TEXT_INPUT_CLASSNAME}`
export const SELECT_INPUT_STYLE = `block w-full ${SELECT_INPUT_CLASSNAME}`

export const formFields: FormPatientFieldSettings[] = [
  {
    className: TEXT_INPUT_STYLE,
    htmlFor: 'name',
    name: 'name',
    field: 'name',
    labelText: 'Nome do Paciente',
    placeholder: 'Jane Smith',
    type: 'text',
    key: uuidv4(),
  },

  {
    className: TEXT_INPUT_STYLE,
    htmlFor: 'email',
    name: 'email',
    field: 'email',
    labelText: 'E-mail',
    placeholder: 'abc@email.com',
    type: 'email',
    key: uuidv4(),
  },

  {
    className: TEXT_INPUT_STYLE,
    htmlFor: 'document',
    name: 'document',
    field: 'document',
    labelText: 'CPF do Paciente',
    placeholder: '000.000.000-00',
    type: 'text',
    key: uuidv4(),
  },

  {
    className: SELECT_INPUT_STYLE,
    htmlFor: 'gender',
    name: 'gender',
    field: 'gender',
    labelText: 'Sexo',
    placeholder: 'Selecione',
    type: 'select',
    options: [
      { key: 'male', value: 'Másculino' },
      { key: 'female', value: 'Feminino' },
    ],
    key: uuidv4(),
  },

  {
    className: TEXT_INPUT_STYLE,
    htmlFor: 'bornDate',
    name: 'bornDate',
    field: 'bornDate',
    labelText: 'Data de Nascimento',
    placeholder: 'dd/mm/aaaa',
    type: 'date',
    key: uuidv4(),
  },

  {
    className: TEXT_INPUT_STYLE,
    htmlFor: 'nationality',
    name: 'nationality',
    field: 'nationality',
    labelText: 'Nacionalidade',
    placeholder: 'Brasileira',
    type: 'text',
    key: uuidv4(),
  },
  {
    className: TEXT_INPUT_STYLE,
    htmlFor: 'diagnostic',
    name: 'diagnostic',
    field: 'diagnostic',
    labelText: 'Diagnóstico',
    placeholder: 'Autismo',
    type: 'text',
    key: uuidv4(),
  },

  {
    className: TEXT_INPUT_STYLE,
    htmlFor: 'responsibleName',
    name: 'responsibleName',
    field: 'responsibleName',
    labelText: 'Nome do Responsável',
    placeholder: 'Arthur Figueiredo',
    type: 'text',
    key: uuidv4(),
  },

  {
    className: TEXT_INPUT_STYLE,
    htmlFor: 'responsibleDocument',
    name: 'responsibleDocument',
    field: 'responsibleDocument',
    labelText: 'CPF do Responsável',
    placeholder: 'Arthur Figueiredo',
    type: 'text',
    key: uuidv4(),
  },

  {
    className: TEXT_INPUT_STYLE,
    htmlFor: 'zipcode',
    name: 'zipcode',
    field: 'zipcode',
    labelText: 'CEP',
    placeholder: '00.000-000',
    type: 'text',
    key: uuidv4(),
  },

  {
    className: TEXT_INPUT_STYLE,
    htmlFor: 'address',
    name: 'address',
    field: 'address',
    labelText: 'Endereço',
    placeholder: 'Rua + N° + Bairro + Cidade',
    type: 'text',
    key: uuidv4(),
  },

  {
    className: TEXT_INPUT_STYLE,
    htmlFor: 'phone',
    name: 'phone',
    field: 'phone',
    labelText: 'Telefone',
    placeholder: '(00) 9 0000-0000',
    type: 'text',
    key: uuidv4(),
  },

  {
    className: TEXT_INPUT_STYLE,
    htmlFor: 'phoneWhatsapp',
    name: 'phoneWhatsapp',
    field: 'phoneWhatsapp',
    labelText: 'WhatsApp',
    placeholder: '(00) 9 0000-0000',
    type: 'text',
    key: uuidv4(),
  },

  {
    className: TEXT_INPUT_STYLE,
    htmlFor: 'healthInsurance',
    name: 'healthInsurance',
    field: 'healthInsurance',
    labelText: 'Plano de Saúde',
    placeholder: 'Unimed',
    type: 'text',
    key: uuidv4(),
  },

  {
    className: TEXT_INPUT_STYLE,
    htmlFor: 'healthInsuranceNumber',
    name: 'healthInsuranceNumber',
    field: 'healthInsuranceNumber',
    labelText: 'N° do Plano de Saúde',
    placeholder: '0000000',
    type: 'text',
    key: uuidv4(),
  },

  {
    className: TEXT_INPUT_STYLE,
    htmlFor: 'startTreatmentAt',
    name: 'startTreatmentAt',
    field: 'startTreatmentAt',
    labelText: 'Início do Tratamento',
    placeholder: 'dd/mm/aaaa',
    type: 'date',
    key: uuidv4(),
  },
]

export const tableHeaders: TableHeaderPatient[] = [
  {
    key: 'name',
    value: 'Nome',
    id: uuidv4(),
  },

  {
    key: 'healthInsurance',
    value: 'Plano de Saúde',
    id: uuidv4(),
  },

  {
    key: 'diagnostic',
    value: 'Diagnóstico',
    id: uuidv4(),
  },
]
