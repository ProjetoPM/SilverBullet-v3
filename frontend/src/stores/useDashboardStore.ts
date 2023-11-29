import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface DashboardStoreProps {
  isOpen: boolean
  onOpen: () => void
  onOpenChange: () => void
  onClose: () => void
}

export const useDashboardStore = create<DashboardStoreProps>()(
  devtools((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onOpenChange: () => set((state) => ({ isOpen: !state.isOpen })),
    onClose: () => set({ isOpen: false })
  }))
)
