import { usePageUtils } from '@/hooks/usePageUtils'
import { PageLayout } from '@/layout/PageLayout'
import { frontend } from '@/routes/routes'
import { WeeklyEvaluationForm } from './weekly-evaluation.form'

export const WeeklyEvaluationPage = () => {
  const { t, title, breadcrumb } = usePageUtils('weekly-report', {
    dynamic: true
  })

  return (
    <PageLayout
      title={title()}
      breadcrumb={breadcrumb({
        segments: [
          { label: t('page.title'), link: frontend.weekly_evaluation.index }
        ]
      })}
    >
      <WeeklyEvaluationForm />
    </PageLayout>
  )
}
