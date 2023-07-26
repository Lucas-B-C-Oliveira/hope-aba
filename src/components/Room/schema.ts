import { z } from 'zod'

const REQUIRED_ERROR_MESSAGE = 'Campo obrigatório'

const therapiesAttendedSchema = z
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

export const roomFormSchema = z.object({
  name: z.string().nonempty({ message: REQUIRED_ERROR_MESSAGE }),
  active: z.boolean({
    errorMap: () => {
      return { message: REQUIRED_ERROR_MESSAGE }
    },
  }),
  therapiesAttended: therapiesAttendedSchema,
})
