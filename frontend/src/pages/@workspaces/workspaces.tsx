import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, frontend } from '@/routes/routes'
import { WorkspaceForm } from './workspaces.form'
import { WorkspaceDataWithId } from './workspaces.schema'

export const WorkspacePage = () => {
  const { id, t, title, breadcrumb } = usePageUtils('workspaces')

  const { get } = useFetch<WorkspaceDataWithId>({
    baseUrl: backend.workspaces.baseUrl,
    keys: ['workspaces'],
    fetch: {
      get: {
        append: id
      }
    }
  })

  return (
    <PageLayout
      title={title({ dynamic: true })}
      isLoading={get.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: t('page.title'), link: frontend.workspaces.index }]
      })}
    >
      <WorkspaceForm data={get.data} />
    </PageLayout>
  )
}
