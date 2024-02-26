'use client'

import { CHECKBOX_INPUT_CLASSNAME } from '@/style/consts'
import { ReactElement, cloneElement, memo } from 'react'
import { Button } from '../Button'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/20/solid'
import { Modal } from '../Modal'

interface Props {
  endPoint: string
  data: any[]
  editDataModal: ReactElement
  confirmRemoveDataModal: ReactElement
  pagination: ReactElement
  tableHeaders: { key: string; value: string; id: string }[]
  dataOptions?: any[]
}

export const Table = memo(function Table({
  data,
  endPoint,
  editDataModal,
  confirmRemoveDataModal,
  pagination,
  tableHeaders,
  dataOptions,
}: Props) {
  return (
    <div className="w-full h-fit">
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300 ">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders?.length > 0 &&
                tableHeaders.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 "
                  >
                    {header.value}
                  </th>
                ))}

              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 w-5">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white ">
            {data &&
              data?.length > 0 &&
              data?.map((register: any) => (
                <tr
                  className="divide-x divide-gray-200 even:bg-gray-50 "
                  key={register.id}
                >
                  {/* <td scope="col" className="relative px-7 sm:w-12 sm:px-6">
                    <input
                      type="checkbox"
                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </td> */}

                  {tableHeaders.length > 0 &&
                    tableHeaders.map((header) => {
                      const value = register[header?.key]

                      if (header?.key === 'profession' && dataOptions) {
                        const labelValue = dataOptions?.find(
                          (option: any) => option?.key === value,
                        )

                        return (
                          <td
                            key={header.id + register.id}
                            className=" py-4 pl-4 pr-3 text-sm font-medium text-gray-900 "
                          >
                            {labelValue?.value}
                          </td>
                        )
                      }

                      if (typeof value !== 'object') {
                        return (
                          <td
                            key={header.id + register.id}
                            className=" py-4 pl-4 pr-3 text-sm font-medium text-gray-900 "
                          >
                            {typeof value === 'boolean'
                              ? value === true
                                ? 'Sim'
                                : 'Não'
                              : value}
                          </td>
                        )
                      }

                      const valuesList = value
                        ?.map((item: any) => item.name)
                        .join(' ')

                      return (
                        <td
                          key={header.id + register.id}
                          className=" py-4 pl-4 pr-3 text-sm font-medium text-gray-900 "
                        >
                          {valuesList}
                        </td>
                      )
                    })}

                  <td className="relative items-center gap-3 flex flex-row   py-4 pl-3 pr-4 text-right text-sm font-medium">
                    <Modal.Container
                      openModalButton={
                        <Button>
                          Editar
                          <PencilSquareIcon className="text-white h-5 w-5 " />
                        </Button>
                      }
                      childrenThatCanSetOpenModal={cloneElement(editDataModal, {
                        endPoint: `${endPoint}/${register?.id}`,
                        registerData: register,
                      })}
                    />

                    <Modal.Container
                      openModalButton={
                        <Button className="">
                          <TrashIcon className="text-red-600 h-5 w-5 hover:text-red-500" />
                        </Button>
                      }
                      childrenThatCanSetOpenModal={cloneElement(
                        confirmRemoveDataModal,
                        {
                          endPoint: `${endPoint}/${register?.id}`,
                        },
                      )}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {data && data?.length > 0 && (
          <div className="flex flex-row py-1 gap-1 items-center justify-center w-full h-fit bg-gray-50 border-t border-gray-300 ">
            {pagination && pagination}
          </div>
        )}
      </div>
    </div>
  )
})
