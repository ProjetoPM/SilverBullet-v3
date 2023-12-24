import { ComponentLayout } from '@/layout/ComponentLayout'
import { WeeklyEvaluationListPage } from '@/pages/weekly-evaluation/weekly-evaluation.list'
import { AuthGuard, WorkspaceGuard } from '@/utils/guard'
import { frontend } from '@routes'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const WeeklyEvaluationPage = lazy(() =>
  import('@/pages/weekly-evaluation/tabs/evaluations/tab.evaluations').then(
    (m) => ({
      default: m.WeeklyEvaluationPage
    })
  )
)

export const WeeklyEvaluationRoutes: RouteObject = {
  path: '/',
  element: (
    <AuthGuard>
      <WorkspaceGuard>
        <ComponentLayout layout="simple" />
      </WorkspaceGuard>
    </AuthGuard>
  ),
  children: [
    {
      path: frontend.weekly_evaluation.index,
      element: <WeeklyEvaluationListPage />
    },
    {
      path: frontend.weekly_evaluation.new,
      element: <WeeklyEvaluationPage />
    },
    {
      path: frontend.weekly_evaluation.edit,
      element: <WeeklyEvaluationPage />
    }
  ]
}
