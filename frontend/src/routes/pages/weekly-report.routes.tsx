import { ComponentLayout } from '@/layout/ComponentLayout'
import { WeeklyReportPage } from '@/pages/weekly-report/weekly-report'
import { AuthGuard, WorkspaceGuard } from '@/utils/guard'
import { frontend } from '@routes'
import { RouteObject } from 'react-router-dom'

export const WeeklyReportRoutes: RouteObject = {
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
  ]
}
