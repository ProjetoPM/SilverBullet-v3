import { nextui } from '@nextui-org/react'
import typography from '@tailwindcss/typography'
import defaultTheme from 'tailwindcss/defaultTheme'

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
        DEFAULT: '1rem',
      }
    },
    screens: {
      'base': '100%',
      'xss': { min: '420px' },
      'xs': { min: '520px' },
      ...defaultTheme.screens
    },
    extend: {}
  },
  darkMode: "class",
  plugins: [
    typography,
    nextui({
      themes: {
        light: {},
        dark: {
          colors: {
            default: {
              "50": "#101010",
              "100": "#18181b",
              "200": "#27272a",
            },
          }
        },
      },
      layout: {
        radius: {
          small: '6px',
          medium: '8px',
          large: '12px'
        },
      },
    })
  ]
}
