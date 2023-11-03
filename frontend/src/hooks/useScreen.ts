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

  const debouncedResize = debounce(getCurrentWidth, delay)

  useEffect(() => {
    window.addEventListener('resize', debouncedResize)
    return () => window.removeEventListener('resize', debouncedResize)
  }, [debouncedResize])

  return { screenX }
}
