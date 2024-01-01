import { GridLayout } from '@/components/UI/GridLayout'
import { SubmitButton } from '@/components/UI/SubmitButton'
import { RichEditor } from '@/components/UI/RichEditor/RichEditor'
import { Text } from '@/components/UI/Label/Text'
import { WorkspaceStore } from '@/stores/useWorkspaceStore'
import { ct } from '@/utils/helpers/replace-html-tags'
import { zodResolver } from '@hookform/resolvers/zod'
import { Snippet } from '@nextui-org/react'
import { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useWeeklyReport } from './processes/context/WeeklyReportProvider'
import { WeeklyReportProcesses } from './processes/processes'
import { WeeklyEvaluationSelect } from './processes/processes.select'
import { WeeklyReportData, WeeklyReportSchema } from './weekly-report.schema'

type WeeklyReportFormProps = {
  data?: WeeklyReportData
}

export const WeeklyReportForm = ({ data }: WeeklyReportFormProps) => {
  const { t } = useTranslation('weekly-report')
  const { images } = useWeeklyReport()
  const [output, setOutput] = useState('')

  const form = useForm<WeeklyReportData>({
    mode: 'all',
    resolver: zodResolver(WeeklyReportSchema),
    defaultValues: data
  })

  const onSubmit = async (form: WeeklyReportData) => {
    console.log(images)
    setOutput(JSON.stringify(form, null, 2))
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
        noValidate
      >
        <GridLayout cols="2">
          <WeeklyEvaluationSelect form={form} />
          <fieldset>
            <Text size="sm" className="pb-1" isRequired>
              {t('linked_project.label')}
            </Text>
            <Snippet
              classNames={{
                base: 'h-unit-10 w-full hover:bg-default-200',
                pre: 'font-sans'
              }}
              onCopy={() =>
                navigator.clipboard.writeText(
                  form.getValues('projectId') ||
                    WorkspaceStore.getWorkspaceId() ||
                    t('linked_project.placeholder')
                )
              }
              tooltipProps={{
                content: t('linked_project.clipboard'),
                delay: 100,
                color: 'primary'
              }}
              hideSymbol
            >
              {ct(WorkspaceStore.getWorkspace()?.name || '')}
            </Snippet>
          </fieldset>
        </GridLayout>
        <GridLayout cols="1">
          <fieldset>
            <Controller
              control={form.control}
              name="toolEvaluation"
              render={({ field }) => (
                <RichEditor
                  {...field}
                  label={t('tool_evaluation.label')}
                  placeholder={t('tool_evaluation.placeholder')}
                  errorMessage={form.formState.errors.toolEvaluation?.message}
                  options={{ minRows: 4 }}
                  isFixed
                />
              )}
            />
          </fieldset>
        </GridLayout>
        <GridLayout cols="1">
          <WeeklyReportProcesses />
        </GridLayout>
        <SubmitButton
          isEdit={!!data}
          fnResetButton={form.reset}
          // isLoading={create.isLoading || update.isLoading}
        />
      </form>
      <pre>{output}</pre>
    </FormProvider>
  )
}
