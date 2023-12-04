import { profileSidebarItems } from '@/constants/sidebar-items'
import { Listbox, ListboxItem, ListboxSection, cn } from '@nextui-org/react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

export const ProfileSidebar = () => {
  const { t } = useTranslation('settings')
  const location = useLocation()

  return (
    <Listbox variant="flat" aria-label="Listbox menu" className="relative">
      {profileSidebarItems.map((division) => {
        return (
          <ListboxSection key={division.id} title={t(division.label ?? '')}>
            {division.children?.map((item) => {
              return (
                <ListboxItem
                  key={item.id}
                  textValue={t(item.label)}
                  description={t(item.description ?? '')}
                  startContent={item.icon}
                  classNames={{
                    base: cn('select-none', {
                      'bg-default-100': location.pathname.includes(item.href)
                    }),
                    title: cn({
                      'text-primary font-bold': location.pathname.includes(
                        item.href
                      )
                    }),
                    description: cn('flex line-clamp-1')
                  }}
                  href={item.href}
                >
                  {t(item.label)}
                </ListboxItem>
              )
            })}
          </ListboxSection>
        )
      })}
    </Listbox>
  )
}
