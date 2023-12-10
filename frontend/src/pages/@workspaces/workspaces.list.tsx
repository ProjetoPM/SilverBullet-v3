import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageUtils'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { WorkspaceColumns, columns } from './table/workspaces.columns'
import { WorkspaceToolbar } from './workspaces.toolbar'

export const WorkspaceListPage = () => {
  const { title, breadcrumb } = usePageUtils('workspaces')
  const onCloseWorkspace = useWorkspaceStore((state) => state.onCloseWorkspace)

  const { list, removeMany } = useFetch<WorkspaceColumns[]>({
    baseUrl: backend.workspaces.baseUrl,
    fetch: {
      keys: ['workspaces'],
      list: {}
    }
  })

  return (
    <PageLayout title={title()} breadcrumb={breadcrumb({ appendTitle: true })}>
      <DataTable
        ns={['workspaces']}
        columns={columns}
        toolbar={<WorkspaceToolbar />}
        asyncFn={removeMany.mutateAsync}
        internalLogicFn={onCloseWorkspace}
        {...list}
      />
    </PageLayout>
  )
}
