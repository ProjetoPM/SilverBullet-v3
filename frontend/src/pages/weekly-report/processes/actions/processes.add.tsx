import { Button } from '@nextui-org/react'
import { PlusCircle } from 'lucide-react'
import { useProcesses } from '../context/WeeklyReportProvider'

export const AddProcesses = () => {
  const { t, array } = useProcesses()

  const handleAddProcess = () => {
    array.append({
      group: '',
      name: '',
      description: '',
      filesFolder: undefined
    })
  }

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-lg">{t('process.title')}</span>
      <Button
        type="button"
        variant="light"
        className="text-green-600 rounded-full hover:text-green-700"
        onClick={handleAddProcess}
        isIconOnly
      >
        <PlusCircle className="w-6 h-6" />
      </Button>
    </div>
  )
}
