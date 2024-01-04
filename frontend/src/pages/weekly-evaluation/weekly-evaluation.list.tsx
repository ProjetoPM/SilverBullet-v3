import { usePageUtils } from '@/hooks/usePageUtils'
import { Tab, Tabs } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { Key } from 'react-aria'
import { useSearchParams } from 'react-router-dom'
import { TabsWeeklyEvaluationProvider } from './context/TabsContext'
import { TabEvaluations } from './tabs/evaluations/tab.evaluations.list'
import { TabMetrics } from './tabs/metrics/tab.metrics.list'
import { TabSubmissions } from './tabs/submissions/tab.submissions.list'

export default function WeeklyEvaluationListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { t } = usePageUtils('weekly-evaluation')

  const [selected, setSelected] = useState<Key>(
    () => searchParams.get('tab') || 'evaluations'
  )

  const handleSelectionChange = (key: Key) => {
    setSelected(key)
    setSearchParams({ tab: key as string })
  }

  useEffect(() => {
    setSelected(searchParams.get('tab') || 'evaluations')
  }, [searchParams])

  return (
    <TabsWeeklyEvaluationProvider
      value={{
        selected,
        setSelected: (key) => handleSelectionChange(key as Key)
      }}
    >
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={handleSelectionChange}
        color="primary"
        className="mt-5"
      >
        <Tab key="evaluations" title={t('tabs.evaluations.label')}>
          <TabEvaluations />
        </Tab>
        <Tab key="submissions" title={t('tabs.submissions.label')}>
          <TabSubmissions />
        </Tab>
        <Tab key="metrics" title={t('tabs.metrics.label')}>
          <TabMetrics />
        </Tab>
      </Tabs>
    </TabsWeeklyEvaluationProvider>
  )
}
