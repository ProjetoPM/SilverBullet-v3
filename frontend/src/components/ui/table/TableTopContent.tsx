import { useScreen } from '@/hooks/useScreen'
import { AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { DebouncedInput } from '../DebouncedInput'
import { AnimateFilters } from '../animation/AnimateFilters'
import { TableDeleteButton } from './TableDeleteButton'
import { TableFilterButton } from './TableFilterButton'
import { TablePageSize } from './TablePageSize'
import { useDataTable } from './context/DataTableProvider'
import { DataTableViewOptions } from './helpers/DataTableViewOptions'

type TableTopContentProps = {
  toolbar?: React.ReactNode
}

export function TableTopContent({ toolbar }: TableTopContentProps) {
  const { filter, table, asyncFn } = useDataTable()
  const { screenX } = useScreen()
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

  const filters = useCallback(() => {
    return [
      {
        key: screenX > 520 ? 2 : 1,
        shouldRender: filter.visibility,
        component: <DataTableViewOptions />
      },
      {
        key: screenX > 520 ? 1 : 2,
        shouldRender: filter.search,
        component: (
          <DebouncedInput
            id="search-debounced-input"
            startContent={<Search className="text-default-500 w-5 h-5" />}
            placeholder={t('filter.search_by')}
            className="flex-grow w-full min-w-96 sm:max-w-xs lg:w-96"
            classNames={{
              input: 'w-full'
            }}
            value={table.getState().globalFilter}
            onChange={(value) => table.setGlobalFilter(String(value))}
            onClear={() => table.setGlobalFilter('')}
            debounce={150}
            autoComplete="off"
            isClearable
          />
        )
      },
      {
        key: screenX > 520 ? 3 : 3,
        shouldRender: !!asyncFn,
        component: (
          <TableDeleteButton
            isDisabled={!table.getSelectedRowModel().rows.length}
            handleDelete={handleDelete}
          />
        )
      }
    ]
  }, [
    t,
    table,
    filter.search,
    filter.visibility,
    asyncFn,
    handleDelete,
    screenX
  ])

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-end">
          <div className="flex gap-2 flex-grow items-center">
            <TableFilterButton />
            <AnimatePresence initial={false}>
              {filters()
                .filter((component) => component.shouldRender)
                .sort((a, b) => a.key - b.key)
                .map((filter) => (
                  <AnimateFilters key={filter.key}>
                    {filter.component}
                  </AnimateFilters>
                ))}
            </AnimatePresence>
          </div>
          <div className="flex gap-3 self-end sm:self-auto">{toolbar}</div>
        </div>
        <TablePageSize />
      </div>
    </>
  )
}
