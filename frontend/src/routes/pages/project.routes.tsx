import { ComponentLayout } from '@/layout/ComponentLayout'
import { ProjectPage } from '@/pages/@projects/projects'
import { ProjectListPage } from '@/pages/@projects/projects.list'
import { AuthGuard, WorkspaceGuard } from '@/utils/guard'
import { frontend } from '@routes'
import { RouteObject } from 'react-router-dom'

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
