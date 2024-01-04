import { Logo } from '@/@components/Logo'
import { frontend } from '@/routes/routes'
import {
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle
} from '@nextui-org/react'

type NavbarStartProps = {
  isMenuOpen: boolean
  shouldUseHref?: boolean
}

export const NavbarStart = ({
  isMenuOpen,
  shouldUseHref = true
}: NavbarStartProps) => {
  return (
    <NavbarContent>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className="h-full lg:hidden"
      />
      <NavbarBrand>
        <Link
          href={shouldUseHref ? frontend.workspaces.index : undefined}
          color="foreground"
          className="flex gap-2 rounded-md py-2"
        >
          <Logo className="hidden xs:flex" />
        </Link>
      </NavbarBrand>
    </NavbarContent>
  )
}
