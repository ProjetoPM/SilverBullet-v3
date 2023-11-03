import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { Columns } from 'lucide-react'
import { useMemo } from 'react'
import { useDataTable } from '../context/DataTableProvider'

export const DataTableViewOptions = () => {
  const { t, table } = useDataTable()

  const getRowsVisible = useMemo(() => {
    console.log(table.getAllColumns().filter((column) => column.getIsVisible()))
    return table.getAllColumns().filter((column) => column.getIsVisible())
  }, [table])

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="flat"
          startContent={<Columns className="h-5 w-5" />}
          className="ml-auto gap-2 text-foreground-500"
        >
          {t('default:Colunas')}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        selectionMode="multiple"
        aria-label="Select the columns to show"
        selectedKeys={getRowsVisible.map((column) => column.id)}
        // selectedKeys={selectedValue}
        // onSelectionChange={(key) => setSelectedKeys(key as Set<string>)}
        onAction={(key) => table.getColumn(String(key))?.toggleVisibility()}
      >
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return <DropdownItem key={column.id}>{column.id}</DropdownItem>
          })}
      </DropdownMenu>
    </Dropdown>
  )
}
