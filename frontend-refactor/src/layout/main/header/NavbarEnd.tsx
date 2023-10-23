import { LocaleSwitcher } from '@/components/features/LocaleSwitcher'
import { ThemeSwitcher } from '@/components/features/ThemeSwitcher'
import { DashboardMenu } from '@/components/ui/dashboard/DashboardMenu'
import {
  Button,
  Kbd,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  useDisclosure
} from '@nextui-org/react'
import { MenuIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import parser from 'ua-parser-js'
import { UserDropdown } from './UserDropdown'

export const NavbarEnd = () => {
  const { isOpen, onOpenChange } = useDisclosure()
  const [screenX, setScreenX] = useState(window.innerWidth)

  useEffect(() => {
    const down = () => {
      setScreenX(window.innerWidth)
    }

    window.addEventListener('resize', down)

    return () => {
      window.removeEventListener('resize', down)
    }
  }, [screenX])

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
            onClick={onOpenChange}
            isIconOnly={screenX < 520}
          >
            <div className="hidden xs:flex gap-2 items-center">
              <span>Menu</span>
              <Kbd className="bg-default-100 dark:bg-default-200">
                {handleOs()}
              </Kbd>
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
        <NavbarItem>Nothing yet.</NavbarItem>
      </NavbarMenu>
      <DashboardMenu isOpen={isOpen} onOpenChange={onOpenChange} hasSearch />
    </>
  )
}
