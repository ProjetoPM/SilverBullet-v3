import {
  Badge,
  Button,
  Listbox,
  ListboxItem,
  ListboxSection,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@nextui-org/react'
import { Bell, FolderLock, FolderSymlink } from 'lucide-react'
import { NotificationActions } from './NotificationActions'
import { NotificationAnimate } from './NotificationAnimate'
import { NotificationLabel } from './NotificationLabel'

const notifications = {
  count: 10,
  items: {
    workspaces: {
      label: 'Workspaces',
      items: [
        {
          title: 'Workspace 1'
        },
        {
          title: 'Workspace 2'
        }
      ]
    },
    projects: {
      label: 'Projects',
      items: [
        {
          title: 'Project 1'
        },
        {
          title: 'Project 2'
        }
      ]
    }
  }
}

export const Notifications = () => {
  return (
    <Popover placement="bottom" showArrow>
      <Badge
        content={notifications.count > 9 ? '9+' : notifications.count}
        isInvisible={notifications.count === 0}
        size={notifications.count > 9 ? 'sm' : 'md'}
        color="danger"
        className="z-50"
      >
        <PopoverTrigger>
          <Button variant="flat" isIconOnly>
            <NotificationAnimate
              count={notifications.count}
              className="flex items-center justify-center"
            >
              <Bell className="w-5 h-5" />
            </NotificationAnimate>
          </Button>
        </PopoverTrigger>
      </Badge>
      <PopoverContent>
        <div className="flex flex-col p-2 max-h-full sm:max-h-[40rem] overflow-auto">
          <Listbox variant="flat" aria-label="Listbox workspaces notifications">
            <ListboxSection title={notifications.items.workspaces.label}>
              {notifications.items.workspaces.items.map((item, index) => (
                <ListboxItem
                  key={item.title}
                  textValue={item.title}
                  description={'Accept or decline the invitation'}
                  startContent={<FolderLock />}
                  endContent={<NotificationActions />}
                  showDivider={
                    index < notifications.items.workspaces.items.length - 1
                  }
                >
                  <NotificationLabel color="green" {...item} />
                </ListboxItem>
              ))}
            </ListboxSection>
          </Listbox>
          <Listbox variant="flat" aria-label="Listbox projects notifications">
            <ListboxSection title={notifications.items.projects.label}>
              {notifications.items.projects.items.map((item, index) => (
                <ListboxItem
                  key={item.title}
                  textValue={item.title}
                  description={'Accept or decline the invitation'}
                  startContent={<FolderSymlink />}
                  endContent={<NotificationActions />}
                  showDivider={
                    index < notifications.items.projects.items.length - 1
                  }
                >
                  <NotificationLabel color="blue" {...item} />
                </ListboxItem>
              ))}
            </ListboxSection>
          </Listbox>
        </div>
      </PopoverContent>
    </Popover>
  )
}
