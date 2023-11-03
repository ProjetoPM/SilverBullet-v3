import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { DebouncedInput } from '../DebouncedInput'
import { TableDeleteButton } from './TableDeleteButton'
import { TableFilterButton } from './TableFilterButton'
import { TablePageSize } from './TablePageSize'
import { useDataTable } from './context/DataTableProvider'

type TableTopContentProps = {
  toolbar?: React.ReactNode
}

export function TableTopContent({ toolbar }: TableTopContentProps) {
  const { filter, table, asyncFn } = useDataTable()
  const { t } = useTranslation('table')

  /**
   * Deleta os itens selecionados. Esse método só irá funcionar
   * se o backend tiver o método `deleteMany()`.
   */
  const handleDelete = useCallback(async () => {
    const rows = table.getSelectedRowModel().rows
    const originalRows = rows.map((row) => row.original as { id: string })
    const ids = originalRows.map((row) => row.id)

    await asyncFn?.(ids)
    table.toggleAllPageRowsSelected(false)
  }, [asyncFn, table])

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-end">
          <div className="flex gap-2 items-center">
            <TableFilterButton />
            <AnimatePresence initial={false}>
              {filter.search && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  exit={{ opacity: 0 }}
                >
                  <DebouncedInput
                    id="search-debounced-input"
                    startContent={
                      <Search className="text-default-500 w-5 h-5" />
                    }
                    placeholder={t('filter.search_by')}
                    className="flex-grow w-full sm:max-w-xs lg:max-w-md"
                    value={table.getState().globalFilter}
                    onChange={(value) => table.setGlobalFilter(String(value))}
                    onClear={() => table.setGlobalFilter('')}
                    debounce={150}
                    autoComplete="off"
                    isClearable
                  />
                </motion.div>
              )}
            </AnimatePresence>
            {asyncFn && (
              <TableDeleteButton
                isDisabled={!table.getSelectedRowModel().rows.length}
                handleDelete={handleDelete}
              />
            )}
          </div>
          <div className="flex gap-3 self-end sm:self-auto">{toolbar}</div>
        </div>
        <TablePageSize />
      </div>
    </>
  )
}
