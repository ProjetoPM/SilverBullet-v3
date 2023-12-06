import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import Typography from '@tiptap/extension-typography'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import i18next from 'i18next'

export const extensions = [
  StarterKit.configure({
    blockquote: false,
    codeBlock: false,
    horizontalRule: false,
    code: false,
    heading: {
      levels: [1, 2]
    },
    history: {
      depth: 10
    },
    paragraph: {
      HTMLAttributes: {
        class: 'break-normal hyphens-auto',
        lang: i18next.language
      }
    }
  }),
  Typography,
  Highlight.configure({
    HTMLAttributes: {
      class: 'bg-yellow-300 rounded-md px-1'
    }
  }),
  Link.configure({
    protocols: ['http', 'https'],
    validate: (url) => {
      return url.startsWith('http://') || url.startsWith('https://')
    },
    autolink: false,
    openOnClick: false,
    HTMLAttributes: {
      class: 'text-blue-500 hover:underline'
    }
  }),
  Underline
]
