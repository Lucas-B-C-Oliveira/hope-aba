import { v4 as uuidv4 } from 'uuid'
import { FormFieldRoomSettings } from './types'
import { TEXT_INPUT_STYLE } from '../Professional'

export const formFields: FormFieldRoomSettings[] = [
  {
    className: TEXT_INPUT_STYLE,
    htmlFor: 'name',
    name: 'name',
    field: 'name',
    labelText: 'Nome da Sala',
    placeholder: 'Sala 1',
    type: 'text',
    key: uuidv4(),
  },

  {
    className: TEXT_INPUT_STYLE,
    htmlFor: 'active',
    name: 'active',
    field: 'active',
    labelText: 'Pronta para atendimento',
    placeholder: '',
    type: 'checkbox',
    key: uuidv4(),
  },
]

export const tableHeaders = [
  {
    key: 'name',
    value: 'Nome',
    id: uuidv4(),
  },

  {
    key: 'therapiesAttended',
    value: 'Terapias',
    id: uuidv4(),
  },

  {
    key: 'active',
    value: 'Pronta para atendimento',
    id: uuidv4(),
  },
]
