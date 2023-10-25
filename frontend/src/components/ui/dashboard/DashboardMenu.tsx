import { dashboardItems } from '@/constants/dashboard-menu-items'
import { clearHTMLTags } from '@/utils/replace-html-tags'
import { Chip, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'
import { Fragment, startTransition, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AreaItem } from './composite/AreaItem'
import { DashboardModal } from './composite/ModalMenu'
import { PhaseItem } from './composite/PhaseItem'
import { Search } from './composite/Search'

type MenuProps = {
  isOpen: boolean
  hasSearch?: boolean
  onOpenChange: () => void
}

export const DashboardMenu = ({
  isOpen,
  hasSearch,
  onOpenChange
}: MenuProps) => {
  const { t } = useTranslation(['areas', 'phases', 'menu'])
  const [search, setSearch] = useState('')

  const filtered =
    search.length > 0
      ? dashboardItems
          .flatMap((area) =>
            area.phases.map((phase) => ({
              ...phase,
              area: area.name(),
              background: area.background,
              icon: area.icon,
              border: area.border
            }))
          )
          .filter(
            (phase) =>
              phase.name().toLowerCase().includes(search.toLowerCase()) ||
              phase.area.toLowerCase().includes(search.toLowerCase())
          )
      : undefined

  return (
    <>
      <DashboardModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              {hasSearch && isOpen && (
                <Search search={search} setSearch={setSearch} />
              )}
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2 pb-0 relative">
                  <h3 className="text-2xl">
                    {t(filtered ? 'phases:menu.title' : 'areas:menu.title')}
                  </h3>
                  <Chip
                    size="sm"
                    radius="full"
                    startContent={
                      <span className="hidden xss:inline-flex select-none bg-default-200 rounded-full py-0.5 px-2">
                        {t('menu:workspace.title')}
                      </span>
                    }
                    classNames={{
                      base: 'px-0 pr-2 bg-default-100',
                      content: 'px-1 select-none'
                    }}
                  >
                    {clearHTMLTags('Weekly Report')}
                  </Chip>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered?.length === 0 && (
                    <p className="text-center col-span-full pt-8 pb-12">
                      {t('menu.no_results')}
                    </p>
                  )}
                  {!filtered &&
                    dashboardItems.map((area) => (
                      <Fragment key={area.id}>
                        <AreaItem
                          onClick={() =>
                            startTransition(() => setSearch(area.name()))
                          }
                          item={{
                            ...area,
                            name: area.name()
                          }}
                        />
                      </Fragment>
                    ))}
                  {!!filtered?.length &&
                    filtered.map((phase) => (
                      <Fragment key={phase.id}>
                        <PhaseItem
                          item={{
                            ...phase,
                            name: phase.name()
                          }}
                        />
                      </Fragment>
                    ))}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </DashboardModal>
    </>
  )
}
