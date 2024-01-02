import { DataTable } from '@/@components/UI/DataTable'
import { usePageUtils } from '@/hooks/usePageUtils'
import { PageLayout } from '@/layout/PageLayout'
import { columns } from '@/pages/@projects/table/projects.columns'
import { frontend } from '@/routes/routes'
import { useEffect } from 'react'

export const TabSubmissions = () => {
  const { title, breadcrumbs } = usePageUtils('weekly-evaluation')

  useEffect(() => {
    console.log('submissions')
  }, [])

  return (
    <PageLayout
      title={title({ override: 'tabs.submissions.label' })}
      breadcrumbs={breadcrumbs({
        segments: [
          {
            label: title(),
            link: frontend.weekly_evaluation.tabs.evaluations
          }
        ],
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
