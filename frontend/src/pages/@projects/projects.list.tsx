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
    keys: ['projects'],
    fetch: {
      list: {}
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
        toolbar={<ProjectToolbar />}
        asyncFn={removeMany.mutateAsync}
      />
    </PageLayout>
  )
}
