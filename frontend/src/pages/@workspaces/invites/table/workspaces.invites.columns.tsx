import { DataTableColumnHeader } from '@/components/UI/DataTable/helpers/DataTableHeader'
import { ct } from '@/utils/helpers/replace-html-tags'
import { tableSelect } from '@/utils/helpers/select'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { WorkspaceActions } from './workspaces.invites.actions'

export type WorkspaceInviteColumns = {
  _id: string
  name: string
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
  helper.accessor((row) => row.name, {
    id: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        header={t('workspaces:form.name.label')}
      />
    ),
    cell: ({ row }) => ct(row.getValue('name')),
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
