import { Button, ButtonProps, cn } from '@nextui-org/react'
import { Eye, EyeOff } from 'lucide-react'

type ToggleButtonProps = ButtonProps & {
  isVisible: boolean
  icons?: {
    visible: React.ReactNode
    hidden: React.ReactNode
  }
}

export const TogglePasswordButton = ({
  isVisible = false,
  className,
  icons,
  ...props
}: ToggleButtonProps) => {
  const _icons = {
    visible: icons?.visible ?? <Eye size={20} />,
    hidden: icons?.hidden ?? <EyeOff size={20} />
  }

  return (
    <Button
      type="button"
      className={cn(
        'focus:outline-none focus:text-neutral-400 text-neutral-500 hover:text-neutral-400',
        className
      )}
      size="sm"
      variant="light"
      isIconOnly
      {...props}
    >
      {isVisible ? _icons.visible : _icons.hidden}
    </Button>
  )
}
