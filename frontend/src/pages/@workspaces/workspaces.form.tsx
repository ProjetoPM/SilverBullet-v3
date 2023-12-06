import { GridLayout } from '@/components/ui/GridLayout'
import { SubmitButton } from '@/components/ui/SubmitButton'
import { RichEditor } from '@/components/ui/editor/RichEditor'
import { useFetch } from '@/hooks/useFetch'
import { backend, frontend } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { WorkspaceData, WorkspaceSchema } from './workspaces.schema'

type WorkspaceFormProps = {
  data?: WorkspaceData
}

export const WorkspaceForm = ({ data }: WorkspaceFormProps) => {
  const { t } = useTranslation('workspaces')

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
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-3"
      noValidate
    >
      <GridLayout cols="1">
        <fieldset>
          <Controller
            control={form.control}
            name="name"
            render={({ field }) => (
              <RichEditor
                {...field}
                label={t('name.label')}
                placeholder={t('name.placeholder')}
                errorMessage={form.formState.errors.name?.message}
                options={{ limit: 100 }}
              />
            )}
          />
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="description"
            render={({ field }) => (
              <RichEditor
                {...field}
                label={t('description.label')}
                placeholder={t('description.placeholder')}
                errorMessage={form.formState.errors.description?.message}
                options={{ limit: 1000, size: 'textarea-3' }}
              />
            )}
          />
        </fieldset>
      </GridLayout>
      <SubmitButton
        isEdit={!!data}
        fnResetButton={form.reset}
        isLoading={create.isLoading || update.isLoading}
      />
    </form>
  )
}
