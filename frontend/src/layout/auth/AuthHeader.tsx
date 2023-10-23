import { Logo } from '@/components/Logo'
import { LocaleSwitcher } from '@/components/features/LocaleSwitcher'
import { ThemeSwitcher } from '@/components/features/ThemeSwitcher'

export const AuthHeader = () => {
  return (
    <div className="flex items-end justify-between mx-6 sm:mx-10">
      <div className="h-full flex items-end">
        <Logo />
      </div>
      <div className="flex gap-1">
        <LocaleSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  )
}
