'use client'
import { useRouter } from "next/navigation"

export function HomeComponent() {
  const router = useRouter()
  return (
    <>
      <button
        className="bg-red-400 text-blue-700 w-fit h-fit"
        onClick={() => {
          router.replace("/login")
        }}

      >Login</button>
    </>
  )


}