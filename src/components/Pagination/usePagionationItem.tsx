'use client'
import { hasParamsInUrl, removeSearchParam } from "@/utils/functions/helpers"
import { useRouter, usePathname } from "next/navigation"

interface Props {
  isSelected: boolean
  newPage: number
}


export function usePaginationItem({ isSelected, newPage }: Props) {

  const router = useRouter()
  const pathname = usePathname()

  function handleClick() {
    if (!isSelected) {

      const hasParamOnUrl = hasParamsInUrl(pathname)
      let newUrl = ''

      if (hasParamOnUrl) {
        const urlWithoutSearch = removeSearchParam(pathname)
        newUrl = `${urlWithoutSearch}&page=${newPage}`
      }
      else {
        newUrl = `${pathname}?page=${newPage}`
      }

      console.log('newUrl', newUrl)
      router.push(newUrl)
    }
  }

  return {
    handleClick,
  }
}