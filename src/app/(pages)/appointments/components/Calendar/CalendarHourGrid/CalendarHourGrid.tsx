'use client'

import { memo } from 'react'
import { AvailableTimeCard } from '../../../page'

interface CalendarHourGridProps {
  containerOffset?: any
  availableTimeCards?: AvailableTimeCard[]
  currentAppointmentsByDate?: any[]
}

export const CalendarHourGrid = memo(function CalendarHourGrid({
  containerOffset,
  availableTimeCards,
  currentAppointmentsByDate,
}: CalendarHourGridProps) {
  // console.log('currentAppointmentsByDate', currentAppointmentsByDate)

  const calendarGrid: any[][] = Array.from({ length: 23 }, () =>
    Array(7).fill(''),
  )

  return (
    <div className="flex flex-auto">
      <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />

      <div className="grid flex-auto grid-cols-1 grid-rows-1 ">
        {/* Horizontal lines */}
        <div
          className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
          style={{ gridTemplateRows: 'repeat(23, minmax(2rem, 1fr))' }}
        >
          <div ref={containerOffset} className="row-end-1 h-11"></div>

          <div>
            <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              7AM
            </div>
          </div>
          <div />

          <div>
            <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              8AM
            </div>
          </div>
          <div />
          <div>
            <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              9AM
            </div>
          </div>
          <div />
          <div>
            <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              10AM
            </div>
          </div>
          <div />
          <div>
            <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              11AM
            </div>
          </div>
          <div />
          <div>
            <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              12PM
            </div>
          </div>
          <div />
          <div>
            <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              1PM
            </div>
          </div>
          <div />
          <div>
            <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              2PM
            </div>
          </div>
          <div />
          <div>
            <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              3PM
            </div>
          </div>
          <div />
          <div>
            <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              4PM
            </div>
          </div>
          <div />
          <div>
            <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              5PM
            </div>
          </div>
          <div />
          <div>
            <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              6PM
            </div>
          </div>
          <div />
        </div>

        {/* Vertical lines */}
        <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
          <div className="col-start-1 row-span-full" />
          <div className="col-start-2 row-span-full" />
          <div className="col-start-3 row-span-full" />
          <div className="col-start-4 row-span-full" />
          <div className="col-start-5 row-span-full" />
          <div className="col-start-6 row-span-full" />
          <div className="col-start-7 row-span-full" />
          <div className="col-start-8 row-span-full w-8" />
        </div>

        <div className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100">
          {/* Renderize os eventos com base na matriz */}
          {calendarGrid.map((row, rowIndex) =>
            row.map((event, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`${event ? 'relative' : 'empty-cell' // Defina estilos diferentes para células vazias
                  }`}
                style={{
                  gridColumn: `span 1`, // Cada evento ocupa uma coluna
                  gridRow: `${rowIndex + 1} / span 1`, // Cada evento ocupa uma linha
                }}
              >
                {event && (
                  <a
                    href="#"
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-green-100 p-2 text-xs leading-5 hover:bg-green-200"
                  >
                    <p className="order-1 font-semibold text-gray-700">
                      Profissional: {event.name}
                    </p>
                    {/* Adicione mais informações do evento, se necessário */}
                  </a>
                )}
              </div>
            )),
          )}
        </div>

        {/* Events */}

        {/* <ol
          className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8 "
          style={{
            gridTemplateRows: 'repeat(1000, minmax(0, 1fr)) auto',
            // 82 => Posição das horas
            // 41 é uma linha | 56 => 7hrs
            // 46 == 30min    | 138 => 8hrs
            // 60 => 40min
            // 88 = 60min     | 220 => 9hrs
            //                | 302 => 10hrs
            //                | 384 => 11hrs
            //                | 466 => 12hrs
            //                | 548 => 13hrs
            //                | 630 => 14hrs
            //                | 712 => 15hrs
            //                | 794 => 16hrs
            //                | 876 => 17hrs
            //                | 220 => 18hrs
          }}
        >
          <li
            className="relative hidden sm:col-start-2 sm:flex"
            style={{ gridRow: '876 / span 61' }}
          >
            <a
              href="#"
              className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 px-2 py-1 text-xs leading-5 hover:bg-gray-200"
            >
              <p className="order-1 font-semibold text-gray-700">
                Paciente: José
              </p>
            </a>
          </li>

          <li
            className="relative hidden sm:col-start-2 sm:flex"
            style={{ gridRow: '876 / span 61' }}
          >
            <a
              href="#"
              className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-red-100 px-2 py-1 text-xs leading-5 hover:bg-gray-200"
            >
              <p className="order-1 font-semibold text-gray-700">
                Paciente: José
              </p>
            </a>
          </li>

          {availableTimeCards &&
            availableTimeCards.length > 0 &&
            availableTimeCards?.map((cardData: AvailableTimeCard) => {
              const { column, id, gridRow, start, end, name } = cardData

              // console.log('cardData', cardData)

              return (
                <li
                  key={id}
                  className={`relative t-px hidden sm:${column} sm:flex`}
                  style={{ gridRow }}
                >
                  <a
                    href="#"
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-green-100 p-2 text-xs leading-5 hover:bg-green-200"
                  >
                    <p className="order-1 font-semibold text-gray-700">
                      Profissional: {name}
                    </p>

                    <p className="text-gray-500 group-hover:text-gray-700">
                      <time dateTime="2022-01-15T10:00">
                         //! TODO: Receber as datas aqui, vc pode fazer a data atual e enviar dentro do obj da semana  
                        {start} - {end}
                      </time>
                    </p>
                  </a>
                </li>
              )
            })}

          {/* {typeof currentAppointmentsByDate !== 'undefined' &&
            currentAppointmentsByDate.length > 0 &&
            currentAppointmentsByDate.map((appointmentCardData: any) => {
              const {
                column,
                id,
                gridRow,
                schedule: { end, start },
                professional: { name: professionalName },
                patient: { name: patientName },
                room: { name: roomName },
                therapy: { name: therapyName },
              } = appointmentCardData
              return (
                <li
                  key={id}
                  className={`relative t-px hidden sm:${column} sm:flex`}
                  style={{ gridRow }}
                >
                  <a
                    href="#"
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-green-100 p-2 text-xs leading-5 hover:bg-green-200"
                  >
                    <p className="order-1 font-semibold text-gray-700">
                      Paciente: {patientName}
                    </p>

                    <p className="order-1 font-semibold text-gray-700">
                      Profissional: {professionalName}
                    </p>

                    <p className="order-1 font-semibold text-gray-700">
                      Sala: {roomName}
                    </p>

                    <p className="order-1 font-semibold text-gray-700">
                      Terapia: {therapyName}
                    </p>

                    <p className="text-gray-500 group-hover:text-gray-700">
                      <time dateTime="2022-01-15T10:00">
                         //! TODO: Receber as datas aqui, vc pode fazer a data atual e enviar dentro do obj da semana  
                        {start} - {end}
                      </time>
                    </p>
                  </a>
                </li>
              )
            })} */}

        {/* 
          <li
            className="relative  t-px hidden sm:col-start-2 sm:flex"
            // style={{ gridRow: '2 / span 14' }} // é de 12 + 2 = 14 em 14 cada linha
            // span 14 preenche 1 hora
            // style={{ gridRow: '30 / span 9' }}
            // style={{ gridRow: '2 / span 42' }}

            // 42 é 60min
            // 35 é 50 min
            // 28 é 40min
            // 21 é 30min
            // 14 é 20 min
            // 7 é 10 min

            // 2 = 7hrs
            // 44 = 8hrs
            // 86 = 9hrs
            // 128 = 10hrs
            // 170 = 11hrs
            // 212 = 12hrs
            // 254 = 13hrs
            // 296 = 14hrs
            // 338 = 15hrs
            // 380 = 16hrs
            // 422 = 17hrs
            // 464 = 18hrs
            // 2 = 8hrs

            // style={{ gridRow: '2 / span 28' }}
            style={{ gridRow: '21 / span 28' }}
          // style={{ gridRow: '2 / span 14' }}
          // style={{ gridRow: '16 / span 14' }}
          // style={{ gridRow: '30 / span 14' }}
          >
            <a
              href="#"
              className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs leading-5 hover:bg-gray-200"
            >
              <p className="order-1 font-semibold text-gray-700">
                Paciente: José
              </p>
              <p className="order-1 font-semibold text-gray-700">
                Terapia: Fono
              </p>
              <p className="order-1 font-semibold text-gray-700">
                Sala: Sala 1
              </p>

              <p className="order-1 font-semibold text-gray-700">
                Profissional: Sala 1
              </p>

              <p className="text-gray-500 group-hover:text-gray-700">
                <time dateTime="2022-01-15T10:00">10:00 AM</time>
              </p>
            </a>
          </li> 
        </ol> */}
      </div>
    </div>
  )
})
