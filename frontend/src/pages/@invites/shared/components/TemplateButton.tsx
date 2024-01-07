import { usePageLayout } from '@/layout/PageLayoutProvider'
import { Button } from '@nextui-org/react'
import { Download } from 'lucide-react'

type TemplateButtonProps = {
  template: string
}

export const TemplateButton = ({ template }: TemplateButtonProps) => {
  const { t } = usePageLayout()

  const downloadTemplate = () => {
    const blob = new Blob([template], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'template.csv'
    link.click()
  }

  return (
    <>
      <Button variant="flat" onPress={downloadTemplate}>
        <Download className="w-5 h-5" />
        {t('invites.download_template')}
      </Button>
    </>
  )
}
