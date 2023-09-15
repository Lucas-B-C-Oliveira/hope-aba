import { useAppointmentFilterStore } from "@/store/appointmentFilterStore";
import { Filter } from ".";
import { ActionButton } from "@/components/ActionButton";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useAutocompleteFilter } from "./useAutocompleteFilter";


export function AppointmentFilters() {
  const { setButtonStatusAppointment } = useAppointmentFilterStore()
  function handleClick() {
    setButtonStatusAppointment('clicked')
  }

  return (

    <div className="flex flex-col items-start gap-3">
      <div className="flex flex-col gap-6">
        <Filter.Autocomplete
          useAutocompleteLogic={() => useAutocompleteFilter("professionalsAppointment", "professionals")}
          labelText="Profissionais"
        />
        <Filter.Autocomplete
          useAutocompleteLogic={() => useAutocompleteFilter("patientsAppointment", "patients")}
          labelText="Pacientes"
        />
      </div>

      <Filter.Checkboxes
        labelText="Terapias"
        filterKey="therapiesAppointment"
        endPoint="therapies"
      />
      <Filter.Checkboxes
        labelText="Salas"
        filterKey="roomsAppointment"
        endPoint="rooms"
      />

      <ActionButton onClick={handleClick}>
        <AdjustmentsHorizontalIcon
          className="pointer-events-none h-5 w-5 text-white"
          aria-hidden="true"
        />
        Filtrar
      </ActionButton>

      <Filter.Labels filterType="Appointment" />
    </div>

  )
}