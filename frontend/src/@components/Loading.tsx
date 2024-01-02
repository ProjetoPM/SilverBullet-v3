import { CircularProgress, CircularProgressProps, cn } from '@nextui-org/react'

export const Loading = ({ className, ...props }: CircularProgressProps) => {
  return (
    <div
      className={cn(
        'w-full h-screen flex items-center justify-center',
        className
      )}
    >
      <CircularProgress aria-label="Loading..." {...props} />
    </div>
  )
}
