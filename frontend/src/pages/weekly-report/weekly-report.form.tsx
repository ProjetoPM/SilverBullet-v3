import { GridLayout } from '@/components/ui/Grid'
import { SubmitButton } from '@/components/ui/SubmitButton'
import { RichEditor } from '@/components/ui/editor/RichEditor'
import { Workspace } from '@/stores/useWorkspaceStore'
import { clearHTMLTags } from '@/utils/replace-html-tags'
import { zodResolver } from '@hookform/resolvers/zod'
import { Autocomplete, AutocompleteItem, Input } from '@nextui-org/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { WeeklyReportProcesses } from './processes/processes'
import {
  WeeklyReportData,
  WeeklyReportDataWithId,
  WeeklyReportSchema
} from './weekly-report.schema'

type WeeklyReportFormProps = {
  data?: WeeklyReportDataWithId
}

const items = [
  {
    id: '109b84fa-afcb-4815-9600-450caad03aef',
    label: 'Avaliação Semanal 1'
  },
  {
    id: '6ad9b93c-6541-4be5-a090-24ed5fcdb9dc',
    label: 'Avaliação Semanal 2'
  },
  {
    id: '4c435da4-310b-4462-a747-c1a6b3b4690a',
    label: 'Avaliação Semanal 3'
  }
]

export const WeeklyReportForm = ({ data }: WeeklyReportFormProps) => {
  const { t } = useTranslation('weekly-report')
  const [output, setOutput] = useState('')

  const form = useForm<WeeklyReportData>({
    mode: 'all',
    resolver: zodResolver(WeeklyReportSchema),
    defaultValues: data
  })

  const onSubmit = async (form: WeeklyReportData) => {
    setOutput(JSON.stringify(form, null, 2))
    console.table(form)
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-3"
      noValidate
    >
      <GridLayout cols="2">
        <fieldset>
          <Autocomplete
            items={items}
            label={t('weekly_evaluation.label')}
            labelPlacement="outside"
            placeholder={t('weekly_evaluation.placeholder')}
            errorMessage={form.formState.errors.weeklyEvaluationId?.message}
            defaultSelectedKey={form.getValues(`weeklyEvaluationId`)}
            onSelectionChange={(key) =>
              form.setValue(`weeklyEvaluationId`, String(key))
            }
            onClose={() => form.clearErrors(`weeklyEvaluationId`)}
            isRequired
          >
            {(item) => (
              <AutocompleteItem key={item.id}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
        </fieldset>
        <fieldset>
          <Input
            label={t('linked_project.label')}
            labelPlacement="outside"
            placeholder={t('linked_project.placeholder')}
            value={clearHTMLTags(Workspace.getWorkspace()?.name || '')}
            isRequired
            isReadOnly
          />
        </fieldset>
      </GridLayout>
      <GridLayout cols="1">
        <fieldset>
          <Controller
            control={form.control}
            name="toolEvaluation"
            render={({ field }) => (
              <RichEditor
                label={t('tool_evaluation.label')}
                placeholder={t('tool_evaluation.placeholder')}
                errorMessage={form.formState.errors.toolEvaluation?.message}
                limit={1000}
                as="textarea-4"
                {...field}
              />
            )}
          />
        </fieldset>
      </GridLayout>
      <GridLayout cols="1">
        <WeeklyReportProcesses form={form} />
      </GridLayout>
      <SubmitButton
        isEdit={!!data}
        fnResetButton={form.reset}
        // isLoading={create.isLoading || update.isLoading}
      />
      <pre>{output}</pre>
    </form>
  )
}
