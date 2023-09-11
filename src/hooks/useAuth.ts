import { getCookie } from 'cookies-next'

export function useAuth() {
  const accessToken = getCookie('accessToken')
  const clinicsData = getCookie('clinicsData')

  console.log('accessToken', accessToken)
  console.log('clinicsData', clinicsData)

  // const regex = /(clinics|sign-in)/
  // // const isSignOrClinicsEndPoint = String(input).match(regex)

  // // if (
  // //   (typeof accessToken === 'undefined' ||
  // //     typeof clinicsData === 'undefined') &&
  // //   !isSignOrClinicsEndPoint
  // // ) {
  // //   redirect('/login') //! TODO: O Certo é chamar um modal de login e não redirecionar -> Como chamar um modal de login aqui?
  // // }

  const authenticatedUser =
    typeof accessToken !== 'undefined' && typeof clinicsData !== 'undefined'
  return {
    authenticatedUser,
  }
}
