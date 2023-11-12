import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { ArrowDown01, ArrowDownUp, ArrowUp10 } from 'lucide-react'
import { useState } from 'react'
import { useProcesses } from '../context/WeeklyReportProvider'

const items = [
  {
    key: 'ASC',
    label: 'processes.sort.asc',
    icon: <ArrowDown01 className="w-4 h-4" />
  },
  {
    key: 'DESC',
    label: 'processes.sort.desc',
    icon: <ArrowUp10 className="w-4 h-4" />
  }
]

export const SortProcesses = () => {
  const { t, sorting } = useProcesses()
  // const [selectedKeys, setSelectedKeys] = sorting
  const [selectedKeys, setSelectedKeys] = useState(new Set(['text']))

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
          items={items}
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={(key) => console.log(key)}
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