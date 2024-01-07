import { GradeRating } from '@/components/UI/GradeRating'
import { usePage } from '@/hooks/usePage'
import { PageLayout } from '@/layout/PageLayout'
import { WeeklyReportProvider } from './processes/context/WeeklyReportProvider'
import { WeeklyReportForm } from './weekly-report.form'

const data = {
  _id: 'wjfazn7qnd',
  projectId: 'cerhuy9499',
  weeklyEvaluationId: 'cerhuy9499',
  toolEvaluation: '<h1>Test</h1>',
  processes: [
    {
      _id: 'itp2u4ozr4',
      group: 'itp2u4ozr4',
      name: 'wjfazn7qnd',
      description: 'Hello, there!!',
      filesFolder: 'itp2u4ozr4'
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
