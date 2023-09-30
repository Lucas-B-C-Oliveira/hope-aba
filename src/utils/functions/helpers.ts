import { Filter } from '@/types'

export function tokenDecode(token: string | undefined | null) {
  if (!token) {
    return null
  }
  const currentToken = token
  return JSON?.parse(
    Buffer?.from(currentToken?.split('.')[1], 'base64').toString(),
  )
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function makeQuery(
  queryKey: string,
  value: Filter | Filter[] | undefined,
) {
  if (Array.isArray(value) && value.length > 0) {
    const ids = value.map((val: { id: string; name: string }) => val?.id)
    const values = ids.join(',')
    return `&${queryKey}=${values}`
  } else if (!Array.isArray(value) && typeof value?.id === 'string') {
    return `&${queryKey}=${value?.id}`
  }
  return `__`
}

export function makeQueryByArray(
  queryKey: string,
  value: string[] | undefined,
) {
  if (Array.isArray(value) && value.length > 0) {
    const ids = value.map((val: string) => val)
    const values = ids.join(',')
    return `&${queryKey}=${values}`
  }

  return `__`
}

export function removeSpacesOfString(query: string) {
  return query.replace(/__/g, '')
}

export function removeFirstCharacter(query: string) {
  return query.substring(1)
}
