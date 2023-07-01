'use client'
import { memo } from 'react'
import { Form } from '../Form'
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { TEXT_INPUT_STYLE } from '.'
import { v4 as uuidv4 } from 'uuid'

interface ScheduleAvailabilityFieldsProps {
  scheduleAvailabilityFields: any
  weekdayName: string[]
  addHourRanges: (value: number) => void
  removeHourRanges: (
    availabilityFieldIndex: number,
    hourRangesIndex: number,
  ) => void
}

export const ScheduleAvailabilityFields = memo(
  function ScheduleAvailabilityFields({
    addHourRanges,
    removeHourRanges,
    scheduleAvailabilityFields,
    weekdayName,
  }: ScheduleAvailabilityFieldsProps) {
    return (
      <Form.Field className="w-full h-full">
        <div className="flex flex-row gap-1 items-center">
          <Form.Label>Horários disponíveis</Form.Label>
          <Form.ErrorMessage field="scheduleAvailability" />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateRows: 'repeat(3, auto)',
            gridTemplateColumns: 'repeat(3, 222px)',
            gridAutoFlow: 'column',
            gridRowGap: '14px',
            gridColumnGap: '14px',
          }}
        >
          {scheduleAvailabilityFields.map(
            (field: any, availabilityFieldIndex: number) => {
              const { day } = field

              return (
                <div
                  key={field.id}
                  className="flex flex-col gap-1 border-2 rounded p-1 relative h-fit"
                >
                  <div className="flex flex-row gap-2 w-full justify-center">
                    <h2 className="text-black">
                      {weekdayName[availabilityFieldIndex]}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => addHourRanges(availabilityFieldIndex)}
                    className="text-sky-600 font-semibold text-xs flex items-center gap-1 "
                  >
                    <PlusCircleIcon className="h-4 w-4" />
                    Adicionar horário
                  </button>

                  {day.map((_: any, hourRangesIndex: number) => {
                    const fieldNameStart = `scheduleAvailability.${availabilityFieldIndex}.day.${hourRangesIndex}.start`
                    const fieldNameEnd = `scheduleAvailability.${availabilityFieldIndex}.day.${hourRangesIndex}.end`

                    return (
                      <Form.Field key={uuidv4()}>
                        <Form.ErrorMessage
                          field="scheduleAvailability"
                          availabilityFieldIndex={availabilityFieldIndex}
                          lastField="start"
                          hourRangesIndex={hourRangesIndex}
                        />
                        <div className="flex flex-row gap-1  items-center">
                          <div className="flex flex-col items-center">
                            <Form.Label
                              className="text-black text-xs font-medium"
                              htmlFor={fieldNameStart}
                            >
                              Início
                            </Form.Label>
                            <Form.Input
                              type="time"
                              name={fieldNameStart}
                              className={TEXT_INPUT_STYLE}
                            />
                          </div>

                          <div className="flex flex-col items-center">
                            <Form.Label
                              className="text-black text-xs font-medium"
                              htmlFor={fieldNameEnd}
                            >
                              Fim
                            </Form.Label>
                            <Form.Input
                              type="time"
                              name={fieldNameEnd}
                              className={TEXT_INPUT_STYLE}
                            />
                          </div>

                          <div className=" flex h-full w-fit pt-4 items-center">
                            <button
                              type="button"
                              onClick={() =>
                                removeHourRanges(
                                  availabilityFieldIndex,
                                  hourRangesIndex,
                                )
                              }
                              className="text-red-500  w-5 h-5"
                            >
                              <XCircleIcon />
                            </button>
                          </div>
                        </div>
                      </Form.Field>
                    )
                  })}
                </div>
              )
            },
          )}
        </div>
      </Form.Field>
    )
  },
)
