import { FormField } from '@/components/Form/Form'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useProcesses } from './context/ProcessProvider'

type ProcessSelectsProps = {
  index: number
}

const items = [
  {
    id: 'wjfazn7qnd',
    label: 'Integration'
  },
  {
    id: 'cerhuy9499',
    label: 'Scope'
  },
  {
    id: 'itp2u4ozr4',
    label: 'Planning'
  }
]

export const ProcessSelects = ({ index }: ProcessSelectsProps) => {
  const { t, form } = useProcesses()
  const [isDisabled, setDisabled] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setDisabled(false)
    }, 10)
  }, [])

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
      <FormField
        control={form.control}
        name={`processes.${index}.group`}
        render={({ field: { value, onChange, ...rest } }) => (
          <Autocomplete
            defaultItems={items}
            label={t('process.group.label')}
            labelPlacement="outside"
            placeholder={t('process.group.placeholder')}
            errorMessage={
              form.formState.errors.processes?.[index]?.group?.message
            }
            defaultSelectedKey={value}
            onSelectionChange={(value) => onChange(value ?? '')}
            isDisabled={isDisabled}
            {...rest}
            isRequired
          >
            {(item) => (
              <AutocompleteItem key={item.id}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
        )}
      />
      <FormField
        control={form.control}
        name={`processes.${index}.name`}
        render={({ field: { value, onChange, ...rest } }) => (
          <Autocomplete
            defaultItems={items}
            label={t('process.name.label')}
            labelPlacement="outside"
            placeholder={t('process.name.placeholder')}
            errorMessage={
              form.formState.errors.processes?.[index]?.name?.message
            }
            defaultSelectedKey={value}
            onSelectionChange={(value) => onChange(value ?? '')}
            {...rest}
            isDisabled={!form.watch(`processes.${index}.group`)}
            isRequired
          >
            {(item) => (
              <AutocompleteItem key={item.id}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
        )}
      />
    </div>
  )
}
