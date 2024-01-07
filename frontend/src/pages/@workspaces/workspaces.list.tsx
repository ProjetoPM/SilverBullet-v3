import { DataTable } from '@/components/UI/DataTable/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePage } from '@/hooks/usePage'
import { PageLayout } from '@/layout/PageLayout'
import { backend, frontend } from '@/routes/routes'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { WorkspaceColumns, columns } from './table/workspaces.columns'

export default function WorkspaceListPage() {
  const { title, breadcrumbs } = usePage('workspaces')
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
        data={list.data}
        ns={['workspaces']}
        columns={columns}
        hiddenColumns={['plan']}
        asyncFn={removeMany.mutateAsync}
        internalLogicFn={onCloseWorkspace}
        toolbar={{
          button: {
            href: frontend.workspaces.new
          }
        }}
      />
    </PageLayout>
  )
}
