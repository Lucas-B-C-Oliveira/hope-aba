import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { ConfirmToRemoveDataModal } from '@/components/Modals/ConfirmToRemoveDataModal'
import { tableHeaders } from '@/components/Room'
import { RoomForm } from '@/components/Room/RoomForm'
import { SearchData } from '@/components/SearchData'
import { FetchTherapiesData, TherapyData } from '@/types'
import { SSFetch } from '@/utils/api/serverFetch'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/24/solid'
import { redirect } from 'next/navigation'

export default async function Rooms() {
  const END_POINT = 'rooms'

  const CREATE_KEY = 'create-room'
  const READ_KEY = 'read-room'
  const UPDATE_KEY = 'update-room'
  const DELETE_KEY = 'delete-room'

  const response = await SSFetch<FetchTherapiesData | any>(
    'therapies?active=true',
  )

  if (response?.error) {
    redirect('/login')
  }

  const therapiesData = response.data?.map((therapy: TherapyData) => ({
    id: therapy.id,
    name: therapy.name,
    checked: false,
  }))

  return (
    <SearchData.Container>
      <div className="flex flex-row h-fit w-full justify-between">
        <SearchData.Filters endPoint={END_POINT} queryKey={READ_KEY} />

        <Modal.Container
          openModalButton={
            <Button>
              <PlusIcon
                className="pointer-events-none h-full w-5 text-white"
                aria-hidden="true"
              />
              Adicionar Sala
            </Button>
          }
          childrenThatCanSetOpenModal={
            <RoomForm
              endPoint={END_POINT}
              mutationKey={CREATE_KEY}
              titleForm="Cadastro de Sala"
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
          <RoomForm
            endPoint={END_POINT}
            mutationKey={UPDATE_KEY}
            method="PATCH"
            queryKeys={[READ_KEY]}
            therapiesData={therapiesData}
            titleForm="Editar dados da Sala"
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
            text="Tem certeza que deseja deletar essa sala? (Essa ação é irreversível)"
          />
        }
        queryKey={READ_KEY}
        endPoint={END_POINT}
      />
    </SearchData.Container>
  )
}
