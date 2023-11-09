import { tableSelect } from '@/utils/helpers/select'
import { clearHTMLTags } from '@/utils/replace-html-tags'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { ProjectActions } from './projects.actions'

export type ProjectColumns = {
  id: string
  name: string
  description?: string
}

const helper = createColumnHelper<ProjectColumns>()

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
    header: () => t('workspaces:form.name.label'),
    cell: ({ row }) => clearHTMLTags(row.getValue('name')),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Description
   */
  helper.accessor((row) => row.description, {
    id: 'description',
    header: () => t('workspaces:form.description.label'),
    cell: ({ row }) => clearHTMLTags(row.getValue('description')),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => <ProjectActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
