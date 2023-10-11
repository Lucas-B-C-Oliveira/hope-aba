import { zodResolver } from "@hookform/resolvers/zod"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const searchSchema = z.object({
  search: z.string()
})

export type SearchData = z.infer<typeof searchSchema>
export function useFilters() {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const createSearchForm = useForm<SearchData>({
    resolver: zodResolver(searchSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createSearchForm

  function handleSearch(data: SearchData) {
    setLoading(true)
    const newHref = `${pathname}?search=${data?.search}`
    router.push(newHref)
    setLoading(false)
  }

  function handleSearchAll() {
    setLoading(true)
    const newHref = `${pathname}?search`
    router.push(newHref)
    setLoading(false)
  }

  return {
    loading,
    handleSearchAll,
    handleSearch,
    handleSubmit,
    createSearchForm,
    isSubmitting,
  }
}
