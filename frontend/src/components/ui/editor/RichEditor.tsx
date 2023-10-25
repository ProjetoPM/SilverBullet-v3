import { cn } from '@/lib/utils'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import { Underline } from '@tiptap/extension-underline'
import { EditorContent, EditorContentProps, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { forwardRef, useEffect, useId, useState } from 'react'
import { RichEditorChars } from './RichEditorChars'
import { RichEditorLabel } from './RichEditorLabel'
import { starterKitConfigs } from './config'
import { editorStyles, placeholderStyles } from './config/style'
import { BubbleMenu } from './menus/BubbleMenu'
import { FixedMenu } from './menus/FixedMenu'

type EditorProps = Omit<EditorContentProps, 'editor' | 'ref'> & {
  limit?: number
  isFixed?: boolean
  as?: 'textarea-3' | 'textarea-4' | 'textarea-5'
  onChange?: (content: string) => void
  label?: string
  errorMessage?: string
}

const getSizeTextarea = ({ as }: Pick<EditorProps, 'as'>) => {
  switch (as) {
    case 'textarea-3':
      return 'min-h-[5rem]'
    case 'textarea-4':
      return 'min-h-[6.25rem]'
    case 'textarea-5':
      return 'min-h-[7.5rem]'
  }
}

export const RichEditor = forwardRef<HTMLInputElement, EditorProps>(
  (
    {
      content,
      readOnly,
      value = '',
      isFixed = false,
      label,
      errorMessage,
      limit = 1000,
      ...props
    },
    ref
  ) => {
    const [fixed, setFixed] = useState(isFixed)
    const id = useId()

    const editor = useEditor(
      {
        editorProps: {
          attributes: {
            class: cn(editorStyles, getSizeTextarea({ as: props.as }) ?? ''),
            spellcheck: 'false'
          }
        },
        extensions: [
          StarterKit.configure({
            ...starterKitConfigs,
            heading: {
              levels: [1, 2]
            },
            history: {
              depth: 10
            }
          }),
          Typography,
          Placeholder.configure({
            placeholder: props.placeholder,
            emptyEditorClass: placeholderStyles
          }),
          CharacterCount.configure({
            limit
          }),
          Underline
        ],
        content: content,
        onUpdate: ({ editor }) => {
          props.onChange?.(editor.getHTML())
        },
        editable: !readOnly
      },
      []
    )

    /**
     * Update the placeholder after changing the language.
     */
    useEffect(() => {
      if (editor) {
        editor.extensionManager.extensions.filter(
          (extension) => extension.name === 'placeholder'
        )[0].options['placeholder'] = props.placeholder
        editor.view.dispatch(editor.state.tr)
      }
    }, [editor, props.placeholder])

    /**
     * Prevents the 'bubble menu' from closing when it is
     * not convenient.
     */
    useEffect(() => {
      const newValue = value?.toString()
      const oldValue = editor?.getHTML()

      if (newValue !== oldValue && editor) {
        editor.commands.setContent(value?.toString())
      }
    }, [editor, value])

    /**
     * Change between the bubble menu and fixed menu.
     */
    const handleFixed = () => {
      setFixed((previous) => !previous)
    }

    return (
      <div className={cn('h-full flex flex-col w-full', props.className)}>
        {label && <RichEditorLabel htmlFor={id} label={label} />}
        <div className="relative">
          {editor && (
            <>
              <FixedMenu
                isFixed={fixed}
                setFixed={handleFixed}
                editor={editor}
              />
              <BubbleMenu
                isFixed={fixed}
                setFixed={handleFixed}
                editor={editor}
              />
            </>
          )}
          <EditorContent
            className="[&>*]:data-[is-fixed=true]:rounded-t-none w-full"
            data-is-fixed={fixed}
            editor={editor}
          />
          {editor && (
            <>
              <RichEditorChars editor={editor} limit={limit} />
              <input
                id={id}
                {...props}
                className="absolute w-0 h-0 opacity-0"
                onFocus={() => editor.commands.focus()}
                tabIndex={-1}
                ref={ref}
              />
            </>
          )}
        </div>
        {errorMessage && (
          <p className="pt-1 px-1 text-tiny text-danger">{errorMessage}</p>
        )}
      </div>
    )
  }
)
