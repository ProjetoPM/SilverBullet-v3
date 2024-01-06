import { DataTable } from '@/@components/UI/DataTable/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePage } from '@/hooks/usePage'
import { PageLayout } from '@/layout/PageLayout'
import { frontend } from '@/routes/routes'
import { WorkspaceColumns } from '../table/workspaces.columns'
import { WorkspaceInviteProvider } from './context/WorkspaceInviteContext'
import { columns } from './table/workspaces.invites.columns'
import { WorkspaceInviteToolbar } from './workspaces.toolbar'

export default function WorkspacesInvitesListPage() {
  const { ns, title, breadcrumbs } = usePage('workspaces')

  const { list } = useFetch<WorkspaceColumns[]>({
    baseUrl: '/invites/workspace',
    fetch: {
      keys: ['invites'],
      list: {
        keys: {
          workspace: true
        }
      }
    }
  })

  return (
    <PageLayout
      title={title({ override: 'page.invites' })}
      breadcrumbs={breadcrumbs({
        segments: [{ label: title(), link: frontend.workspaces.index }],
        appendTitle: true
      })}
      ns={ns}
    >
      <DataTable
        columns={columns}
        data={list.data}
        toolbar={
          <WorkspaceInviteProvider>
            <WorkspaceInviteToolbar />
          </WorkspaceInviteProvider>
        }
      />
    </PageLayout>
  )
}
