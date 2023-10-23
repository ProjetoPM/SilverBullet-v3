import { useAuth } from '@/hooks/useAuth'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger
} from '@nextui-org/react'
import { FolderPlus, LogOut, Settings, User } from 'lucide-react'

export const UserDropdown = () => {
  const { signOut } = useAuth()

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button variant="flat" isIconOnly>
            <Settings className="w-5 h-5" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem
            key="email"
            className="gap-3 bg-default-300/20"
            textValue="email"
            startContent={<User className="w-5 h-5" />}
            showDivider
          >
            <p className="font-semibold">teste@teste.com</p>
          </DropdownItem>
          <DropdownItem
            key="profile"
            className="gap-3"
            textValue="profile"
            startContent={<User className="w-5 h-5" />}
          >
            <p className="font-semibold">Profile</p>
          </DropdownItem>
          <DropdownItem
            key="settings"
            className="gap-3"
            textValue="settings"
            startContent={<Settings className="w-5 h-5" />}
            showDivider
          >
            <p className="font-semibold">Settings</p>
          </DropdownItem>
          <DropdownItem
            key="workspace"
            className="gap-3"
            textValue="workspace"
            startContent={<FolderPlus className="w-5 h-5" />}
            showDivider
          >
            <p className="font-semibold">New Workspace</p>
          </DropdownItem>
          <DropdownSection>
            <DropdownItem
              key="logout"
              color="danger"
              variant="faded"
              startContent={<LogOut className="w-5 h-5" />}
              onClick={signOut}
              textValue="logout"
            >
              Logout
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
