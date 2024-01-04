import { getUser, useAuth } from '@/hooks/useAuth'
import { frontend } from '@/routes/routes'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger
} from '@nextui-org/react'
import { FolderPlus, LogOut, Settings, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const UserDropdown = () => {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button variant="flat" isIconOnly>
            <Settings className="w-5 h-5" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          className="max-w-[200px]"
        >
          <DropdownItem
            key="email"
            className="gap-3 bg-default-300/20 line-clamp-1"
            textValue="email"
            startContent={<User className="w-5 h-5" />}
            onPress={() =>
              navigator.clipboard.writeText(getUser().user ?? 'error')
            }
            showDivider
          >
            <span className="font-semibold">{getUser().user}</span>
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
            onPress={() => navigate(frontend.workspaces.new)}
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
              onPress={signOut}
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
