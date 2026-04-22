import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'accent'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block px-3 py-1 rounded-full text-sm font-medium',
        {
          'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100':
            variant === 'default',
          'border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300':
            variant === 'outline',
          'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-amber-300':
            variant === 'accent',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
