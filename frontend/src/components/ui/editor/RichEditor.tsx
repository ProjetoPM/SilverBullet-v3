import { cn } from '@/lib/utils'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import { forwardRef, useCallback, useEffect, useId, useState } from 'react'
import { RichEditorChars } from './RichEditorChars'
import { RichEditorLabel } from './RichEditorLabel'
import './config/default.css'
import { extensions } from './config/extensions'
import { editorStyles, placeholderStyles } from './config/style'
import { BubbleMenu } from './menus/BubbleMenu'
import { FixedMenu } from './menus/FixedMenu'

type EditorSizes = 'textarea-3' | 'textarea-4' | 'textarea-5'

type InputProps<T> = {
  value?: string | number | null
  onChange?: (...event: T[]) => void
}

type EditorProps<T> = InputProps<T> & {
  placeholder?: string
  className?: string
  isReadOnly?: boolean
  label?: string
  errorMessage?: string
  isFixed?: boolean
  options?: {
    limit?: number
    size?: EditorSizes
  }
}

const getSizeTextarea = (as?: EditorSizes) => {
  switch (as) {
    case 'textarea-3':
      return 'min-h-[5rem]'
    case 'textarea-4':
      return 'min-h-[6.25rem]'
    case 'textarea-5':
      return 'min-h-[7.5rem]'
  }
}

export const RichEditor = forwardRef<HTMLInputElement, EditorProps<unknown>>(
  (
    {
      value,
      onChange,
      label,
      errorMessage,
      isReadOnly = false,
      placeholder,
      className,
      isFixed = false,
      options: { limit = 1000, size } = {}
    },
    ref
  ) => {
    const id = useId()
    const [fixed, setFixed] = useState(isFixed)

    const editor = useEditor(
      {
        content: String(value),
        onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
        editable: !isReadOnly,
        editorProps: {
          attributes: {
            class: cn(editorStyles, getSizeTextarea(size)),
            spellcheck: 'false'
          }
        },
        extensions: [
          ...extensions,
          Placeholder.configure({
            placeholder: placeholder,
            emptyEditorClass: placeholderStyles
          }),
          CharacterCount.configure({
            limit
          })
        ]
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
        )[0].options['placeholder'] = placeholder
        editor.view.dispatch(editor.state.tr)
      }
    }, [editor, placeholder])

    /**
     * Prevents the 'bubble menu' from closing when it is
     * not convenient.
     */
    useEffect(() => {
      const newValue = value?.toString()
      const oldValue = editor?.getHTML()

      if (newValue !== oldValue && editor) {
        editor.commands.setContent(value?.toString() ?? '')
      }
    }, [editor, value])

    /**
     * Change between the bubble menu and fixed menu.
     */
    const handleFixed = useCallback(() => {
      setFixed((previous) => !previous)
      editor?.commands.focus()
    }, [editor])

    return (
      <div className={cn('h-full flex flex-col w-full', className)}>
        {label && <RichEditorLabel htmlFor={id} label={label} />}
        <div className="relative">
          {editor && (
            <>
              <RichEditorChars editor={editor} limit={limit} />
              <input
                id={id}
                className="hidden"
                onFocus={() => editor.commands.focus()}
                tabIndex={-1}
                ref={ref}
                autoComplete="off"
              />
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
            className="[&>*]:data-[is-fixed=true]:rounded-t-none"
            data-is-fixed={fixed}
            editor={editor}
          />
        </div>
        {errorMessage && (
          <p className="pt-1 px-1 text-tiny text-danger">{errorMessage}</p>
        )}
      </div>
    )
  }
)
