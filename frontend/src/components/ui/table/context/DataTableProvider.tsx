import { Table } from '@tanstack/react-table'
import { TFunction } from 'i18next'
import { ReactNode, createContext, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

type FilterProps = {
  search: boolean
  pagination: boolean
  visibility: boolean
}

export type DataTableContext<TData> = {
  table: Table<TData>
  asyncFn?: (ids: any) => Promise<void>
  filter: FilterProps
  toggleFilter: (filter: keyof FilterProps) => void
  t: TFunction<'table', undefined>
}

type DataTableProviderProps<TData> = {
  children: ReactNode
  value: Omit<DataTableContext<TData>, 'filter' | 'toggleFilter' | 't'>
}

export const DataTableContext = createContext<DataTableContext<any> | null>(
  null
)

export const DataTableProvider = <T,>({
  children,
  value
}: DataTableProviderProps<T>) => {
  const { t } = useTranslation('table')

  const [filter, setFilter] = useState<FilterProps>({
    search: true,
    pagination: true,
    visibility: true
  })

  const toggleFilter = (filter: keyof FilterProps) => {
    setFilter((prev) => ({ ...prev, [filter]: !prev[filter] }))
  }

  return (
    <DataTableContext.Provider value={{ ...value, t, filter, toggleFilter }}>
      {children}
    </DataTableContext.Provider>
  )
}

export const useDataTable = <TData,>() => {
  const context = useContext(DataTableContext) as DataTableContext<TData>

  if (!context) {
    throw new Error('useDataTable must be used within a DataTableProvider')
  }

  return context
}
