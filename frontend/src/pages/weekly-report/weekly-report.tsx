import { GradeRating } from '@/components/UI/GradeRating'
import { usePage } from '@/hooks/usePage'
import { PageLayout } from '@/layout/PageLayout'
import { WeeklyReportProvider } from './processes/context/WeeklyReportProvider'
import { WeeklyReportForm } from './weekly-report.form'

const data = {
  _id: '109b84fa-afcb-4815-9600-450caad03aef',
  projectId: '109b84fa-afcb-4815-9600-450caad03aef',
  weeklyEvaluationId: '6ad9b93c-6541-4be5-a090-24ed5fcdb889',
  toolEvaluation: '<h1>Test</h1>',
  processes: [
    {
      _id: '223f85ba-afcb-4815-9600-450caad03aef',
      group: '109b84fa-afcb-4815-9600-450caad03aef',
      name: '109b84fa-afcb-4815-9600-450caad03aef',
      description: 'Hello, there!!',
      filesFolder: '109b84fa-afcb-4815-9600-450caad03aef'
    }
  ]
}

export default function WeeklyReportPage() {
  const { title, breadcrumbs, ns } = usePage('weekly-report')

  return (
    <PageLayout
      title={title({ dynamic: true })}
      breadcrumbs={breadcrumbs()}
      endContent={
        <GradeRating prepend="Score: " value={4.32} scoreTimes={2} readOnly />
      }
      ns={ns}
    >
      <WeeklyReportProvider>
        <WeeklyReportForm data={data} />
      </WeeklyReportProvider>
    </PageLayout>
  )
}
