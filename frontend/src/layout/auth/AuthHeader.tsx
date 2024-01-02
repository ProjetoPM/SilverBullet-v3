import { LanguageSwitcher } from '@/components/Features/LanguageSwitcher'
import { Logo } from '@/components/Logo'
import { ThemeSwitcher } from '@/components/Features/ThemeSwitcher'

export const AuthHeader = () => {
  return (
    <header className="flex items-end justify-between mx-6 sm:mx-10 h-full">
      <div className="h-full flex items-end">
        <Logo />
      </div>
      <div className="flex items-center gap-1.5">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  )
}
