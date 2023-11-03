import { Column } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ChevronDownSquare, EyeOff } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  header: React.ReactNode | string
}

export const DataTableColumnHeader = <TData, TValue>({
  column,
  header,
  className
}: DataTableColumnHeaderProps<TData, TValue>) => {
  const { t } = useTranslation()

  const headerIcons = useCallback(
    () => (
      <>
        {column.getIsSorted() === 'desc' && <ArrowDown className="h-4 w-4" />}
        {column.getIsSorted() === 'asc' && <ArrowUp className="h-4 w-4" />}
        {column.getIsSorted() !== 'asc' && column.getIsSorted() !== 'desc' && (
          <ChevronDownSquare className="h-4 w-4" />
        )}
      </>
    ),
    [column]
  )

  return (
    <div className={cn('flex items-center space-x-2 min-w-max', className)}>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button variant="light" radius="sm" className="px-1">
            <span className="text-tiny text-foreground-500">{header}</span>
            {headerIcons()}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="table header actions"
          variant="flat"
          className="max-w-[200px]"
        >
          <DropdownItem
            key="asc"
            onPress={() => column.toggleSorting(false)}
            startContent={<ArrowUp className="h-4 w-4" />}
          >
            {t('asc')}
          </DropdownItem>
          <DropdownItem
            key="desc"
            onPress={() => column.toggleSorting(true)}
            startContent={<ArrowDown className="h-4 w-4" />}
          >
            {t('desc')}
          </DropdownItem>
          <DropdownItem
            key="hide-column"
            onPress={() => column.toggleVisibility(false)}
            startContent={<EyeOff className="h-4 w-4" />}
          >
            {t('hide_column')}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}