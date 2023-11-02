import { Input, Selection } from '@nextui-org/react'
import { Table } from '@tanstack/react-table'

import { Search } from 'lucide-react'
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DebouncedInput } from '../DebouncedInput'
import { TableDeleteButton } from './TableDeleteButton'
import { TableFilterButton } from './TableFilterButton'
import { TablePageSize } from './TablePageSize'

type TableTopContentProps<TData> = {
  table: Table<TData>
  globalFilter: string
  setGlobalFilter: Dispatch<SetStateAction<string>>
  toolbarButtons?: React.ReactNode
  asyncFn?: (ids: any) => Promise<void>
}

export function TableTopContent<TData>({
  globalFilter,
  setGlobalFilter,
  table,
  toolbarButtons,
  asyncFn
}: TableTopContentProps<TData>) {
  const { t } = useTranslation('table')
  const [type, setType] = useState<Selection>(new Set(['first']))

  const getFirstColumn = useMemo(() => {
    /**
     * Se a primeira coluna for o checkbox de select,
     * retorna a segunda.
     */
    if (
      table.getAllColumns().length > 1 &&
      table.getAllColumns()?.at(0)?.id === 'select'
    ) {
      return table.getAllColumns?.().at(1)
    }
    /**
     * Se não, retorna a primeira.
     */

    return table.getAllColumns?.().at(0)
  }, [table])

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

  /**
   * Transforma o tipo de filtro em string.
   */
  const selectedType = useMemo(
    () => Array.from(type).join(', ').replace('_', ' '),
    [type]
  )

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-end">
          <div className="flex flex-grow gap-2 items-center">
            {selectedType === 'all' && (
              <DebouncedInput
                id="search-debounced-input"
                startContent={<Search className="text-default-500" />}
                placeholder={t('filter.search_by')}
                className="w-full sm:max-w-xs lg:max-w-sm"
                value={globalFilter ?? ''}
                onChange={(value) => setGlobalFilter(String(value ?? ''))}
                debounce={225}
              />
            )}
            {selectedType === 'first' && (
              <Input
                id="search-debounced-input"
                startContent={<Search className="text-default-500" />}
                placeholder={t('filter.search_by')}
                className="w-full sm:max-w-xs lg:max-w-sm"
                value={String(getFirstColumn?.getFilterValue() ?? '')}
                onValueChange={(value) => getFirstColumn?.setFilterValue(value)}
              />
            )}
            <div className="flex gap-2">
              <TableFilterButton type={type} setType={setType} />
              {asyncFn && (
                <TableDeleteButton
                  isDisabled={!table.getSelectedRowModel().rows.length}
                  handleDelete={handleDelete}
                />
              )}
            </div>
          </div>
          <div className="flex gap-3 self-end sm:self-auto">
            {toolbarButtons}
          </div>
        </div>
        <TablePageSize table={table} />
      </div>
    </>
  )
}
