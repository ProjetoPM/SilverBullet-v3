import { AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import { isValidElement, useCallback } from 'react'
import { DefaultAnimate } from '../Animation/DefaultAnimate'
import { DebouncedInput } from '../DebouncedInput'
import { TableDeleteButton } from './TableDeleteButton'
import { TableFilterButton } from './TableFilterButton'
import { TablePageSize } from './TablePageSize'
import { useDataTable } from './context/DataTableProvider'
import {
  DataTableToolbarButtons,
  ToolbarProps
} from './helpers/DataTableToolbarButtons'
import { DataTableViewOptions } from './helpers/DataTableViewOptions'

export type TableTopContentProps = {
  toolbar: ToolbarProps | JSX.Element
}

export function TableTopContent({ toolbar }: TableTopContentProps) {
  const { t, filter, table, asyncFn, internalLogicFn } = useDataTable()

  /**
   * Deleta os itens selecionados. Esse método só irá funcionar
   * se o backend tiver o método `deleteMany()`.
   */
  const handleDelete = useCallback(async () => {
    const rows = table.getSelectedRowModel().rows
    const originalRows = rows.map((row) => row.original as { _id: string })
    const ids = originalRows.map((row) => row._id)

    if (internalLogicFn) {
      for (const id of ids) {
        internalLogicFn(id)
      }
    }

    await asyncFn?.(ids)
    table.toggleAllPageRowsSelected(false)
  }, [asyncFn, internalLogicFn, table])

  const filters = useCallback(() => {
    return [
      {
        key: 1,
        shouldRender: filter.search,
        component: (
          <DebouncedInput
            id="search-debounced-input"
            startContent={<Search className="text-foreground-500 w-5 h-5" />}
            placeholder={t('filter.search_by')}
            value={table.getState().globalFilter}
            onChange={(value) => table.setGlobalFilter(String(value))}
            autoComplete="off"
            isClearable
          />
        )
      },
      {
        key: 2,
        shouldRender: filter.visibility,
        component: <DataTableViewOptions />
      },
      {
        key: 3,
        shouldRender: !!asyncFn,
        component: (
          <TableDeleteButton
            isDisabled={!table.getSelectedRowModel().rows.length}
            handleDelete={handleDelete}
          />
        )
      }
    ]
  }, [t, table, filter.search, filter.visibility, asyncFn, handleDelete])

  return (
    <>
      <div className="space-y-3">
        <div className="flex justify-between gap-2">
          <div className="flex gap-2 items-center overflow-x-auto">
            <TableFilterButton />
            <AnimatePresence initial={false}>
              {filters()
                .filter((component) => component.shouldRender)
                .map((filter) => (
                  <DefaultAnimate key={filter.key}>
                    {filter.component}
                  </DefaultAnimate>
                ))}
            </AnimatePresence>
          </div>
          {filter.actions && (
            <div className="flex self-end sm:self-auto">
              {isValidElement(toolbar) ? (
                toolbar
              ) : (
                <DataTableToolbarButtons {...(toolbar as ToolbarProps)} />
              )}
            </div>
          )}
        </div>
        <TablePageSize />
      </div>
    </>
  )
}