import { Link } from '@nextui-org/react'
import { useTranslation } from 'react-i18next'

export const AuthFooter = () => {
  const { t } = useTranslation('auth')

  return (
    <footer className="flex flex-col items-center md:flex-row md:items-start md:justify-between mx-10">
      <small className="text-center text-xs">
        {t('footer.privacy_policy')}
      </small>
      <small className="text-center text-xs flex flex-wrap justify-center gap-0.5">
        <span>{t('footer.copyright')} &copy; </span>
        <Link
          href="https://lesse.com.br/site/"
          className="text-xs"
          color="foreground"
          underline="hover"
          isExternal
        >
          Silver Bullet, {new Date().getFullYear()}.
        </Link>
        <span>{t('footer.all_rights_reserved')}.</span>
      </small>
    </footer>
  )
}
