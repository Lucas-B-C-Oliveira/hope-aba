import { SELECT_INPUT_CLASSNAME, TEXT_INPUT_CLASSNAME } from '@/style/consts'

import { v4 as uuidv4 } from 'uuid'
import { FormProfessionalFieldSettings, TableHeaderProfessional } from './types'

export const TEXT_INPUT_STYLE = `block w-full ${TEXT_INPUT_CLASSNAME}`
export const SELECT_INPUT_STYLE = `block w-full ${SELECT_INPUT_CLASSNAME}`

export const weekdayKeys = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

export const weekdayName = [
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sábado',
  'Domingo',
]

export const PROFESSIONAL_OPTIONS = [
  { key: 'psychologist', value: 'Psicólogo(a)' },
  { key: 'speechTherapist', value: 'Fonoaudiólogo(a)' },
  { key: 'occupationalTherapist', value: 'Terapeuta Ocupacional' },
  { key: 'psychopedagogue', value: 'Psicopedagogo(a)' },
  { key: 'pedagogue', value: 'Pedagogo(a)' },
  { key: 'therapeuticCompanion', value: 'Acompanhante Terapêutico' },
  { key: 'musicTherapist', value: 'Musicoterapeuta' },
  { key: 'psychomotorTherapist', value: 'Psicomotricista' },
  { key: 'physiotherapist', value: 'Fisioterapeuta' },
]

export const formFields: FormProfessionalFieldSettings[] = [
  {
    className: TEXT_INPUT_STYLE,
    htmlFor: 'name',
    name: 'name',
    field: 'name',
    labelText: 'Nome Completo',
    placeholder: 'Jane Smith',
    type: 'text',
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
    htmlFor: 'email',
    name: 'email',
    field: 'email',
    labelText: 'E-mail',
    placeholder: 'abc@email.com',
    type: 'email',
    key: uuidv4(),
  },

  {
    className: SELECT_INPUT_STYLE,
    htmlFor: 'profession',
    name: 'profession',
    field: 'profession',
    labelText: 'Profissão',
    placeholder: 'Selecione',
    type: 'select',
    options: PROFESSIONAL_OPTIONS,
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
    htmlFor: 'document',
    name: 'document',
    field: 'document',
    labelText: 'CPF',
    placeholder: '000.000.000-00',
    type: 'text',
    key: uuidv4(),
  },

  {
    className: TEXT_INPUT_STYLE,
    htmlFor: 'jobRole',
    name: 'jobRole',
    field: 'jobRole',
    labelText: 'Cargo',
    placeholder: 'ex: Supervisor',
    type: 'text',
    key: uuidv4(),
  },

  {
    className: SELECT_INPUT_STYLE,
    htmlFor: 'maritalStatus',
    name: 'maritalStatus',
    field: 'maritalStatus',
    labelText: 'Estado Civil',
    placeholder: 'Selecione',
    options: [
      { key: 'single', value: 'Solteiro(a)' },
      { key: 'married', value: 'Casado(a)' },
      { key: 'divorced', value: 'Divorciado(a)' },
      { key: 'commonLaw', value: 'União Estável' },
    ],
    type: 'select',
    key: uuidv4(),
  },

  {
    className: TEXT_INPUT_STYLE,
    htmlFor: 'placeOfBirth',
    name: 'placeOfBirth',
    field: 'placeOfBirth',
    labelText: 'Naturalidade',
    placeholder: 'Brasileiro(a)',
    type: 'text',
    key: uuidv4(),
  },

  {
    className: SELECT_INPUT_STYLE,
    htmlFor: 'scholarity',
    name: 'scholarity',
    field: 'scholarity',
    labelText: 'Escolaridade',
    placeholder: 'Selecione',
    options: [
      { key: 'elementarySchool', value: 'Fundamental' },
      { key: 'highSchool', value: 'Médio' },
      { key: 'technicalSchool', value: 'Técnico' },
      { key: 'undergraduateComplete', value: 'Superior Completo' },
      { key: 'undergraduateIncomplete', value: 'Superior Incompleto' },
      { key: 'graduate', value: 'Pós-graduação' },
      { key: 'master', value: 'Mestrado' },
      { key: 'doctorate', value: 'Doutorado' },
    ],
    type: 'select',
    key: uuidv4(),
  },
]

export const tableHeaders: TableHeaderProfessional[] = [
  {
    key: 'name',
    value: 'Nome',
    id: uuidv4(),
  },

  {
    key: 'profession',
    value: 'Profissão',
    id: uuidv4(),
  },

  {
    key: 'email',
    value: 'E-mail',
    id: uuidv4(),
  },
]
