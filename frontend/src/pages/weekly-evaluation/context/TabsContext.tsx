import { Key, ReactNode, createContext } from 'react'

type TabContextProps = {
  selected: Key
  setSelected: (key: Key) => void
}

type TabProviderProps = {
  value: TabContextProps
  children: ReactNode
}

export const TabContext = createContext<TabContextProps>({
  selected: 'evaluations',
  setSelected: () => {}
})

export const TabsWeeklyEvaluationProvider = ({
  value,
  children
}: TabProviderProps) => {
  return <TabContext.Provider value={value}>{children}</TabContext.Provider>
}

export const useTabsWeeklyEvaluation = () => {
  const context = TabContext

  if (context === undefined) {
    throw new Error(
      'useTabsWeeklyEvaluation must be used within a TabsWeeklyEvaluationProvider'
    )
  }
  return context
}
