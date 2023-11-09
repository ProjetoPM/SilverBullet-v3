import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageUtils'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { WorkspaceColumns, columns } from './table/workspaces.columns'
import { WorkspaceToolbar } from './workspaces.toolbar'

export const WorkspaceListPage = () => {
  const { title, breadcrumb } = usePageUtils('workspaces')

  const { list, removeMany } = useFetch<WorkspaceColumns[]>({
    baseUrl: backend.workspaces.baseUrl,
    keys: ['workspaces'],
    fetch: { list: {} }
  })

  return (
    <PageLayout
      title={title()}
      isLoading={list.isLoading}
      breadcrumb={breadcrumb({ appendTitle: true })}
    >
      <DataTable
        columns={columns}
        data={list.data ?? []}
        toolbar={<WorkspaceToolbar />}
        asyncFn={removeMany.mutateAsync}
      />
    </PageLayout>
  )
}
