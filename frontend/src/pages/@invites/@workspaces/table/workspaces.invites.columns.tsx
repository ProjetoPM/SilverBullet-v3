import { DataTableColumnHeader } from '@/@components/UI/DataTable/helpers/DataTableHeader'
import { ct } from '@/utils/helpers/replace-html-tags'
import { tableSelect } from '@/utils/helpers/select'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { WorkspaceActions } from './workspaces.invites.actions'

export type WorkspaceInviteColumns = {
  name: string
  email: string
  role: string
  status: string
}

const helper = createColumnHelper<WorkspaceInviteColumns>()

export const columns = [
  /**
   * Select
   */
  helper.display(tableSelect),
  /**
   * Name
   */
  helper.accessor((row) => row.email, {
    id: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        header={t('workspaces:form.email.label')}
      />
    ),
    cell: ({ row }) => ct(row.getValue('email')),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Role
   */
  helper.accessor((row) => row.role, {
    id: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        header={t('workspaces:form.role.label')}
      />
    ),
    cell: ({ row }) => ct(row.getValue('role')),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Status
   */
  helper.accessor((row) => row.status, {
    id: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        header={t('workspaces:form.status.label')}
      />
    ),
    cell: ({ row }) => ct(row.getValue('status')),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => <WorkspaceActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
