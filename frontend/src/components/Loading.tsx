import { CircularProgress, CircularProgressProps } from '@nextui-org/react'

export const Loading = ({ ...props }: CircularProgressProps) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <CircularProgress aria-label="Loading..." {...props} />
    </div>
  )
}
