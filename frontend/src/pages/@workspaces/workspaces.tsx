import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageUtils'
import { PageLayout } from '@/layout/PageLayout'
import { backend, frontend } from '@/routes/routes'
import { WorkspaceForm } from './workspaces.form'
import { WorkspaceData } from './workspaces.schema'

export const WorkspacePage = () => {
  const { id, t, title, breadcrumb } = usePageUtils('workspaces', {
    dynamic: true
  })

  const { get } = useFetch<WorkspaceData>({
    baseUrl: backend.workspaces.baseUrl,
    keys: [`workspace/${id}`],
    fetch: {
      get: {
        append: id
      }
    }
  })

  return (
    <PageLayout
      title={title()}
      isLoading={get.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: t('page.title'), link: frontend.workspaces.index }]
      })}
    >
      <WorkspaceForm data={get.data} />
    </PageLayout>
  )
}
