import { Card, CardBody, CardHeader, Link, cn } from '@nextui-org/react'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

export type AreaItemProps = {
  item: {
    icon: React.ReactNode
    name: string
    description: string
    background?: string
    border?: string
  }
  onClick: () => void
}

export const AreaItem = ({ item, onClick }: AreaItemProps) => {
  const { t } = useTranslation('areas')

  const handleClick = () => {
    onClick()
    document.getElementById('dashboard-search')?.focus()
  }

  return (
    <Link className="cursor-pointer" onPress={handleClick}>
      <Card
        className={cn(
          'z-50 hover:scale-105 border-l-[6px] h-full w-full group',
          item.border
        )}
        radius="sm"
        shadow={'sm'}
        onClick={() => console.log('hasidhuashd')}
      >
        <CardHeader className="px-5">
          <h3 className="flex gap-2 items-center text-xl">
            {item.icon}
            {t(item.name)}
          </h3>
        </CardHeader>
        <CardBody className="pt-1">
          <p lang={i18next.language} className="line-clamp-3">
            {t(item.description)}
          </p>
        </CardBody>
      </Card>
    </Link>
  )
}
