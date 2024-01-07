import { GridLayout } from '@/components/UI/GridLayout'
import { SubmitButton } from '@/components/UI/SubmitButton'
import { DatePicker } from '@/components/UI/DatePicker'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { WeeklyReportData, WeeklyReportSchema } from './tab.evaluations.schema'

type WeeklyEvaluationFormProps = {
  data?: WeeklyReportData
}

export const WeeklyEvaluationForm = ({ data }: WeeklyEvaluationFormProps) => {
  // const { t } = useTranslation('weekly-evaluation')
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
            name="multiple"
            render={({ field }) => (
              <DatePicker
                label="Test"
                mode="multiple"
                selected={field.value}
                onSelect={field.onChange}
                errorMessage={form.formState.errors.multiple?.message}
                description="Description"
              />
            )}
          />
          <Controller
            control={form.control}
            name="single"
            render={({ field }) => (
              <DatePicker
                label="Test"
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                errorMessage={form.formState.errors.single?.message}
                description="Description"
              />
            )}
          />
          <Controller
            control={form.control}
            name="range"
            render={({ field }) => (
              <DatePicker
                label="Test"
                mode="range"
                selected={field.value}
                onSelect={field.onChange}
                errorMessage={form.formState.errors.range?.message}
                description="Description"
                numberOfMonths={3}
                {...field}
              />
            )}
          />
        </GridLayout>
        <SubmitButton isEdit={!!data} fnResetButton={form.reset} />
      </form>
      <pre className="mt-5">
        {JSON.stringify(form.watch('single'), null, 2)}
        {JSON.stringify(form.watch('range'), null, 2)}
      </pre>
      <pre>{output}</pre>
    </FormProvider>
  )
}
