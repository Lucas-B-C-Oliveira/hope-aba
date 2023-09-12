'use client'
import { useRouter } from "next/navigation"

export function HomeComponent() {
  const router = useRouter()
  router.replace("/login")
  return (
    <>

    </>
  )


}