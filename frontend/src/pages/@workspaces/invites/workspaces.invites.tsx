import { DataTable } from '@/@components/UI/DataTable/DataTable'
import { usePage } from '@/hooks/usePage'
import { PageLayout } from '@/layout/PageLayout'
import { frontend } from '@/routes/routes'
import { WorkspaceInviteProvider } from './context/WorkspaceInviteContext'
import { columns } from './table/workspaces.invites.columns'
import { WorkspaceInviteToolbar } from './workspaces.toolbar'

export default function WorkspacesInvitesListPage() {
  const { title, breadcrumbs } = usePage('workspaces')

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
