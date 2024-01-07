import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useProcesses } from './context/ProcessProvider'
import { FormField } from '@/components/Form/Form'

type ProcessSelectsProps = {
  index: number
}

const items = [
  {
    id: '109b84fa-afcb-4815-9600-450caad03aef',
    label: 'Integration'
  },
  {
    id: '6ad9b93c-6541-4be5-a090-24ed5fcdb9dc',
    label: 'Scope'
  },
  {
    id: '4c435da4-310b-4462-a747-c1a6b3b4690a',
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
