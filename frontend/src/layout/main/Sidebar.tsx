import { sidebarItems } from '@/constants/sidebar-items'
import { cn } from '@/lib/utils'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { clearHTMLTags } from '@/utils/helpers/replace-html-tags'
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/react'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

export const Sidebar = () => {
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
                    description={clearHTMLTags(
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
    </div>
  )
}
