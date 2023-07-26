import { AppointmentFilters } from './AppointmentFilters'
import { AvailableTimesFilter } from './AppointmentFilters/AvailableTimesFilter/AvailableTimesFilter'
import { Form } from '@/components/Form'

export async function RightSidebar() {
  return (
    <div className="flex flex-col bg-white shadow-md h-full w-60 gap-6 p-1 items-center">
      <h2 className="text-2xl font-semibold text-gray-600">Agendamentos</h2>

      <div className="flex flex-col gap-2">
        <AppointmentFilters.Accordion>
          <AvailableTimesFilter
            patients={<Form.Autocomplete endPoint="patients" />}
            therapy={<Form.SelectByFormData />}
            professional={
              <Form.SelectFetchOptionsById endPoint="professionals" />
            }
            room={<Form.SelectFetchOptionsById endPoint="rooms" />}
          />
          <h1>Teste</h1>
        </AppointmentFilters.Accordion>
      </div>
    </div>
  )
}
