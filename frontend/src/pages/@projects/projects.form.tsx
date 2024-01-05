import { Form, FormField } from '@/@components/Form/Form'
import { FormEditor } from '@/@components/Form/FormEditor'
import { GridLayout } from '@/@components/UI/GridLayout'
import { SubmitButton } from '@/@components/UI/SubmitButton'
import { useFetch } from '@/hooks/useFetch'
import { usePageLayout } from '@/layout/PageLayoutProvider'
import { backend, frontend } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ProjectData, ProjectLimits, ProjectSchema } from './projects.schema'

type ProjectFormProps = {
  data?: ProjectData
}

export const ProjectForm = ({ data }: ProjectFormProps) => {
  const { t } = usePageLayout()

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
                options={{ limit: ProjectLimits.name }}
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
                options={{ limit: ProjectLimits.description, minRows: 3 }}
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
