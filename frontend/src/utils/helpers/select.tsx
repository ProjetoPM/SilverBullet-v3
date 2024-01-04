import { Checkbox } from '@nextui-org/react'
import { t } from 'i18next'

export const tableSelect = {
  id: 'select',
  header: ({ table }) => (
    <Checkbox
      isIndeterminate={table.getIsSomeRowsSelected()}
      isSelected={table.getIsAllRowsSelected()}
      onValueChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label={t('select_all')}
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      isSelected={row.getIsSelected()}
      onValueChange={(value) => row.toggleSelected(!!value)}
      aria-label={t('select_row')}
    />
  ),
  enableSorting: false,
  enableHiding: false
}
