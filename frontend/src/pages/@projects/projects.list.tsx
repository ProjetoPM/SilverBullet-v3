import { DataTable } from '@/components/UI/DataTable/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageUtils'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { ProjectToolbar } from './projects.toolbar'
import { ProjectColumns, columns } from './table/projects.columns'

export const ProjectListPage = () => {
  const { title, breadcrumb } = usePageUtils('projects')
  const onCloseProject = useWorkspaceStore((state) => state.onCloseProject)

  const { list, removeMany } = useFetch<ProjectColumns[]>({
    baseUrl: backend.projects.baseUrl,
    useWorkspaceId: true,
    fetch: {
      keys: ['projects'],
      list: {}
    }
  })

  return (
    <PageLayout title={title()} breadcrumb={breadcrumb({ appendTitle: true })}>
      <DataTable
        ns={['projects']}
        columns={columns}
        toolbar={<ProjectToolbar />}
        asyncFn={removeMany.mutateAsync}
        internalLogicFn={onCloseProject}
        {...list}
      />
    </PageLayout>
  )
}
