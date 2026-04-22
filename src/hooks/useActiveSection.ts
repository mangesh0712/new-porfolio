import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useAppStore } from '@/store/useAppStore'

export function useActiveSection(sectionId: string) {
  const { ref, inView } = useInView({
    threshold: 0.3,
  })
  const setActiveSection = useAppStore((state) => state.setActiveSection)

  useEffect(() => {
    if (inView) {
      setActiveSection(sectionId)
    }
  }, [inView, sectionId, setActiveSection])

  return ref
}
