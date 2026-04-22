import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950',
        className
      )}
    >
      {children}
    </div>
  );
}
