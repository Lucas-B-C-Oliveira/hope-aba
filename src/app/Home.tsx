'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function HomeComponent() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      router.replace('/login')
    }
  }, [])

  return <></>
}
