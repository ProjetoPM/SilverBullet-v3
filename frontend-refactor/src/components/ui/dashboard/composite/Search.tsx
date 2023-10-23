import { Input } from '@nextui-org/react'
import { Search as SearchIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

type DashboardInputProps = {
  search: string
  setSearch: (value: string) => void
}

export const Search = ({ search, setSearch }: DashboardInputProps) => {
  const { t } = useTranslation('menu')

  return (
    <Input
      id="dashboard-search"
      value={search}
      variant="underlined"
      color="primary"
      onChange={(e) => setSearch(e.target.value)}
      startContent={
        <SearchIcon className="w-5 h-5 top-1 text-foreground-500" />
      }
      placeholder={t('menu.search_by')}
      onClear={() => setSearch('')}
      classNames={{
        inputWrapper: 'rounded-b-none !pl-5 !pr-11 h-unit-12',
        clearButton: 'right-10'
      }}
      isClearable
      autoFocus
    />
  )
}
