'use client'
import { Meta } from "@/types"
import { getPageValue } from "@/utils/functions/helpers"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface Props {
  meta: Meta
}


export function usePagination({ meta }: Props) {
  const [pagesArray, setPagesArray] = useState<any>([])
  const totalItems = Number(meta?.total)
  const itemsPerPage = Number(meta?.perPage)

  const pathname = usePathname()
  const currentPageValue = getPageValue(pathname)
  const currentPage = currentPageValue ? currentPageValue : 1


  useEffect(() => {
    const newTotalNumberOfPage = Math.ceil(totalItems / itemsPerPage)
    const newArray = Array.from({ length: newTotalNumberOfPage }, (_, index) => index + 1)
    setPagesArray(newArray)

  }, [meta?.total])

  return {
    pagesArray,
    currentPage
  }
}