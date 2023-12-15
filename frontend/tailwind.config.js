import { nextui } from '@nextui-org/react'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem'
      }
    },
    screens: {
      xss: '420px',
      xs: '520px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1436px',
    },
    extend: {}
  },
  darkMode: 'class',
  plugins: [
    typography,
    nextui({
      themes: {
        light: {},
        dark: {
          colors: {
            default: {
              50: '#141414',
              100: '#18181b',
              200: '#27272a'
            }
          }
        }
      },
      layout: {
        radius: {
          small: '6px',
          medium: '8px',
          large: '12px'
        }
      }
    })
  ]
}
