export function tokenDecode(token: string) {
  if (!token) {
    return null;
  }
  const currentToken = token;
  return JSON?.parse(Buffer?.from(currentToken?.split('.')[1], 'base64').toString())
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
