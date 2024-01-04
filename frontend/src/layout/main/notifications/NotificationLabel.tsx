import { cn } from '@nextui-org/react'

type NotificationItemProps = {
  color?: 'blue' | 'green'
  title: string
}

export const NotificationLabel = ({ title, color }: NotificationItemProps) => {
  return (
    <div className="flex gap-4 items-center mb-1 min-w-max">
      <span className="flex flex-col text-sm">
        <span className="select-none">
          {"You're invited to join the following Workspace: "}
        </span>
        <div
          className={cn('font-bold indent-4', {
            'text-blue-600': color === 'blue',
            'text-green-600': color === 'green'
          })}
        >
          {title}
        </div>
      </span>
    </div>
  )
}
