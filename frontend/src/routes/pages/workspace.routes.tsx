import { ComponentLayout } from '@/layout/ComponentLayout'
import { WorkspacePage } from '@/pages/@workspaces/workspaces'
import { WorkspaceListPage } from '@/pages/@workspaces/workspaces.list'
import { AuthGuard } from '@/utils/guard'
import { frontend } from '@routes'
import { RouteObject } from 'react-router-dom'

export const WorkspaceRoutes: RouteObject = {
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <ComponentLayout layout="simple" />
        </AuthGuard>
      ),
      children: [
        {
          path: frontend.workspaces.index,
          element: <WorkspaceListPage />
        },
        {
          path: frontend.workspaces.new,
          element: <WorkspacePage />
        },
        {
          path: frontend.workspaces.edit,
          element: <WorkspacePage />
        }
      ]
    }
  ]
}
