import { ComponentLayout } from '@/layout/ComponentLayout'
import { AuthGuard, WorkspaceGuard } from '@/utils/guard'
import { frontend } from '@routes'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const WeeklyReportPage = lazy(() =>
  import('@/pages/weekly-report/weekly-report').then((m) => ({
    default: m.WeeklyReportPage
  }))
)

export const WeeklyReportRoutes: RouteObject = {
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
      path: frontend.weekly_report.index,
      element: <div>No implemented yet.</div>
    },
    {
      path: frontend.weekly_report.new,
      element: <WeeklyReportPage />
    },
    {
      path: frontend.weekly_report.edit,
      element: <WeeklyReportPage />
    }
  ]
}
