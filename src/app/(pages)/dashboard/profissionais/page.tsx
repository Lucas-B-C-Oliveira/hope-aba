import { ProfessionalForm } from '@/components/Professional/ProfessionalForm'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { SearchData } from '@/components/SearchData'
import { TherapyData } from '@/types'
import { SSFetch } from '@/utils/api/serverFetch'
import { PlusIcon } from '@heroicons/react/24/solid'
import { ArrowUpIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import { redirect } from 'next/navigation'

type FetchTherapiesData = {
  data: TherapyData[]
  meta?: {
    page?: number
    perPage?: number
    total?: number
  }
}

// const therapiesName = [
//   'Fonoterapia',
//   'Aba',
//   'AVDS',
//   'Avaliação',
//   'Intervenção em Música',
//   'Musicoterapia',
//   'Neuropsicologia',
//   'Fisioterapia',
//   'Avaliação Psicológica',
//   'Psicomotricidade',
//   // 'Psicoterapia',
//   // 'Psicopedagogia',
//   // 'Integração sensorial',
//   // 'Psicomotricidade',
// ]

export default async function Professionals() {
  const END_POINT = 'professionals'
  const DELETE_AND_READ_KEY = 'delete-and-read-professionals'
  const QUERY_KEY_CREATE = 'create-professionals'
  const QUERY_KEY_DELETE = DELETE_AND_READ_KEY
  const QUERY_KEY_READ = DELETE_AND_READ_KEY
  const QUERY_KEY_UPDATE = DELETE_AND_READ_KEY

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
          <SearchData.Filters endPoint={END_POINT} queryKey={QUERY_KEY_READ} />

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
          >
            <ProfessionalForm
              endPoint={END_POINT}
              queryKey={QUERY_KEY_CREATE}
              titleForm="Cadastro de Profissional"
              method="POST"
              therapiesData={therapiesData}
              ActionButton={
                <Button type="submit" queryKeys={[QUERY_KEY_CREATE]}>
                  <PlusIcon
                    className="pointer-events-none h-full w-5 text-white"
                    aria-hidden="true"
                  />
                  Cadastrar
                </Button>
              }
            />
          </Modal.Container>
        </div>

        <SearchData.ErrorResult queryKey={QUERY_KEY_READ} />
        <SearchData.Table
          editDataModal={
            <ProfessionalForm
              endPoint={END_POINT}
              queryKey={QUERY_KEY_UPDATE}
              method="PATCH"
              therapiesData={therapiesData}
              titleForm="Editar dados do Profissional"
              ActionButton={
                <Button type="submit" queryKeys={[QUERY_KEY_READ]}>
                  <ArrowUpCircleIcon
                    className="pointer-events-none h-full w-5 text-white"
                    aria-hidden="true"
                  />
                  Salvar Alterações
                </Button>
              }
            />
          }
          queryKey={QUERY_KEY_DELETE}
          endPoint="professionals"
          titleToConfirmToRemoveDataModal="Deletar Cadastro"
          textToConfirmToRemoveDataModal="Tem certeza de que deseja desativar sua conta? Todos os seus dados serão removidos permanentemente de nossos servidores para sempre. Essa ação não pode ser desfeita."
        />
      </SearchData.Container>
    </div>
  )
}
