import { ProfessionalForm } from '@/components/Professional/ProfessionalForm'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { SearchData } from '@/components/SearchData'
import { TherapyData } from '@/types'
import { SSFetch } from '@/utils/api/serverFetch'
import { PlusIcon } from '@heroicons/react/24/solid'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import { redirect } from 'next/navigation'
import { ConfirmToRemoveDataModal } from '@/components/Modals/ConfirmToRemoveDataModal'

type FetchTherapiesData = {
  data: TherapyData[]
  meta?: {
    page?: number
    perPage?: number
    total?: number
  }
}

export default async function Professionals() {
  const END_POINT = 'professionals'

  const CREATE_PROFESSIONAL_KEY = 'create-professional'
  const READ_PROFESSIONAL_KEY = 'read-professional'
  const UPDATE_PROFESSIONAL_KEY = 'update-professional'
  const DELETE_PROFESSIONAL_KEY = 'delete-professional'

  const response = await SSFetch<FetchTherapiesData | any>(
    'therapies?active=true',
  )

  if (response?.error) {
    redirect('/')
  }

  const therapiesData = response.data?.map((therapy: TherapyData) => ({
    id: therapy.id,
    name: therapy.name,
    checked: false,
  }))

  return (
    <div className="">
      <h1>Profissionais</h1>
      <SearchData.Container>
        <div className="flex flex-row h-fit w-full justify-between">
          <SearchData.Filters
            endPoint={END_POINT}
            queryKey={READ_PROFESSIONAL_KEY}
          />

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
                mutationKey={CREATE_PROFESSIONAL_KEY}
                titleForm="Cadastro de Profissional"
                queryKeys={[READ_PROFESSIONAL_KEY]}
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
          editDataModal={
            <ProfessionalForm
              endPoint={END_POINT}
              mutationKey={UPDATE_PROFESSIONAL_KEY}
              method="PATCH"
              queryKeys={[READ_PROFESSIONAL_KEY]}
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
              mutationKey={DELETE_PROFESSIONAL_KEY}
              queryKeys={[READ_PROFESSIONAL_KEY]}
              title="Deletar Cadastro"
              text="Tem certeza que deseja deletar esse cadastro? (Essa ação não pode ser revertida)"
            />
          }
          queryKey={READ_PROFESSIONAL_KEY}
          endPoint="professionals"
        />
      </SearchData.Container>
    </div>
  )
}
