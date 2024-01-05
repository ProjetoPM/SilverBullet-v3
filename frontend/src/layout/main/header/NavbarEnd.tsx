import { LanguageSwitcher } from '@/@components/Features/LanguageSwitcher'
import { ThemeSwitcher } from '@/@components/Features/ThemeSwitcher'
import { DashboardMenu } from '@/@components/UI/Dashboard/DashboardMenu'
import { mainSidebarItems } from '@/constants/sidebar-items'
import { useDashboardStore } from '@/stores/useDashboardStore'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import {
  Button,
  Kbd,
  Link,
  NavbarContent,
  NavbarItem,
  NavbarMenu
} from '@nextui-org/react'
import { MenuIcon } from 'lucide-react'
import { Fragment, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import parser from 'ua-parser-js'
import { Notifications } from '../notifications/Notifications'
import { UserDropdown } from './UserDropdown'

export const NavbarEnd = () => {
  const { t } = useTranslation('sidebar')
  const workspace = useWorkspaceStore((state) => state.workspace)
  const isXs = useMediaQuery({ query: '(max-width: 520px)' })

  const [isOpen, onOpenChange] = useDashboardStore((state) => [
    state.isOpen,
    state.onOpenChange
  ])

  const handleOs = useMemo(() => {
    const select = {
      'Mac OS': '⌘ K',
      Windows: 'Ctrl K',
      Linux: 'Ctrl K',
      _: null
    }

    return select[parser(navigator.userAgent).os.name ?? '_']
  }, [])

  return (
    <>
      <NavbarContent justify="end" className="gap-2">
        <NavbarItem>
          <Notifications />
        </NavbarItem>
        <NavbarItem>
          <LanguageSwitcher />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <Button
            color="default"
            variant="flat"
            onPress={onOpenChange}
            isIconOnly={isXs}
          >
            <div className="hidden xs:flex gap-2 items-center">
              <span>Menu</span>
              {!isXs && (
                <Kbd className="bg-default-100 dark:bg-default-200">
                  {handleOs}
                </Kbd>
              )}
            </div>
            <MenuIcon size={20} className="xs:hidden" />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <UserDropdown />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {mainSidebarItems.map((division) => (
          <Fragment key={division.id}>
            <span className="pl-2 text-sm text-foreground-500">
              {t(division.label ?? '')}
            </span>
            {division.children?.map((item) => (
              <NavbarItem key={item.id} as={Link} href={item.href}>
                <Button
                  color="default"
                  variant="flat"
                  isDisabled={item.id === 'projects' && !workspace}
                  className="w-full flex justify-start"
                >
                  {item.icon}
                  <span className="ml-2">{t(item.label)}</span>
                </Button>
              </NavbarItem>
            ))}
          </Fragment>
        ))}
      </NavbarMenu>
      <DashboardMenu isOpen={isOpen} onOpenChange={onOpenChange} hasSearch />
    </>
  )
}
