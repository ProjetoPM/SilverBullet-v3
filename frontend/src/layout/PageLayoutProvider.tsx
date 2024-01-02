import { i18n } from 'i18next'
import { createContext, useContext } from 'react'

type PageLayoutContextValue = {
  t: i18n['t']
  ns?: string | string[]
}

const PageLayoutContext = createContext<PageLayoutContextValue>(
  {} as PageLayoutContextValue
)

type PageLayoutProviderProps = PageLayoutContextValue & {
  children: React.ReactNode
}

export const PageLayoutProvider = ({
  children,
  ...props
}: PageLayoutProviderProps) => {
  return (
    <PageLayoutContext.Provider value={{ ...props }}>
      {children}
    </PageLayoutContext.Provider>
  )
}

export const usePageLayout = () => {
  const context = useContext(PageLayoutContext)

  if (context === undefined) {
    throw new Error('usePageLayout must be used within a PageLayoutProvider')
  }

  return context
}
