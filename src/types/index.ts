export type Person = {
  id: string
  name: string
  title: string
  email: string
}

export type Header = {
  key: keyof Person
  value: string
  id: string
}

export type TherapyData = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export type FetchTherapiesData = {
  data: TherapyData[]
  meta?: {
    page?: number
    perPage?: number
    total?: number
  }
}

export interface FormFieldSettings {
  className: string
  placeholder: string
  type: string
  htmlFor: string
  labelText: string
  key: string
  field: string
}
