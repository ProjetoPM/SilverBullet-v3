import { LocaleSwitcher } from '@/components/features/LocaleSwitcher'
import { ThemeSwitcher } from '@/components/features/ThemeSwitcher'
import { DashboardMenu } from '@/components/ui/dashboard/DashboardMenu'
import { sidebarItems } from '@/constants/sidebar-items'
import { useScreen } from '@/hooks/useScreen'
import {
  Button,
  Kbd,
  Link,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  useDisclosure
} from '@nextui-org/react'
import { MenuIcon } from 'lucide-react'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import parser from 'ua-parser-js'
import { UserDropdown } from './UserDropdown'

export const NavbarEnd = () => {
  const { isOpen, onOpenChange } = useDisclosure()
  const { screenX } = useScreen()
  const { t } = useTranslation('sidebar')

  const handleOs = () => {
    const os = parser(navigator.userAgent).os.name

    switch (os) {
      case 'Mac OS':
        return '⌘ K'
      case 'Windows':
        return 'Ctrl K'
      default:
        return ''
    }
  }

  return (
    <>
      <NavbarContent justify="end" className="gap-2">
        <NavbarItem>
          <LocaleSwitcher />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <Button
            color="default"
            variant="flat"
            onPress={onOpenChange}
            isIconOnly={screenX < 520}
          >
            <div className="hidden xs:flex gap-2 items-center">
              <span>Menu</span>
              {!!handleOs() && (
                <Kbd className="bg-default-100 dark:bg-default-200">
                  {handleOs()}
                </Kbd>
              )}
            </div>
            <div className="inline-flex xs:hidden">
              <MenuIcon size={20} />
            </div>
          </Button>
        </NavbarItem>
        <NavbarItem>
          <UserDropdown />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {sidebarItems.map((division) => (
          <Fragment key={division.id}>
            <span className="pl-2 text-sm text-foreground-500">
              {t(division.label ?? '')}
            </span>
            {division.children?.map((item) => (
              <NavbarItem key={item.id} as={Link} href={item.href}>
                <Button
                  color="default"
                  variant="flat"
                  href={item.href}
                  isDisabled={item.isHidden}
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
