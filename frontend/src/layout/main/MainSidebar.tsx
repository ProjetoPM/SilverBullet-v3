import { mainSidebarItems } from '@/constants/sidebar-items'
import { cn } from '@/lib/utils'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { ct } from '@/utils/helpers/replace-html-tags'
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/react'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

export const MainSidebar = () => {
  const { t } = useTranslation('sidebar')
  const location = useLocation()

  const [workspace, project] = useWorkspaceStore((state) => [
    state.workspace,
    state.project
  ])

  const sidebarDescription = useMemo(
    () => ({
      workspaces: workspace?.name ?? t('navigation.workspaces.description'),
      projects: project?.name ?? t('navigation.projects.description')
    }),
    [workspace?.name, project?.name, t]
  )

  const isProjectHidden = useCallback(
    (id: string) => {
      return id === 'projects' && !workspace
    },
    [workspace]
  )

  return (
    <Listbox variant="flat" aria-label="Listbox menu" className="relative">
      {mainSidebarItems.map((division) => {
        return (
          <ListboxSection key={division.id} title={t(division.label ?? '')}>
            {division.children?.map((item) => {
              return (
                <ListboxItem
                  key={item.id}
                  textValue={t(item.label)}
                  description={ct(
                    sidebarDescription[
                      item.id as keyof typeof sidebarDescription
                    ]
                  )}
                  startContent={item.icon}
                  className={cn(
                    'w-full h-full',
                    isProjectHidden(item.id) && 'cursor-not-allowed'
                  )}
                  classNames={{
                    base: cn('select-none', {
                      'bg-default-100': location.pathname.includes(item.href),
                      'text-white/40 data-[hover=true]:text-white/40':
                        isProjectHidden(item.id)
                    }),
                    title: cn({
                      'text-primary font-bold': location.pathname.includes(
                        item.href
                      )
                    }),
                    description: cn(
                      "flex before:content-['└'] before:pr-1 line-clamp-1",
                      { 'text-white/40': isProjectHidden(item.id) }
                    )
                  }}
                  href={!isProjectHidden(item.id) ? item.href : undefined}
                  isReadOnly={isProjectHidden(item.id)}
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

export default MainSidebar
