import { HTMLMotionProps, motion } from 'framer-motion'
import { useCallback } from 'react'

type NotificationAnimateProps = HTMLMotionProps<'div'> & {
  children: React.ReactNode
  count?: number
}

export const NotificationAnimate = ({
  count,
  children,
  ...props
}: NotificationAnimateProps) => {
  const animation = useCallback(() => {
    return count && count > 0
      ? {
          rotateZ: [0, -20, 20, -20, 20, -20, 20, 0],
          transition: { duration: 0.75, repeat: Infinity, repeatDelay: 20 }
        }
      : {}
  }, [count])

  return (
    <motion.div initial={{ rotateZ: 0 }} animate={animation()} {...props}>
      {children}
    </motion.div>
  )
}
