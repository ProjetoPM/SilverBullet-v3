import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageUtils'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { ProjectToolbar } from './projects.toolbar'
import { ProjectColumns, columns } from './table/projects.columns'

export const ProjectListPage = () => {
  const { title, breadcrumb } = usePageUtils('projects')

  const { list, removeMany } = useFetch<ProjectColumns[]>({
    baseUrl: backend.projects.baseUrl,
    fetch: {
      keys: ['projects'],
      list: {}
    }
  })

  return (
    <PageLayout title={title()} breadcrumb={breadcrumb({ appendTitle: true })}>
      <DataTable
        columns={columns}
        toolbar={<ProjectToolbar />}
        asyncFn={removeMany.mutateAsync}
        {...list}
      />
    </PageLayout>
  )
}
