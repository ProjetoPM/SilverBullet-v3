import { AnimationProps, motion } from 'framer-motion'

type AnimateFiltersProps = AnimationProps & {
  children: React.ReactNode
}

export const AnimateFilters = ({ children, ...props }: AnimateFiltersProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
