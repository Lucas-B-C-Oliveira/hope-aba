import { z } from 'zod'

const REQUIRED_ERROR_MESSAGE = 'Campo obrigatório'
const INVALID_ENUM_SELECTED = 'Selecione uma opção'

const genderSchema = z.enum(['male', 'female'], {
  errorMap: () => {
    return { message: INVALID_ENUM_SELECTED }
  },
})

const emailSchema = z
  .string({
    required_error: REQUIRED_ERROR_MESSAGE,
  })
  .email({ message: 'Digite um e-mail válido' })

const allowTherapiesSchema = z
  .array(
    z.object({
      id: z.string().optional(),
      name: z.string().optional(),
      checked: z.coerce.boolean(),
    }),
  )
  .refine((fields) => fields.some((field) => field.checked), {
    message: 'Selecione ao menos uma terapia',
  })
  .transform((field) => {
    return field
      .filter((obj) => obj.checked)
      .map((therapy) => ({ name: therapy.name, id: therapy.id }))
  })

export const patientFormSchema = z.object({
  name: z.string().nonempty({ message: REQUIRED_ERROR_MESSAGE }),
  email: emailSchema,
  document: z.string().nonempty({ message: REQUIRED_ERROR_MESSAGE }),
  gender: genderSchema,
  nationality: z.string().nonempty({ message: REQUIRED_ERROR_MESSAGE }),
  diagnostic: z.string().nonempty({ message: REQUIRED_ERROR_MESSAGE }),
  address: z.string().nonempty({ message: REQUIRED_ERROR_MESSAGE }),
  zipcode: z.string().nonempty({ message: REQUIRED_ERROR_MESSAGE }),
  responsibleName: z.string().nonempty({ message: REQUIRED_ERROR_MESSAGE }),
  responsibleDocument: z.string().nonempty({ message: REQUIRED_ERROR_MESSAGE }),
  phone: z.string().nonempty({ message: REQUIRED_ERROR_MESSAGE }),
  phoneWhatsapp: z.string().nonempty({ message: REQUIRED_ERROR_MESSAGE }),
  bornDate: z.string().nonempty({ message: REQUIRED_ERROR_MESSAGE }),
  startTreatmentAt: z.string().nonempty({ message: REQUIRED_ERROR_MESSAGE }),
  healthInsurance: z.string().optional(),
  healthInsuranceNumber: z.string().optional(),
  allowTherapies: allowTherapiesSchema,
})
