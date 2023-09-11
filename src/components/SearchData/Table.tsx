'use client'

import { CHECKBOX_INPUT_CLASSNAME } from '@/style/consts'
import { useQuery } from '@tanstack/react-query'
import { ReactElement, cloneElement, memo } from 'react'
import { Button } from '../Button'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/20/solid'
import { Modal } from '../Modal'

interface Props {
  queryKey: string
  endPoint: string
  editDataModal: ReactElement
  confirmRemoveDataModal: ReactElement
  tableHeaders: { key: string; value: string; id: string }[]
}

export const Table = memo(function Table({
  queryKey,
  endPoint,
  editDataModal,
  confirmRemoveDataModal,
  tableHeaders,
}: Props) {
  //! TODO: No futuro, tem que definir bem esse Table, se ele é genérico ou não, pq nesse caso, ele não está sendo genérico, está?

  //! TODO: Fazer um estado de loading para a table? Talvez?
  const { data } = useQuery<{ data: any[] }>({
    queryKey: [queryKey],
  })

  return (
    <div className="w-full h-fit">
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            {/* <tr className="divide-x divide-gray-200"> */}
            <tr>
              <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                {/* //! TODO: No futuro, implementar a funcionalidade de editar, ou apagar vários registros ao mesmo tempo, dando utilidade
                    //! a esse checkbox
                    //! OBS: Trocar os inputs pelos Form.Input, usar os nossos componentes,  */}
                <input
                  type="checkbox"
                  className={`absolute left-4 top-1/2 -mt-2 h-4 w-4 ${CHECKBOX_INPUT_CLASSNAME}`}
                />
                {/* 
//! TODO: Check this out => isso estava dentro do input
                    ref={checkbox}
                    checked={checked}
                    onChange={toggleAll} */}
              </th>

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
          <tbody className="divide-y divide-gray-200 bg-white">
            {typeof data?.data !== 'undefined' &&
              data?.data?.length > 0 &&
              data?.data?.map((register: any) => (
                <tr
                  className="divide-x divide-gray-200 even:bg-gray-50 "
                  key={register.id}
                >
                  <td scope="col" className="relative px-7 sm:w-12 sm:px-6">
                    <input
                      type="checkbox"
                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </td>

                  {tableHeaders.length > 0 &&
                    tableHeaders.map((header) => {
                      const value = register[header?.key]

                      if (typeof value !== 'object') {
                        return (
                          <td
                            key={header.id + register.id}
                            className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 "
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
                          className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 "
                        >
                          {valuesList}
                        </td>
                      )
                    })}

                  <td className="relative items-center gap-3 flex flex-row  whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
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
      </div>
    </div>
  )
})
