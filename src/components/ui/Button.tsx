import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-lg font-semibold transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'px-3 py-2 text-sm': size === 'sm',
          'px-6 py-3 text-base': size === 'md',
          'px-8 py-4 text-lg': size === 'lg',
        },
        {
          'bg-emerald-700 text-white hover:bg-emerald-800 disabled:hover:bg-emerald-700 dark:bg-amber-400 dark:text-emerald-900 dark:hover:bg-amber-300 dark:disabled:hover:bg-amber-400':
            variant === 'primary',
          'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:disabled:hover:bg-gray-700':
            variant === 'secondary',
          'border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white disabled:hover:bg-transparent disabled:hover:text-emerald-700 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-400 dark:hover:text-emerald-900 dark:disabled:hover:bg-transparent dark:disabled:hover:text-amber-400':
            variant === 'outline',
        },
        className
      )}
      {...props}
    />
  );
}
