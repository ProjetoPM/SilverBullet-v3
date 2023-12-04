import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const AuthFooter = () => {
  const { t } = useTranslation('auth')

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between mx-10">
      <small className="text-center text-xs">
        {t('footer.privacy_policy')}
      </small>
      <small className="text-center text-xs">
        <span>{t('footer.copyright')} &copy; </span>
        <Link to="https://lesse.com.br/site/">
          Silver Bullet, {new Date().getFullYear()}.{' '}
        </Link>
        <span>{t('footer.all_rights_reserved')}.</span>
      </small>
    </div>
  )
}
