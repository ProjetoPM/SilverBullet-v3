import { GridLayout } from '@/@components/UI/GridLayout'
import { SubmitButton } from '@/@components/UI/SubmitButton'
import { useFetch } from '@/hooks/useFetch'
import { usePageLayout } from '@/layout/PageLayoutProvider'
import { backend, frontend } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { WorkspaceData, WorkspaceSchema } from './workspaces.schema'
import { Form, FormField } from '@/@components/Form/Form'
import { FormEditor } from '@/@components/Form/FormEditor'
import { FormDatePicker } from '@/@components/Form/FormDatePicker'

type WorkspaceFormProps = {
  data?: WorkspaceData
}

export const WorkspaceForm = ({ data }: WorkspaceFormProps) => {
  const { t } = usePageLayout()

  const form = useForm<WorkspaceData>({
    mode: 'all',
    resolver: zodResolver(WorkspaceSchema),
    defaultValues: data
  })

  const { create, update } = useFetch<WorkspaceData>({
    baseUrl: backend.workspaces.baseUrl,
    redirectTo: frontend.workspaces.index,
    invalidateQueries: ['workspaces']
  })

  const onSubmit = async (form: WorkspaceData) => {
    if (data?._id) {
      await update.mutateAsync({ ...form, _id: data._id })
      return
    }
    await create.mutateAsync(form)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
        noValidate
      >
        <GridLayout cols="1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormEditor
                {...field}
                label={t('name.label')}
                placeholder={t('name.placeholder')}
                options={{ limit: 100 }}
                asNormalInput
              />
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormEditor
                {...field}
                label={t('description.label')}
                placeholder={t('description.placeholder')}
                errorMessage={form.formState.errors.description?.message}
                options={{ limit: 1000, minRows: 3 }}
                asNormalInput
              />
            )}
          />
          <FormField
            control={form.control}
            name="dates"
            render={({ field }) => (
              <FormDatePicker
                label="Test"
                mode="range"
                selected={field.value}
                onSelect={field.onChange}
                description="Description"
                numberOfMonths={2}
              />
            )}
          />
        </GridLayout>
        <SubmitButton
          isEdit={!!data}
          fnResetButton={form.reset}
          isLoading={create.isPending || update.isPending}
        />
      </form>
    </Form>
  )
}
