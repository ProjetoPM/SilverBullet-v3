import { Pagination } from '@nextui-org/react'
import { DefaultAnimate } from '../animation/DefaultAnimate'
import { useDataTable } from './context/DataTableProvider'

export const TableBottomContent = () => {
  const { t, table, filter } = useDataTable()

  return (
    <div className="relative p-2 flex flex-wrap gap-4 justify-center items-center">
      <span className="sm:absolute sm:left-0 relative text-small text-default-400">
        {t('table.rows_selected', {
          rows: table.getFilteredSelectedRowModel().rows.length,
          max_rows: table.getFilteredRowModel().rows.length
        })}
      </span>
      <DefaultAnimate>
        {filter.pagination && (
          <Pagination
            isCompact
            showControls
            color="primary"
            variant="flat"
            page={table.getState().pagination.pageIndex + 1}
            total={table.getPageCount()}
            isDisabled={!table.getCanPreviousPage() && !table.getCanNextPage()}
            onChange={(page) => table.setPageIndex(page - 1)}
            className="flex justify-center items-center"
            classNames={{ base: 'rounded-lg' }}
          />
        )}
      </DefaultAnimate>
    </div>
  )
}
