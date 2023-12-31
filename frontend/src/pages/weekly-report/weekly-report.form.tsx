import { Form, FormField } from '@/components/Form/Form'
import { FormEditor } from '@/components/Form/FormEditor'
import { GridLayout } from '@/components/UI/GridLayout'
import { Text } from '@/components/UI/Label/Text'
import { SubmitButton } from '@/components/UI/SubmitButton'
import { useSupabase } from '@/hooks/useSupabase'
import { usePageLayout } from '@/layout/PageLayoutProvider'
import { WorkspaceStore } from '@/stores/useWorkspaceStore'
import { ct } from '@/utils/helpers/replace-html-tags'
import { zodResolver } from '@hookform/resolvers/zod'
import { Snippet } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useWeeklyReport } from './processes/context/WeeklyReportProvider'
import { WeeklyReportProcesses } from './processes/processes'
import { WeeklyEvaluationSelect } from './processes/processes.select'
import { WeeklyReportData, WeeklyReportSchema } from './weekly-report.schema'

type WeeklyReportFormProps = {
  data?: WeeklyReportData
}

export const WeeklyReportForm = ({ data }: WeeklyReportFormProps) => {
  const { t } = usePageLayout()
  const { images, clearImages } = useWeeklyReport()
  const [output, setOutput] = useState('')
  const { uploadImage } = useSupabase()

  const form = useForm<WeeklyReportData>({
    mode: 'all',
    resolver: zodResolver(WeeklyReportSchema),
    defaultValues: data
  })

  const handleImages = async () => {
    for (const image of images) {
      for (const file of image.files) {
        await uploadImage({
          file,
          from: 'weekly-report',
          path: `processes/${file.name}`
        })
      }
    }
  }

  const onSubmit = async (form: WeeklyReportData) => {
    setOutput(JSON.stringify(form, null, 2))
    handleImages()
  }

  useEffect(() => {
    console.log(form.formState.errors)
  })

  return (
    <Form {...form}>
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
          <FormField
            control={form.control}
            name="toolEvaluation"
            render={({ field }) => (
              <FormEditor
                {...field}
                label={t('tool_evaluation.label')}
                placeholder={t('tool_evaluation.placeholder')}
                options={{ minRows: 4 }}
                isFixed
              />
            )}
          />
        </GridLayout>
        <GridLayout cols="1">
          <WeeklyReportProcesses />
        </GridLayout>
        <SubmitButton
          isEdit={!!data}
          fnResetButton={() => {
            form.reset()
            clearImages()
          }}
        />
      </form>
      <pre>{output}</pre>
    </Form>
  )
}
