import { ComponentLayout } from '@/layout/ComponentLayout'
import { AuthGuard, WorkspaceGuard } from '@/utils/guard'
import { frontend } from '@routes'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const ProjectPage = lazy(() =>
  import('@/pages/@projects/projects').then((m) => ({ default: m.ProjectPage }))
)
const ProjectListPage = lazy(() =>
  import('@/pages/@projects/projects.list').then((m) => ({
    default: m.ProjectListPage
  }))
)

export const ProjectRoutes: RouteObject = {
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
          path: frontend.projects.index,
          element: <ProjectListPage />
        },
        {
          path: frontend.projects.new,
          element: <ProjectPage />
        },
        {
          path: frontend.projects.edit,
          element: <ProjectPage />
        }
      ]
    }
  ]
}
