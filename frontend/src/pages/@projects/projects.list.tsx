import { DataTable } from '@/@components/UI/DataTable/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePage } from '@/hooks/usePage'
import { PageLayout } from '@/layout/PageLayout'
import { backend, frontend } from '@/routes/routes'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { ProjectColumns, columns } from './table/projects.columns'

export default function ProjectListPage() {
  const { title, breadcrumbs } = usePage('projects')
  const onCloseProject = useWorkspaceStore((state) => state.onCloseProject)

  const { list, removeMany } = useFetch<ProjectColumns[]>({
    baseUrl: backend.projects.baseUrl,
    fetch: {
      keys: ['projects'],
      list: {
        keys: {
          workspace: true
        }
      }
    }
  })

  return (
    <PageLayout
      title={title()}
      breadcrumbs={breadcrumbs({ appendTitle: true })}
    >
      <DataTable
        data={list.data}
        ns={['projects']}
        columns={columns}
        asyncFn={removeMany.mutateAsync}
        internalLogicFn={onCloseProject}
        toolbar={{
          button: {
            href: frontend.projects.new
          }
        }}
      />
    </PageLayout>
  )
}
