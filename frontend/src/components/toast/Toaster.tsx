import { Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import toast, {
  ToastIcon,
  Toaster,
  ToasterProps,
  resolveValue
} from 'react-hot-toast'

export const ToasterContainer = ({ ...props }: ToasterProps) => {
  return (
    <Toaster gutter={8} position="bottom-right" {...props}>
      {(t) => (
        <>
          <Transition
            appear
            show={t.visible}
            className="flex items-center justify-center gap-2 py-3 px-4 transform bg-white dark:bg-default-100 rounded-md shadow-lg"
            enter="transition-all duration-150"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="transition-all duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-75"
          >
            <ToastIcon toast={t} />
            <p>{resolveValue(t.message, t)}</p>
            <button
              className="ml-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:rounded-full"
              onClick={() => toast.dismiss(t.id)}
            >
              <X className="w-4 h-4" />
            </button>
          </Transition>
        </>
      )}
    </Toaster>
  )
}
