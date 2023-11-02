import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { useMemo, useState } from 'react'
import { TableBottomContent } from './TableBottomContent'
import { TableTopContent } from './TableTopContent'

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
} & {
  toolbarButtons?: React.ReactNode
  asyncFn?: (ids: any) => Promise<void>
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  toolbarButtons,
  asyncFn
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  )

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
      globalFilter,
      rowSelection
    },
    debugTable: true
  })

  return (
    <>
      <Table
        aria-label="list table"
        isHeaderSticky
        topContent={
          <TableTopContent
            table={table}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            toolbarButtons={toolbarButtons}
            asyncFn={asyncFn}
          />
        }
        topContentPlacement="outside"
        bottomContent={<TableBottomContent table={table} />}
        bottomContentPlacement="outside"
        className="min-h-unit-24"
        classNames={{
          th: 'bg-default-100 dark:bg-default-200 min-w-max',
          tr: 'data-[selected=true]:bg-default-100 hover:bg-default-100 dark:data-[selected=true]:bg-default-200 dark:hover:bg-default-200',
          td: 'group-data-[first=true]:first:rounded-tl-lg group-data-[first=true]:last:rounded-tr-lg group-data-[last=true]:first:rounded-bl-lg group-data-[last=true]:last:rounded-br-lg'
        }}
      >
        <TableHeader>
          {table
            .getHeaderGroups()
            .flatMap((headerGroup) =>
              headerGroup.headers.map((header) => (
                <TableColumn key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableColumn>
              ))
            )}
        </TableHeader>
        <TableBody emptyContent={'No content.'}>
          {table.getRowModel().rows?.map((row) => (
            <TableRow
              key={row.id}
              data-selected={row.getIsSelected()}
              onClick={() => row.toggleSelected()}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
