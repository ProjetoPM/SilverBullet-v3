import { useTheme } from '@/contexts/theme-provider'
import { Button } from '@nextui-org/react'
import { Moon, Sun } from 'lucide-react'

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const handleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button onPress={handleTheme} variant="flat" className="z-50" isIconOnly>
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </Button>
  )
}
