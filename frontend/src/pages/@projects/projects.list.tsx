import { DataTable } from '@/@components/UI/DataTable/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageUtils'
import { PageLayout } from '@/layout/PageLayout'
import { backend, frontend } from '@/routes/routes'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { ProjectColumns, columns } from './table/projects.columns'

export const ProjectListPage = () => {
  const { title, breadcrumbs } = usePageUtils('projects')
  const onCloseProject = useWorkspaceStore((state) => state.onCloseProject)

  const { list, removeMany } = useFetch<ProjectColumns[]>({
    baseUrl: backend.projects.baseUrl,
    fetch: {
      keys: ['projects'],
      list: {
        useWorkspaceId: true
      }
    }
  })

  return (
    <PageLayout
      title={title()}
      breadcrumbs={breadcrumbs({ appendTitle: true })}
    >
      <DataTable
        ns={['projects']}
        columns={columns}
        asyncFn={removeMany.mutateAsync}
        internalLogicFn={onCloseProject}
        toolbar={{
          button: {
            href: frontend.projects.new
          }
        }}
        {...list}
      />
    </PageLayout>
  )
}
