import { DataTableColumnHeader } from '@/components/ui/table/helpers/DataTableHeader'
import { tableSelect } from '@/utils/helpers/select'
import { clearHTMLTags } from '@/utils/replace-html-tags'
import { Chip } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { WorkspaceActions } from './workspaces.actions'

export type WorkspaceColumns = {
  _id: string
  name: string
  description?: string
  plan: string
  planStatus: string
}

const helper = createColumnHelper<WorkspaceColumns>()

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
    cell: ({ row }) => clearHTMLTags(row.getValue('name')),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Description
   */
  helper.accessor((row) => row.description, {
    id: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        header={t('workspaces:form.description.label')}
      />
    ),
    cell: ({ row }) => clearHTMLTags(row.getValue('description')),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Plan Status
   */
  helper.accessor((row) => row.planStatus, {
    id: 'plan_status',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        header={t('workspaces:form.plan_status.label')}
      />
    ),
    cell: ({ row }) => {
      const status = row.getValue('plan_status') as string

      const colors = {
        ACTIVE: 'success',
        INACTIVE: 'danger'
      }

      return (
        <Chip color={colors[status]}>
          {t(`workspaces:form.plan_status.options.${status?.toLowerCase()}`)}
        </Chip>
      )
    },
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
