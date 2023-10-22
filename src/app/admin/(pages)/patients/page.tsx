import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { ConfirmToRemoveDataModal } from '@/components/Modals/ConfirmToRemoveDataModal'
import { Pagination } from '@/components/Pagination/Pagination'
import { tableHeaders } from '@/components/Patients'
import { PatientForm } from '@/components/Patients/PatientForm'
import { SearchData } from '@/components/SearchData'
import { FetchTherapiesData, TherapyData } from '@/types'
import { SSFetch } from '@/utils/api/serverFetch'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/24/solid'

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Patient({ searchParams }: Props) {
  const END_POINT = 'patients'
  const CREATE_KEY = 'create-patient'
  const READ_KEY = 'read-patient'
  const UPDATE_KEY = 'update-patient'
  const DELETE_KEY = 'delete-patient'

  const response = await SSFetch<FetchTherapiesData | any>(
    'therapies?active=true',
    {
      cache: 'no-cache',
    },
  )

  const therapiesData = response.data?.map((therapy: TherapyData) => ({
    id: therapy.id,
    name: therapy.name,
    checked: false,
  }))

  const patientsResponse = await SSFetch<any>(
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
              Adicionar Paciente
            </Button>
          }
          childrenThatCanSetOpenModal={
            <PatientForm
              endPoint={END_POINT}
              mutationKey={CREATE_KEY}
              titleForm="Cadastro de Paciente"
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
        editDataModal={
          <PatientForm
            endPoint={END_POINT}
            mutationKey={UPDATE_KEY}
            method="PATCH"
            queryKeys={[READ_KEY]}
            therapiesData={therapiesData}
            titleForm="Editar dados do Paciente"
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
            text="Tem certeza que deseja deletar esse paciente? (Essa ação é irreversível)"
          />
        }
        pagination={<Pagination meta={patientsResponse?.meta} />}
        data={patientsResponse?.data}
        endPoint={END_POINT}
      />
    </SearchData.Container>
  )
}
