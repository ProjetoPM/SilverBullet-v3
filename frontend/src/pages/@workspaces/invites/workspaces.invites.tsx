import { DataTable } from '@/components/UI/DataTable/DataTable'
import { usePageUtils } from '@/hooks/usePageUtils'
import { PageLayout } from '@/layout/PageLayout'
import { frontend } from '@/routes/routes'
import { WorkspaceInviteProvider } from './context/WorkspaceInviteContext'
import { columns } from './table/workspaces.invites.columns'
import { WorkspaceInviteToolbar } from './workspaces.toolbar'

export const WorkspacesInvitesListPage = () => {
  const { title, breadcrumbs } = usePageUtils('workspaces')

  return (
    <PageLayout
      title={title({ override: 'page.invites' })}
      breadcrumbs={breadcrumbs({
        segments: [{ label: title(), link: frontend.workspaces.index }],
        appendTitle: true
      })}
    >
      <DataTable
        columns={columns}
        data={[]}
        toolbar={
          <WorkspaceInviteProvider>
            <WorkspaceInviteToolbar />
          </WorkspaceInviteProvider>
        }
      />
    </PageLayout>
  )
}
