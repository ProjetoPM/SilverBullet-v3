import { DataTable } from '@/components/UI/DataTable/DataTable'
import { usePage } from '@/hooks/usePage'
import { PageLayout } from '@/layout/PageLayout'
import { frontend } from '@/routes/routes'
import { useState } from 'react'
import { WorkspaceRoles } from '../shared/hooks/useWorkspaceInvites'
import { InvitesProvider } from '../shared/provider/InvitesProvider'
import { columns } from './table/workspaces.invites.columns'
import { WorkspaceInviteToolbar } from './workspaces.toolbar'

export default function WorkspacesInvitesListPage() {
  const { ns, title, breadcrumbs } = usePage('workspaces')
  const roles = useState<Set<WorkspaceRoles>>(new Set(['USER']))

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
        data={[
          {
            _id: '1',
            name: 'Teste 1',
            email: 'teste1@teste.com',
            role: 'ADMIN',
            status: 'ACTIVE'
          },
          {
            _id: '2',
            name: 'Teste 2',
            email: 'teste2@teste.com',
            role: 'USER',
            status: 'PENDING'
          },
          {
            _id: '3',
            name: 'Teste 3',
            email: 'teste3@teste.com',
            role: 'USER',
            status: 'PENDING'
          }
        ]}
        toolbar={
          <InvitesProvider roles={roles}>
            <WorkspaceInviteToolbar />
          </InvitesProvider>
        }
      />
    </PageLayout>
  )
}
