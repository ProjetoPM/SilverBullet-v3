import { sidebarItems } from '@/constants/sidebar-items'
import { cn } from '@/lib/utils'
import { Link, Listbox, ListboxItem, ListboxSection } from '@nextui-org/react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

export const Sidebar = () => {
  const { t } = useTranslation('sidebar')
  const location = useLocation()

  return (
    <div className="w-full min-w-[250px] border-r-1 px-3 py-2.5 border-default-200 dark:border-default-100">
      <Listbox variant="flat" aria-label="Listbox menu" className="relative">
        {sidebarItems.map((division) => {
          return (
            <ListboxSection key={division.id} title={t(division.label ?? '')}>
              {division.children?.map((item) => {
                return (
                  <ListboxItem
                    key={item.id}
                    textValue={t(item.label)}
                    description={
                      <span
                        className="flex before:content-['└'] before:pr-1 line-clamp-1"
                        id={item.id}
                      >
                        {t(item.description ?? '')}
                      </span>
                    }
                    startContent={item.icon}
                    className={cn(
                      'w-full h-full',
                      item.isHidden && 'cursor-not-allowed'
                    )}
                    classNames={{
                      base: cn(
                        location.pathname === item.href && 'bg-default-100'
                      )
                    }}
                  >
                    <Link
                      href={item.href}
                      color="foreground"
                      className="w-full h-full"
                      isDisabled={item.isHidden}
                    >
                      {t(item.label)}
                    </Link>
                  </ListboxItem>
                )
              })}
            </ListboxSection>
          )
        })}
      </Listbox>
    </div>
  )
}
