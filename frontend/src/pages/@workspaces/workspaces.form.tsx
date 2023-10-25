import { GridLayout } from '@/components/ui/Grid'
import { SubmitButton } from '@/components/ui/SubmitButton'
import { useFetch } from '@/hooks/useFetch'
import { backend } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { RichEditor } from '@/components/ui/editor/RichEditor'
import { useTranslation } from 'react-i18next'
import {
  WorkspaceData,
  WorkspaceDataWithId,
  WorkspaceSchema
} from './workspaces.schema'

type WorkspaceFormProps = {
  data?: WorkspaceDataWithId
}

export const WorkspaceForm = ({ data }: WorkspaceFormProps) => {
  const { t } = useTranslation('workspaces')

  const form = useForm<WorkspaceData>({
    mode: 'all',
    resolver: zodResolver(WorkspaceSchema),
    defaultValues: data
  })

  const { create, update } = useFetch({
    baseUrl: backend.workspaces.baseUrl,
    query: ['workspaces'],
    fetch: {
      id: data?.id
    }
  })

  const onSubmit = async (form: WorkspaceData) => {
    if (data) {
      await update.mutateAsync(form)
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
        <Controller
          control={form.control}
          name="name"
          render={({ field }) => (
            <RichEditor
              label={t('form.name.label')}
              placeholder={t('form.name.placeholder')}
              errorMessage={form.formState.errors.name?.message}
              limit={100}
              {...field}
            />
          )}
        />
        <Controller
          control={form.control}
          name="description"
          render={({ field }) => (
            <RichEditor
              label={t('form.description.label')}
              placeholder={t('form.description.placeholder')}
              errorMessage={form.formState.errors.description?.message}
              as="textarea-3"
              limit={1000}
              {...field}
            />
          )}
        />
      </GridLayout>
      <SubmitButton
        isEdit={!!data}
        fnResetButton={form.reset}
        isLoading={create.isLoading || update.isLoading}
      >
        {data ? t('common:btn.edit') : t('common:btn.save')}
      </SubmitButton>
    </form>
  )
}
