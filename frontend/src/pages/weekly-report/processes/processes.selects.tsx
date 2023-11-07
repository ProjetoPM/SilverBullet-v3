import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { useProcesses } from './context/WeeklyReportProvider'

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

  return (
    <div className="grid grid-cols-2 gap-3">
      <fieldset>
        <Autocomplete
          items={items}
          label={t('process.group.label')}
          labelPlacement="outside"
          placeholder={t('process.group.placeholder')}
          errorMessage={
            form.formState.errors.processes?.[index]?.group?.message
          }
          defaultSelectedKey={form.getValues(`processes.${index}.group`)}
          onSelectionChange={(key) => {
            form.setValue(`processes.${index}.group`, String(key))
          }}
          onClose={() => form.clearErrors(`processes.${index}.group`)}
          isRequired
        >
          {(item) => (
            <AutocompleteItem key={item.id}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>
      </fieldset>
      <fieldset>
        <Autocomplete
          items={items}
          label={t('process.name.label')}
          labelPlacement="outside"
          placeholder={t('process.name.placeholder')}
          errorMessage={form.formState.errors.processes?.[index]?.name?.message}
          defaultSelectedKey={form.getValues(`processes.${index}.name`)}
          onSelectionChange={(key) => {
            form.setValue(`processes.${index}.name`, String(key))
          }}
          onClose={() => form.clearErrors(`processes.${index}.name`)}
          isDisabled={!form.getValues(`processes.${index}.group`)}
          isRequired
        >
          {(item) => (
            <AutocompleteItem key={item.id}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>
      </fieldset>
    </div>
  )
}
