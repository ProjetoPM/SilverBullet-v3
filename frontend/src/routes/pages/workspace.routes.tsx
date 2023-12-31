import { ComponentLayout } from '@/layout/ComponentLayout'
import { AuthGuard } from '@/utils/guard'
import { frontend } from '@routes'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const WorkspacePage = lazy(() => import('@/pages/@workspaces/workspaces'))
const WorkspaceListPage = lazy(
  () => import('@/pages/@workspaces/workspaces.list')
)
const WorkspacesInvitesListPage = lazy(
  () => import('@/pages/@invites/@workspaces/workspaces.invites')
)

export const WorkspaceRoutes: RouteObject = {
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
    },
    {
      path: frontend.workspaces.users.index,
      element: <WorkspacesInvitesListPage />
    }
  ]
}
