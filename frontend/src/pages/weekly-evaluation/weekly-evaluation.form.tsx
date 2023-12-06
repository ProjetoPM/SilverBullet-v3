import { GridLayout } from '@/components/ui/GridLayout'
import { SubmitButton } from '@/components/ui/SubmitButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  WeeklyReportData,
  WeeklyReportSchema
} from './weekly-evaluation.schema'
import { DatePicker } from '@/components/ui/date-picker/DatePicker'

type WeeklyEvaluationFormProps = {
  data?: WeeklyReportData
}

export const WeeklyEvaluationForm = ({ data }: WeeklyEvaluationFormProps) => {
  const { t } = useTranslation('weekly-evaluation')
  const [output, setOutput] = useState('')

  const form = useForm<WeeklyReportData>({
    mode: 'all',
    resolver: zodResolver(WeeklyReportSchema),
    defaultValues: data
  })

  const onSubmit = async (form: WeeklyReportData) => {
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
          <Controller
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <DatePicker
                field={field}
                label={t('start_date.label')}
                placeholder={t('start_date.placeholder')}
                errorMessage={form.formState.errors.startDate?.message}
                {...field}
              />
            )}
          />
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
