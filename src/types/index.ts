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
