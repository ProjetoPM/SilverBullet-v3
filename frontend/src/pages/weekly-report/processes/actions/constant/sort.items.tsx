import { ArrowDown01, ArrowUp10 } from 'lucide-react'
import { SortItem } from '../../context/ProcessProvider'

type SortItemProps = {
  key: SortItem
  label: string
  icon: JSX.Element
}

export const SORT_ITEMS: SortItemProps[] = [
  {
    key: 'DESC',
    label: 'processes.sort.desc',
    icon: <ArrowUp10 className="w-4 h-4" />
  },
  {
    key: 'ASC',
    label: 'processes.sort.asc',
    icon: <ArrowDown01 className="w-4 h-4" />
  }
]
