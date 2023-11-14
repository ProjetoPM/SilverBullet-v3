import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { ArrowDownUp } from 'lucide-react'
import { SortItem, useProcesses } from '../context/ProcessProvider'
import { SORT_ITEMS } from './constant/sort.items'

export const SortProcesses = () => {
  const { t, sorting } = useProcesses()
  const [selectedKeys, setSelectedKeys] = sorting

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="light"
            radius="lg"
            className="text-foreground-500"
            isIconOnly
          >
            <ArrowDownUp className="w-5 h-5" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          items={SORT_ITEMS}
          aria-label="Sort selection"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={(key) => setSelectedKeys(key as Set<SortItem>)}
        >
          {(item) => (
            <DropdownItem key={item.key} startContent={item.icon}>
              {t(item.label)}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
