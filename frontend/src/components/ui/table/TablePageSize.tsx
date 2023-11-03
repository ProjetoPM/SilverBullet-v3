import { useDataTable } from './context/DataTableProvider'

export const TablePageSize = () => {
  const { t, table } = useDataTable()

  return (
    <div className="flex justify-between items-center">
      <span className="text-default-400 text-small">
        {t('total_of', { lines: table.getFilteredRowModel().rows.length })}
      </span>
      <label className="flex items-center text-default-400 text-small">
        {t('rows_per_page')}
        <select
          className="bg-transparent outline-none text-default-400 text-small"
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(+e.target.value)}
        >
          {[5, 10, 15].map((value) => {
            return (
              <option key={value} value={value}>
                {value}
              </option>
            )
          })}
        </select>
      </label>
    </div>
  )
}
