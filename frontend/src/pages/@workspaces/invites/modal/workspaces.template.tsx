import { Button } from '@nextui-org/react'
import { Download } from 'lucide-react'
import { useCallback } from 'react'
import { template } from './template'
import { useWorkspaceInvites } from '../context/WorkspaceInviteContext'

export const WorkspaceTemplateButton = () => {
  const { t } = useWorkspaceInvites()

  const downloadTemplate = useCallback(() => {
    const blob = new Blob([template], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'template.csv'
    link.click()
  }, [])

  return (
    <>
      <Button variant="flat" onPress={downloadTemplate}>
        <Download className="w-5 h-5" />
        {t('invites.download_template')}
      </Button>
    </>
  )
}
