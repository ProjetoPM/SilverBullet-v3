import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { WorkspaceColumns, columns } from './table/workspaces.columns'
import { WorkspaceToolbar } from './workspaces.toolbar'

export const WorkspaceListPage = () => {
  const { title, breadcrumb } = usePageUtils('workspaces')

  const { get, removeMany } = useFetch<WorkspaceColumns[]>({
    baseUrl: backend.workspaces.baseUrl,
    query: ['workspaces'],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={title()}
      isLoading={get.isLoading}
      breadcrumb={breadcrumb()}
    >
      <DataTable
        columns={columns}
        data={get.data ?? []}
        toolbarButtons={<WorkspaceToolbar />}
        fn={removeMany.mutateAsync}
      />
    </PageLayout>
  )
}
