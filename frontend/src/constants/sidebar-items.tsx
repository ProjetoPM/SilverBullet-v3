import { frontend } from '@/routes/routes'
import { FolderOpen, Folders } from 'lucide-react'

type SidebarItem = {
  id: string
  label?: string
  children: {
    id: string
    icon: React.ReactNode
    label: string
    href: string
  }[]
}

export const sidebarItems: SidebarItem[] = [
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
