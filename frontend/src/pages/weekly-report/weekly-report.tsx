import { usePageUtils } from '@/hooks/usePageUtils'
import { PageLayout } from '@/layout/PageLayout'
import { frontend } from '@/routes/routes'
import { WeeklyReportForm } from './weekly-report.form'

export const WeeklyReportPage = () => {
  const { t, title, breadcrumb } = usePageUtils('weekly-report', {
    dynamic: true
  })

  return (
    <PageLayout
      title={title()}
      breadcrumb={breadcrumb({
        segments: [
          { label: t('page.title'), link: frontend.weekly_report.index }
        ]
      })}
    >
      <WeeklyReportForm />
    </PageLayout>
  )
}
