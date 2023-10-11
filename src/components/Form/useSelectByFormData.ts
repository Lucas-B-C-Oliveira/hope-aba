import { isEqual } from "lodash"
import { useEffect, useState } from "react"
import { useFormContext, useWatch } from "react-hook-form"

const defaultSelected = { name: 'Selecione', id: '123123' }

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  name?: string
  fieldNameToObserve?: string
}

export function useSelectByFormData({ fieldNameToObserve, name }: Props) {

  const {
    setValue,
    setError,
    clearErrors,
    formState: { errors },
    control,
    getValues,
  } = useFormContext()

  const [selected, setSelected] = useState(defaultSelected)

  const observedField = useWatch({
    name: `${fieldNameToObserve}`,
    control,
  })

  const formValues = getValues()
  const currentFieldValue = formValues[`${name}`]

  function handleClick() {
    if (!(observedField?.allowTherapies?.length > 0)) {
      setError(`${name}`, {
        message: 'Selecione um paciente primeiro',
        type: 'string',
      })
    } else {
      if (typeof errors[`${name}`]?.message !== 'undefined') {
        clearErrors()
      }
    }
  }

  function handleOnSelected(newData: any) {
    if (!isEqual(currentFieldValue, newData)) {
      setValue(`${name}`, newData)
    }

    if (!isEqual(selected, newData)) {
      setSelected(newData)
    }
  }

  useEffect(() => {
    if (typeof currentFieldValue !== 'undefined') {
      setValue(`${name}`, undefined)
    }

    if (!isEqual(selected, defaultSelected)) {
      setSelected(defaultSelected)
    }

  }, [observedField])


  return {
    selected,
    handleOnSelected,
    handleClick,
    observedField,
    classNames
  }
}