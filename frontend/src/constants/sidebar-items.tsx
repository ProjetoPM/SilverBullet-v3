import { frontend } from '@/routes/routes'
import { FolderOpen, Folders, UserCog } from 'lucide-react'

type SidebarItem = {
  id: string
  label?: string
  children: {
    id: string
    icon: React.ReactNode
    label: string
    description?: string
    href: string
  }[]
}

export const mainSidebarItems: SidebarItem[] = [
  {
    id: 'navigation',
    label: 'navigation.label',
    children: [
      {
        id: 'workspaces',
        icon: <Folders />,
        label: 'navigation.workspaces.label',
        href: frontend.workspaces.index
      },
      {
        id: 'projects',
        icon: <FolderOpen />,
        label: 'navigation.projects.label',
        href: frontend.projects.index
      }
    ]
  }
]

export const profileSidebarItems: SidebarItem[] = [
  {
    id: 'settings',
    label: 'settings.label',
    children: [
      {
        id: 'account',
        icon: <UserCog />,
        label: 'account.label',
        description: 'account.description',
        href: frontend.profile.account
      }
    ]
  }
]
