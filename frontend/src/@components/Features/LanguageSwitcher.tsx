import { Lang } from '@/i18n'
import { cn } from '@/lib/utils'
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { Languages, Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

type Language = {
  code: Lang
  label: string
  link?: string
}

const langs: Language[] = [
  {
    code: 'en',
    label: 'English',
    link: 'https://flagcdn.com/us.svg'
  },
  {
    code: 'pt',
    label: 'Português',
    link: 'https://flagcdn.com/br.svg'
  }
]

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const resetZodErrors = () => {
    const elements = document.querySelectorAll(
      '[id^="react-aria"].text-tiny.text-danger'
    )
    for (const element of elements) {
      element.innerHTML = ''
    }
  }

  const setLanguage = (lang: Lang) => {
    if (lang !== i18n.language) {
      resetZodErrors()
    }

    i18n.changeLanguage(lang)
  }

  return (
    <div className="flex gap-2 z-50">
      <Dropdown placement="bottom-end" aria-label="select language">
        <DropdownTrigger>
          <Button variant="flat" isIconOnly>
            <Languages size={20} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="faded" aria-label="select language">
          {langs.map((lang) => (
            <DropdownItem
              key={lang.code}
              textValue={lang.code}
              startContent={
                <Avatar
                  fallback={<Loader2 className="animate-spin" />}
                  className="w-5 h-5"
                  src={lang.link}
                />
              }
              onPress={() => setLanguage(lang.code)}
              className={cn({ 'text-primary': lang.code === i18n.language })}
            >
              {lang.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
