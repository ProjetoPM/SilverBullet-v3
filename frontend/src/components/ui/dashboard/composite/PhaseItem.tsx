import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Link,
  cn
} from '@nextui-org/react'
import { useTranslation } from 'react-i18next'

type PhaseItemProps = {
  item: {
    id: string
    name: string
    description?: string
    badges: [string, string?]
    to?: string
    area: string
    background?: string
    icon: React.ReactNode
    border?: string
  }
}

export const PhaseItem = ({ item }: PhaseItemProps) => {
  const { t } = useTranslation(['areas', 'phases', 'description'])

  return (
    <Link href={item.to} className="cursor-pointer rounded-md">
      <Card
        className={cn(
          'hover:scale-105 border-l-[6px] h-full w-full',
          item.border
        )}
        radius="sm"
        shadow={'sm'}
      >
        <CardHeader className="px-5">
          <h3 className="flex gap-2 items-center text-lg">
            <div className="min-w-max">{item.icon}</div>
            <span>{item.name}</span>
          </h3>
        </CardHeader>
        <CardBody className="pt-1 pb-1 flex flex-col justify-between gap-2">
          <span className="line-clamp-2">{t(item.description ?? '')}</span>
        </CardBody>
        <CardFooter className="gap-1">
          <Chip size="sm" className={item?.background}>
            {t(item.area)}
          </Chip>
          {item.badges.map((badge) => {
            return (
              <Chip size="sm" key={badge} variant={'flat'}>
                {t(`phases:${badge}`)}
              </Chip>
            )
          })}
        </CardFooter>
      </Card>
    </Link>
  )
}
