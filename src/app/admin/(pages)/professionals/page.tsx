import { ProfessionalForm } from '@/components/Professional/ProfessionalForm'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { SearchData } from '@/components/SearchData'
import { FetchTherapiesData, TherapyData } from '@/types'
import { SSFetch } from '@/utils/api/serverFetch'
import { PlusIcon } from '@heroicons/react/24/solid'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import { redirect } from 'next/navigation'
import { ConfirmToRemoveDataModal } from '@/components/Modals/ConfirmToRemoveDataModal'
import { PROFESSIONAL_OPTIONS, tableHeaders } from '@/components/Professional'
import { Pagination } from '@/components/Pagination/Pagination'

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Professionals({ searchParams }: Props) {
  const END_POINT = 'professionals'
  const CREATE_KEY = 'create-professional'
  const READ_KEY = 'read-professional'
  const UPDATE_KEY = 'update-professional'
  const DELETE_KEY = 'delete-professional'

  const response = await SSFetch<FetchTherapiesData | any>(
    'therapies?active=true',
    {
      cache: 'no-cache',
    },
  )

  if (response?.error) {
    redirect('/')
  }

  const therapiesData = response.data?.map((therapy: TherapyData) => ({
    id: therapy.id,
    name: therapy.name,
    checked: false,
  }))

  const professionalsResponse = await SSFetch<any>(
    `${END_POINT}?search=${searchParams?.search}&page=${
      searchParams?.page ?? 1
    }`,
  )

  return (
    <SearchData.Container>
      <div className="flex flex-row h-fit w-full justify-between">
        <SearchData.Filters />

        <Modal.Container
          openModalButton={
            <Button>
              <PlusIcon
                className="pointer-events-none h-full w-5 text-white"
                aria-hidden="true"
              />
              Adicionar Profissional
            </Button>
          }
          childrenThatCanSetOpenModal={
            <ProfessionalForm
              endPoint={END_POINT}
              mutationKey={CREATE_KEY}
              titleForm="Cadastro de Profissional"
              queryKeys={[READ_KEY]}
              method="POST"
              therapiesData={therapiesData}
              ActionButton={
                <Button type="submit">
                  <PlusIcon
                    className="pointer-events-none h-full w-5 text-white"
                    aria-hidden="true"
                  />
                  Cadastrar
                </Button>
              }
            />
          }
        />
      </div>

      <SearchData.Table
        tableHeaders={tableHeaders}
        dataOptions={PROFESSIONAL_OPTIONS}
        editDataModal={
          <ProfessionalForm
            endPoint={END_POINT}
            mutationKey={UPDATE_KEY}
            method="PATCH"
            queryKeys={[READ_KEY]}
            therapiesData={therapiesData}
            titleForm="Editar dados do Profissional"
            ActionButton={
              <Button type="submit">
                <ArrowUpCircleIcon
                  className="pointer-events-none h-full w-5 text-white"
                  aria-hidden="true"
                />
                Salvar Alterações
              </Button>
            }
          />
        }
        confirmRemoveDataModal={
          <ConfirmToRemoveDataModal
            mutationKey={DELETE_KEY}
            queryKeys={[READ_KEY]}
            title="Deletar Cadastro"
            text="Tem certeza que deseja deletar esse cadastro? (Essa ação é irreversível"
          />
        }
        pagination={<Pagination meta={professionalsResponse?.meta} />}
        data={professionalsResponse?.data}
        endPoint={END_POINT}
      />
    </SearchData.Container>
  )
}
