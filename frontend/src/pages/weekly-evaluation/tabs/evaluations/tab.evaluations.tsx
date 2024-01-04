import { usePageUtils } from '@/hooks/usePageUtils'
import { PageLayout } from '@/layout/PageLayout'
import { frontend } from '@/routes/routes'
import { WeeklyEvaluationForm } from './tab.evaluations.form'

export default function WeeklyEvaluationPage() {
  const { t, title, breadcrumbs } = usePageUtils('weekly-report')

  return (
    <PageLayout
      title={title({ dynamic: true })}
      breadcrumbs={breadcrumbs({
        segments: [
          { label: t('page.title'), link: frontend.weekly_evaluation.index }
        ]
      })}
    >
      <WeeklyEvaluationForm />
    </PageLayout>
  )
}
