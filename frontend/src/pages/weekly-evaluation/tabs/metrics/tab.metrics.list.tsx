import { DataTable } from '@/components/UI/DataTable/DataTable'
import { usePage } from '@/hooks/usePage'
import { PageLayout } from '@/layout/PageLayout'
import { columns } from '@/pages/@projects/table/projects.columns'
import { frontend } from '@/routes/routes'

export const TabMetrics = () => {
  const { t, title, breadcrumbs } = usePage('weekly-evaluation')

  return (
    <PageLayout
      title={title({ override: 'tabs.metrics.label' })}
      breadcrumbs={breadcrumbs({
        segments: [
          {
            label: t('tabs.evaluations.label'),
            link: frontend.weekly_evaluation.tabs.evaluations
          }
        ],
        appendTitle: true
      })}
      breadcrumbProps={{
        className: 'pt-0.5'
      }}
    >
      <DataTable columns={columns} data={[]} />
    </PageLayout>
  )
}
