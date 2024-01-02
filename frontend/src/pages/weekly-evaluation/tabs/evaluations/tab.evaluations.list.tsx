import { DataTable } from '@/@components/UI/DataTable/DataTable'
import { usePageUtils } from '@/hooks/usePageUtils'
import { PageLayout } from '@/layout/PageLayout'
import { columns } from '@/pages/@projects/table/projects.columns'
import { useEffect } from 'react'

export const TabEvaluations = () => {
  const { title, breadcrumbs } = usePageUtils('weekly-evaluation')

  useEffect(() => {
    console.log('evaluations')
  }, [])

  return (
    <PageLayout
      title={title({ override: 'tabs.evaluations.label' })}
      breadcrumbs={breadcrumbs({
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
