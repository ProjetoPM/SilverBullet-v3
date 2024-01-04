import { Editor } from '@tiptap/react'
import { useTranslation } from 'react-i18next'

type RichEditorCharsProps = {
  editor: Editor | undefined
  limit?: number
}

export const RichEditorChars = ({
  editor,
  limit = 0
}: RichEditorCharsProps) => {
  const { t } = useTranslation('editor')

  if (!limit) {
    return null
  }

  const chars = editor?.storage.characterCount.characters() ?? 0
  const words = editor?.storage.characterCount.words() ?? 0

  return (
    <span className="absolute text-xs text-foreground-400 -top-6 right-0 selection:select-none">
      {`${chars}/${limit}`}
      <span className="hidden xss:inline-flex">
        &nbsp;{`${t('characters')} |`}&nbsp;
      </span>
      <span className="hidden xss:inline-flex">
        {words} {t(words > 1 ? 'words' : 'word')}
      </span>
    </span>
  )
}

export default RichEditorChars
