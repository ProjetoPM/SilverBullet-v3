import { Navbar, useDisclosure } from '@nextui-org/react'
import { NavbarEnd } from './NavbarEnd'
import { NavbarStart } from './NavbarStart'

export const Header = () => {
  const { isOpen, onOpenChange } = useDisclosure()

  return (
    <header>
      <Navbar
        isMenuOpen={isOpen}
        onMenuOpenChange={onOpenChange}
        isBlurred={false}
        className="overflow-y-auto"
        classNames={{
          wrapper: 'max-w-full md:max-w-screen-2xl mx-auto px-6'
        }}
        isBordered
      >
        <NavbarStart isMenuOpen={isOpen} />
        <NavbarEnd />
      </Navbar>
    </header>
  )
}
