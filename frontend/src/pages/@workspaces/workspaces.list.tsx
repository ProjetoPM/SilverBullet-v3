import { DataTable } from '@/@components/UI/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageUtils'
import { PageLayout } from '@/layout/PageLayout'
import { backend, frontend } from '@/routes/routes'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { WorkspaceColumns, columns } from './table/workspaces.columns'

export const WorkspaceListPage = () => {
  const { title, breadcrumbs } = usePageUtils('workspaces')
  const onCloseWorkspace = useWorkspaceStore((state) => state.onCloseWorkspace)

  const { list, removeMany } = useFetch<WorkspaceColumns[]>({
    baseUrl: backend.workspaces.baseUrl,
    fetch: {
      keys: ['workspaces'],
      list: {}
    }
  })

  return (
    <PageLayout
      title={title()}
      breadcrumbs={breadcrumbs({ appendTitle: true })}
    >
      <DataTable
        ns={['workspaces']}
        columns={columns}
        asyncFn={removeMany.mutateAsync}
        internalLogicFn={onCloseWorkspace}
        toolbar={{
          button: {
            href: frontend.workspaces.new
          }
        }}
        {...list}
      />
    </PageLayout>
  )
}
