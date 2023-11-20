import { sidebarItems } from '@/constants/sidebar-items'
import { cn } from '@/lib/utils'
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

export const Sidebar = () => {
  const { t } = useTranslation('sidebar')
  const location = useLocation()

  return (
    <div className="w-full border-r-1 px-3 py-2.5 border-default-200 dark:border-default-100">
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
                        className={cn(
                          "flex before:content-['└'] before:pr-1 line-clamp-1",
                          { 'text-white/40': item.isHidden }
                        )}
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
                      base: cn({
                        'bg-default-100': location.pathname.includes(item.href),
                        'text-white/40 data-[hover=true]:text-white/40':
                          item.isHidden
                      }),
                      title: cn({
                        'text-primary font-bold': location.pathname.includes(
                          item.href
                        )
                      })
                    }}
                    href={item.href}
                    isReadOnly={item.isHidden}
                  >
                    {t(item.label)}
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
