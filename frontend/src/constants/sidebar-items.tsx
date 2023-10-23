import { frontend } from '@/routes/routes'
import { FolderOpen, Folders } from 'lucide-react'

type SidebarItem = {
  id: string
  label?: string
  children: {
    id: string
    label: string
    description?: string
    icon: React.ReactNode
    href: string
    isHidden?: boolean
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
        description: 'navigation.workspaces.description',
        href: frontend.workspaces.index
      },
      {
        id: 'projects',
        icon: <FolderOpen />,
        label: 'navigation.projects.label',
        description: 'Not implemented yet',
        href: '#',
        isHidden: true
      }
    ]
  }
]
