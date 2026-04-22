import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppStore {
  theme: 'light' | 'dark'
  activeSection: string
  toggleTheme: () => void
  setActiveSection: (section: string) => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      activeSection: 'hero',
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light'
          if (typeof document !== 'undefined') {
            if (newTheme === 'dark') {
              document.documentElement.classList.add('dark')
            } else {
              document.documentElement.classList.remove('dark')
            }
          }
          return { theme: newTheme }
        }),
      setActiveSection: (section: string) => set({ activeSection: section }),
    }),
    {
      name: 'app-store',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
)
