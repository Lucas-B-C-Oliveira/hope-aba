import { BigCalendarContainer } from "./components/Calendar/Container/BigCalendarContainer";


export default async function Appointments() {

  return (
    <div className="flex flex-col h-full w-full ">
      <BigCalendarContainer />
    </div>
  )
}
