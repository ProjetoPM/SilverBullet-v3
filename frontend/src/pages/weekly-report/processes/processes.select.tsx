import { FormField } from '@/components/Form/Form'
import { usePageLayout } from '@/layout/PageLayoutProvider'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'
import { WeeklyReportData } from '../weekly-report.schema'

type WeeklyEvaluationSelectProps = {
  form: UseFormReturn<WeeklyReportData>
}

const items = [
  {
    id: 'itp2u4ozr4',
    label: 'Test 1'
  },
  {
    id: 'cerhuy9499',
    label: 'Test 2'
  },
  {
    id: 'wjfazn7qad',
    label: 'Test 3'
  }
]

export const WeeklyEvaluationSelect = ({
  form
}: WeeklyEvaluationSelectProps) => {
  const { t } = usePageLayout()

  return (
    <fieldset>
      <FormField
        control={form.control}
        name="weeklyEvaluationId"
        render={({ field: { value, onChange, ...rest } }) => (
          <Autocomplete
            defaultItems={items}
            label={t('weekly_evaluation.label')}
            labelPlacement="outside"
            placeholder={t('weekly_evaluation.placeholder')}
            errorMessage={form.formState.errors.weeklyEvaluationId?.message}
            defaultSelectedKey={value}
            onSelectionChange={(value) => onChange(value ?? '')}
            {...rest}
            isRequired
          >
            {(item) => (
              <AutocompleteItem key={item.id}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
        )}
      />
    </fieldset>
  )
}
