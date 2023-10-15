'use client'

import { Meta } from '@/types'
import { PaginationItem } from './PaginationItem'
import { usePagination } from './usePagination'

interface Props {
  meta: Meta
}

export function Pagination({ meta }: Props) {
  const { currentPage, pagesArray } = usePagination({ meta })

  return (
    <div className="flex flex-row gap-1 items-center p-1">
      {pagesArray &&
        pagesArray.length > 0 &&
        pagesArray.map((item: number) => {
          return (
            <PaginationItem
              key={item}
              newPage={item}
              isSelected={item === currentPage}
            />
          )
        })}
    </div>
  )
}
