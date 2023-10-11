'use client'

import { usePaginationItem } from "./usePagionationItem"

interface Props {
  isSelected: boolean
  newPage: number
}

export function PaginationItem({ isSelected, newPage }: Props) {

  const { handleClick } = usePaginationItem({ isSelected, newPage })

  return (
    <button
      disabled={isSelected}
      className={`text-sm text-white font-bold  h-6 w-6 text-center flex items-center justify-center ${isSelected ? 'bg-indigo-600 rounded-full' : 'hover:text-indigo-400'}`}
      onClick={handleClick}
    >
      {newPage}
    </button>
  )
}