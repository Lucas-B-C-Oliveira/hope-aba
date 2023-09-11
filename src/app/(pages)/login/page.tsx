import { SignIn } from '@/components/SignIn/SignIn'

export default async function Login() {
  return (
    <div className="flex h-full w-full bg-inherit p-20">
      <SignIn queryKeys={['signIn', 'getClinicsData']} />
    </div>
  )
}
