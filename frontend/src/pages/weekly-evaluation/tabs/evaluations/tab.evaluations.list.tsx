import { DataTable } from '@/components/ui/table/DataTable'
import { usePageUtils } from '@/hooks/usePageUtils'
import { PageLayout } from '@/layout/PageLayout'
import { columns } from '@/pages/@projects/table/projects.columns'
import { useEffect } from 'react'

export const TabEvaluations = () => {
  const { title, breadcrumb } = usePageUtils('weekly-evaluation')

  useEffect(() => {
    console.log('evaluations')
  }, [])

  return (
    <PageLayout
      title={title('tabs.evaluations.label')}
      breadcrumb={breadcrumb({
        appendTitle: true
      })}
      breadcrumbProps={{
        className: 'pt-2'
      }}
    >
      <DataTable columns={columns} data={[]} />
    </PageLayout>
  )
}
