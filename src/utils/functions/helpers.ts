export function tokenDecode(token: string) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
