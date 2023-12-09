import { ComponentLayout } from '@/layout/ComponentLayout'
import { AuthGuard, WorkspaceGuard } from '@/utils/guard'
import { frontend } from '@routes'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const WeeklyEvaluationPage = lazy(
  () => import('@/pages/weekly-evaluation/weekly-evaluation')
)

export const WeeklyEvaluationRoutes: RouteObject = {
  path: '/',
  children: [
    {
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
          element: <div>No implemented yet.</div>
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
  ]
}
