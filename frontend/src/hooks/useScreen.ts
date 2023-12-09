import { debounce } from 'lodash'
import { useCallback, useEffect, useState } from 'react'

type UseScreenProps = {
  delay?: number
}

export const useScreen = ({ delay = 100 }: UseScreenProps = {}) => {
  const [screenX, setScreenX] = useState(window.innerWidth)

  const getCurrentWidth = useCallback(() => {
    setScreenX(window.innerWidth)
  }, [])

  const isScreen = useCallback(
    (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
      switch (size) {
        case 'xs':
          return screenX < 576
        case 'sm':
          return screenX >= 576
        case 'md':
          return screenX >= 768
        case 'lg':
          return screenX >= 1024
        case 'xl':
          return screenX >= 1288
        default:
          return false
      }
    },
    [screenX]
  )

  const debouncedResize = debounce(getCurrentWidth, delay)

  useEffect(() => {
    window.addEventListener('resize', debouncedResize)
    return () => window.removeEventListener('resize', debouncedResize)
  }, [debouncedResize])

  return { screenX, isScreen }
}
