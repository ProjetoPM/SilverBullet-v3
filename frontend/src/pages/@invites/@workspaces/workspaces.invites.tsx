import { DataTable } from '@/@components/UI/DataTable/DataTable'
import { usePage } from '@/hooks/usePage'
import { PageLayout } from '@/layout/PageLayout'
import { frontend } from '@/routes/routes'
import { useEffect, useState } from 'react'
import { WorkspaceRoles } from '../shared/hooks/useWorkspaceInvites'
import { InvitesProvider } from '../shared/provider/InvitesProvider'
import {
  WorkspaceInviteColumns,
  columns
} from './table/workspaces.invites.columns'
import { WorkspaceInviteToolbar } from './workspaces.toolbar'

const invites: WorkspaceInviteColumns[] = [
  {
    name: 'Teste 1',
    email: 'teste1@teste.com',
    role: 'ADMIN',
    status: 'ACTIVE'
  },
  {
    name: 'Teste 2',
    email: 'teste2@teste.com',
    role: 'USER',
    status: 'PENDING'
  },
  {
    name: 'Teste 3',
    email: 'teste3@teste.com',
    role: 'USER',
    status: 'PENDING'
  }
]

export default function WorkspacesInvitesListPage() {
  const { ns, title, breadcrumbs } = usePage('workspaces')
  const roles = useState<Set<WorkspaceRoles>>(new Set(['USER']))

  useEffect(() => {
    console.log(invites)
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
        data={invites}
        toolbar={
          <InvitesProvider roles={roles}>
            <WorkspaceInviteToolbar />
          </InvitesProvider>
        }
      />
    </PageLayout>
  )
}
