//  //! TODO: Depois, defina os selections com esse modelo

import { z } from 'zod'

import { getCookie } from 'cookies-next'
import { weekdayKeys } from './'

const hourRanges = z
  .object({
    start: z.string().optional(),
    end: z.string().optional(),
  })
  .refine(
    (val) => {
      const startDate = new Date(`1970-01-01T${val.start}:00`)
      const endDate = new Date(`1970-01-01T${val.end}:00`)
      return startDate < endDate
    },
    {
      message: 'O valor de início tem que ser menor do que o valor de fim',
      path: ['start'],
    },
  )
  .refine(
    (val) => {
      const startDate = new Date(`1970-01-01T${val.start}:00`)
      const endDate = new Date(`1970-01-01T${val.end}:00`)
      return endDate > startDate
    },
    {
      message: 'O valor de início tem que ser menor do que o valor de fim',
      path: ['end'],
    },
  )

// export type Days =
//   | 'monday'
//   | 'tuesday'
//   | 'wednesday'
//   | 'thursday'
//   | 'friday'
//   | 'saturday'
//   | 'sunday'
// type ProfessionalScheduleAvailabilityInput = {
//   [Key in Days]: {
//     start: string
//     end: string
//   }[]
// }

const REQUIRED_ERROR_MESSAGE = 'Campo obrigatório'
const INVALID_ENUM_SELECTED = 'Selecione uma opção'

const genderSchema = z.enum(['male', 'female'], {
  errorMap: () => {
    return { message: INVALID_ENUM_SELECTED }
  },
})

const nameSchema = z.string().nonempty({ message: REQUIRED_ERROR_MESSAGE })

const emailSchema = z
  .string({
    required_error: REQUIRED_ERROR_MESSAGE,
  })
  .email({ message: 'Digite um e-mail válido' })

const addressSchema = z.string().nonempty({ message: REQUIRED_ERROR_MESSAGE })

const professionSchema = z.enum(
  [
    'psychologist',
    'speechTherapist',
    'occupationalTherapist',
    'psychopedagogue',
    'pedagogue',
    'therapeuticCompanion',
    'musicTherapist',
    'psychomotorTherapist',
  ],
  {
    errorMap: () => {
      return { message: INVALID_ENUM_SELECTED }
    },
  },
)
const scholaritySchema = z.enum(
  [
    'elementarySchool',
    'highSchool',
    'technicalSchool',
    'undergraduateComplete',
    'undergraduateIncomplete',
    'graduate',
    'master',
    'doctorate',
  ],
  {
    errorMap: () => {
      return { message: INVALID_ENUM_SELECTED }
    },
  },
)

const maritalStatusSchema = z.enum(
  ['single', 'married', 'divorced', 'commonLaw'],
  {
    errorMap: () => {
      return { message: INVALID_ENUM_SELECTED }
    },
  },
)

const therapiesAttendedSchema = z
  .array(
    z.object({
      id: z.string().optional(),
      name: z.string().optional(),
      checked: z.coerce.boolean(),
    }),
  )
  .refine((fields) => fields.some((field) => field.checked), {
    message: 'Pelo menos uma terapia tem que ser selecionada',
  })
  .transform((field) => {
    return field
      .filter((obj) => obj.checked)
      .map((therapy) => ({ name: therapy.name, id: therapy.id }))
  })

const scheduleAvailabilitySchema = z
  .array(
    z.object({
      day: z.array(hourRanges),
    }),
  )
  .transform((field) => {
    const scheduleAvailabilityFixed = field.map((value, index) => {
      const keyName = weekdayKeys[index]
      const { day } = value

      const newValues = day.filter(
        (obj) => obj.start !== '00:00' && obj.end !== '00:00',
      )

      return {
        [keyName]: [...newValues],
      }
    })

    const scheduleAvailability = scheduleAvailabilityFixed.filter(
      (value) => Object.values(value)[0].length > 0,
    )

    return scheduleAvailability
  })
  .refine((field) => field.length > 0, {
    message:
      'Defina pelo menos um dia com uma faixa de horário de disponibilidade',
  })

const clinicsIdsSchema = z
  .array(z.string())
  .optional()
  .transform((field) => {
    const clinicsDataCookie = getCookie('clinicsData')
    const clinicsData =
      typeof clinicsDataCookie !== 'undefined'
        ? JSON.parse(clinicsDataCookie as string)
        : ''

    return clinicsData === '' ? [clinicsData] : [clinicsData[0].id]
  })

export const professionalFormSchema = z.object({
  name: nameSchema,
  bornDate: z.string().nonempty({ message: REQUIRED_ERROR_MESSAGE }),
  gender: genderSchema,
  email: emailSchema,
  zipcode: z.string().nonempty({ message: REQUIRED_ERROR_MESSAGE }),
  address: addressSchema,
  document: z.string().nonempty({ message: REQUIRED_ERROR_MESSAGE }),
  jobRole: z.string().nonempty({ message: REQUIRED_ERROR_MESSAGE }),
  maritalStatus: maritalStatusSchema,
  placeOfBirth: z.string().nonempty({ message: REQUIRED_ERROR_MESSAGE }),
  scholarity: scholaritySchema,
  clinicIds: clinicsIdsSchema,
  profession: professionSchema,
  therapiesAttended: therapiesAttendedSchema,
  scheduleAvailability: scheduleAvailabilitySchema,
})
// .transform((fields) => {
//   // const scheduleAvailabilityOld = fields.scheduleAvailability

//   // const scheduleAvailabilityFixed = scheduleAvailabilityOld.map(
//   //   (value, index) => {
//   //     const keyName = weekdayKeys[index]
//   //     const { day } = value

//   //     const newValues = day.filter(
//   //       (obj) => obj.start !== '00:00' && obj.end !== '00:00',
//   //     )

//   //     return {
//   //       [keyName]: [...newValues],
//   //     }
//   //   },
//   // )

//   // const scheduleAvailability = scheduleAvailabilityFixed.filter(
//   //   (value) => Object.values(value)[0].length > 0,
//   // )

//   // const therapiesAttendedOld = fields.therapiesAttended

//   // const therapiesAttended = therapiesAttendedOld
//   //   .filter((obj) => obj.checked)
//   //   .map((therapy) => ({ name: therapy.name, id: therapy.id }))

//   // console.log('bornDate', fields.bornDate)
//   // console.log('typeof bornDate', typeof fields.bornDate)

//   console.log('fields', fields)

//   return fields
// })
// .refine((fields) => fields.scheduleAvailability.length > 0, {
//   message:
//     'Defina pelo menos um dia com uma faixa de horário de disponibilidade',
// })
