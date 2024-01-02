import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageUtils'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { WorkspaceForm } from './workspaces.form'
import { WorkspaceData } from './workspaces.schema'

export const WorkspacePage = () => {
  const { id, title, breadcrumbs } = usePageUtils('workspaces')

  const { get } = useFetch<WorkspaceData>({
    baseUrl: backend.workspaces.baseUrl,
    fetch: {
      keys: ['workspaces', id],
      get: {
        append: id
      }
    }
  })

  return (
    <PageLayout
      title={title({ dynamic: true })}
      isLoading={get.isLoading}
      breadcrumbs={breadcrumbs()}
    >
      <WorkspaceForm data={get.data} />
    </PageLayout>
  )
}
