'use client'
import { memo } from 'react'
import { Form } from '../Form'
import { PlusIcon, MinusIcon, ClockIcon } from '@heroicons/react/24/outline'
import { TEXT_INPUT_STYLE } from '.'
import { v4 as uuidv4 } from 'uuid'
import { DAY_CARD_CLASSNAME } from '@/style/consts'

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
            gridTemplateColumns: 'repeat(3, 207.5px)',
            gridAutoFlow: 'column',
            gridRowGap: '14px',
            gridColumnGap: '14px',
          }}
        >
          {scheduleAvailabilityFields.map(
            (field: any, availabilityFieldIndex: number) => {
              const { day } = field

              return (
                <div key={field.id} className={DAY_CARD_CLASSNAME}>
                  <div className="flex flex-row gap-2 w-full justify-center">
                    <h2 className="text-black">
                      {weekdayName[availabilityFieldIndex]}
                    </h2>
                  </div>

                  <div className="flex flex-row gap-3 justify-center content-center items-center">
                    <button
                      type="button"
                      onClick={() => addHourRanges(availabilityFieldIndex)}
                      className="text-sky-500 items-center gap-1  border border-1 border-sky-500 rounded-full hover:text-sky-300 hover:border-sky-300 active:text-sky-200 active:border-sky-200"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>

                    <ClockIcon className="h-5 w-5 text-gray-700" />

                    <button
                      type="button"
                      onClick={() =>
                        removeHourRanges(availabilityFieldIndex, 0)
                      }
                      className="text-red-500 items-center gap-1  border border-1 border-red-500 rounded-full hover:text-red-300 hover:border-red-300 active:text-red-200 active:border-red-200"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                  </div>

                  {day.map((_: any, hourRangesIndex: number) => {
                    const fieldNameStart = `scheduleAvailability.${availabilityFieldIndex}.day.${hourRangesIndex}.start`
                    const fieldNameEnd = `scheduleAvailability.${availabilityFieldIndex}.day.${hourRangesIndex}.end`

                    return (
                      <Form.Field key={uuidv4()}>
                        <div className="absolute">
                          <Form.ErrorMessage
                            field="scheduleAvailability"
                            availabilityFieldIndex={availabilityFieldIndex}
                            lastField="start"
                            hourRangesIndex={hourRangesIndex}
                          />
                        </div>

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
