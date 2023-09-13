import { memo } from 'react'

export const BigCalendarFilterView = memo(function BigCalendarFilterView() {
  return (
    <div className="flex h-full w-full p-[2px]">
      <div className="border-green-300  w-full h-full bg-opacity-30 overflow-y-auto flex flex-col  bg-emerald-400 px-2 py-1 text-xs leading-4 cursor-auto " />
    </div>
  )
})
