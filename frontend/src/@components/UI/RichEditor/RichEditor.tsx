import { cn } from '@/lib/utils'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import { forwardRef, lazy, useCallback, useEffect, useId, useRef } from 'react'
import { RichEditorLabel } from './RichEditorLabel'
import './config/default.css'
import { extensions } from './config/extensions'
import { editorStyles, placeholderStyles } from './config/style'

const RichEditorChars = lazy(() => import('./RichEditorChars'))
const BubbleMenu = lazy(() => import('./menus/BubbleMenu'))
const FixedMenu = lazy(() => import('./menus/FixedMenu'))

type EditorSizes = 3 | 4 | 5

type InputProps<T> = {
  value?: string | number | null
  onChange?: (...event: T[]) => void
}

export type RichEditorProps<T> = InputProps<T> & {
  placeholder?: string
  className?: string
  isReadOnly?: boolean
  label?: string
  errorMessage?: string
  isFixed?: boolean
  asNormalInput?: boolean
  options?: {
    limit?: number
    minRows?: EditorSizes
  }
}

const getSizeTextarea = (as?: EditorSizes) => {
  switch (as) {
    case 3:
      return 'min-h-[5rem]'
    case 4:
      return 'min-h-[6.25rem]'
    case 5:
      return 'min-h-[7.5rem]'
  }
}

export const RichEditor = forwardRef<
  HTMLInputElement,
  RichEditorProps<unknown>
>(
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
      asNormalInput = false,
      options: { limit = 1000, minRows } = {}
    },
    ref
  ) => {
    const id = useId()
    const isFixedRef = useRef(isFixed)

    const editor = useEditor(
      {
        content: String(value),
        onUpdate: ({ editor }) => {
          onChange?.(editor.getHTML())
        },
        editable: !isReadOnly,
        editorProps: {
          attributes: {
            class: cn(editorStyles, getSizeTextarea(minRows)),
            spellcheck: 'false'
          }
        },
        extensions: [
          ...extensions,
          Placeholder.configure({
            placeholder,
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
        )[0].options.placeholder = placeholder
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
      isFixedRef.current = !isFixedRef.current
      editor?.commands.focus()
    }, [editor])

    if (!editor) {
      return null
    }

    return (
      <div className={cn('h-full flex flex-col w-full', className)}>
        {label && <RichEditorLabel htmlFor={id} label={label} />}
        <div className="relative">
          {limit && <RichEditorChars editor={editor} limit={limit} />}
          <input
            id={id}
            className="absolute h-0 w-0 opacity-0"
            onFocus={() => editor.commands.focus()}
            ref={ref}
            tabIndex={-1}
          />
          {!asNormalInput && (
            <>
              <FixedMenu
                isFixed={isFixedRef.current}
                setFixed={handleFixed}
                editor={editor}
              />
              <BubbleMenu
                isFixed={isFixedRef.current}
                setFixed={handleFixed}
                editor={editor}
              />
            </>
          )}
          <EditorContent
            className="[&>*]:data-[is-fixed=true]:rounded-t-none"
            data-is-fixed={isFixedRef.current}
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

export default RichEditor
