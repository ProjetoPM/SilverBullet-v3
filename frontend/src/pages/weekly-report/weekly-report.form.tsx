import { GridLayout } from '@/components/ui/GridLayout'
import { SubmitButton } from '@/components/ui/SubmitButton'
import { RichEditor } from '@/components/ui/editor/RichEditor'
import { Text } from '@/components/ui/label/Text'
import { Workspace } from '@/stores/useWorkspaceStore'
import { clearHTMLTags } from '@/utils/replace-html-tags'
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
  const [output, setOutput] = useState('')
  const { images } = useWeeklyReport()

  const form = useForm<WeeklyReportData>({
    mode: 'all',
    resolver: zodResolver(WeeklyReportSchema),
    defaultValues: data
  })

  const onSubmit = async (form: WeeklyReportData) => {
    setOutput(JSON.stringify(form, null, 2))
    console.table(form)
    console.log(images)
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
            <Text
              text={t('linked_project.label')}
              size="sm"
              className="pb-1"
              isRequired
            />
            <Snippet
              classNames={{ base: 'h-unit-10 w-full hover:bg-default-200' }}
              onCopy={() =>
                navigator.clipboard.writeText(
                  form.getValues('projectId') ||
                    Workspace.getWorkspace()?.id ||
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
              {clearHTMLTags(Workspace.getWorkspace()?.name || '')}
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
                  label={t('tool_evaluation.label')}
                  placeholder={t('tool_evaluation.placeholder')}
                  errorMessage={form.formState.errors.toolEvaluation?.message}
                  limit={1000}
                  isFixed
                  as="textarea-4"
                  {...field}
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
        <pre>{output}</pre>
      </form>
    </FormProvider>
  )
}
