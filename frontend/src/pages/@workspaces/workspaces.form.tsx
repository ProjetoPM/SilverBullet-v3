import { Form, FormField } from '@/@components/Form/Form'
import { FormEditor } from '@/@components/Form/FormEditor'
import { GridLayout } from '@/@components/UI/GridLayout'
import { SubmitButton } from '@/@components/UI/SubmitButton'
import { useFetch } from '@/hooks/useFetch'
import { usePageLayout } from '@/layout/PageLayoutProvider'
import { backend, frontend } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  WorkspaceData,
  WorkspaceLimits,
  WorkspaceSchema
} from './workspaces.schema'

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
                options={{ limit: WorkspaceLimits.name }}
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
                options={{ limit: WorkspaceLimits.description, minRows: 3 }}
                asNormalInput
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
