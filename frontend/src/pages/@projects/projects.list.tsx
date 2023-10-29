import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { Workspace } from '@/stores/useWorkspaceStore'
import { ProjectToolbar } from './projects.toolbar'
import { ProjectColumns, columns } from './table/projects.columns'

export const ProjectListPage = () => {
  const { title, breadcrumb } = usePageUtils('projects')

  const { list, removeMany } = useFetch<ProjectColumns[]>({
    baseUrl: backend.projects.baseUrl,
    query: ['projects', Workspace.getWorkspace()!.id],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={title()}
      isLoading={list.isLoading}
      breadcrumb={breadcrumb()}
    >
      <DataTable
        columns={columns}
        data={list.data ?? []}
        toolbarButtons={<ProjectToolbar />}
        fn={removeMany.mutateAsync}
      />
    </PageLayout>
  )
}
