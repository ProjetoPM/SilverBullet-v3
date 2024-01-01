import { DataTable } from '@/components/UI/DataTable/DataTable'
import { usePageUtils } from '@/hooks/usePageUtils'
import { PageLayout } from '@/layout/PageLayout'
import { frontend } from '@/routes/routes'
import { WorkspaceInviteProvider } from './context/WorkspaceInviteContext'
import { columns } from './table/workspaces.invites.columns'
import { WorkspaceInviteToolbar } from './workspaces.toolbar'

export const WorkspacesInvitesListPage = () => {
  const { t, title, breadcrumb } = usePageUtils('workspaces', {
    title: 'page.invites'
  })

  return (
    <PageLayout
      title={title()}
      breadcrumb={breadcrumb({
        segments: [{ label: t('page.title'), link: frontend.workspaces.index }],
        appendTitle: true
      })}
    >
      <WorkspaceInviteProvider>
        <DataTable
          columns={columns}
          data={[]}
          toolbar={<WorkspaceInviteToolbar />}
        />
      </WorkspaceInviteProvider>
    </PageLayout>
  )
}
