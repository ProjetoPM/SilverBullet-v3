import { GridLayout } from '@/components/ui/GridLayout'
import { SubmitButton } from '@/components/ui/SubmitButton'
import { RichEditor } from '@/components/ui/editor/RichEditor'
import { useFetch } from '@/hooks/useFetch'
import { backend, frontend } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ProjectData, ProjectSchema } from './projects.schema'

type ProjectFormProps = {
  data?: ProjectData
}

export const ProjectForm = ({ data }: ProjectFormProps) => {
  const { t } = useTranslation('projects')

  const form = useForm<ProjectData>({
    mode: 'all',
    resolver: zodResolver(ProjectSchema),
    defaultValues: data
  })

  const { create, update } = useFetch<ProjectData>({
    baseUrl: backend.projects.baseUrl,
    redirectTo: frontend.projects.index,
    invalidateQueries: ['projects']
  })

  const onSubmit = async (form: ProjectData) => {
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
                label={t('name.label')}
                {...field}
                placeholder={t('name.placeholder')}
                errorMessage={form.formState.errors.name?.message}
                options={{ limit: 64 }}
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
                options={{ limit: 1000, minRows: 3 }}
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
