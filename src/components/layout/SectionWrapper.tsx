import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useActiveSection } from '@/hooks/useActiveSection';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({
  id,
  children,
  className = '',
}: SectionWrapperProps) {
  const ref = useActiveSection(id);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn(
        'min-h-screen w-full scroll-mt-20 px-6 py-20',
        className
      )}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.section>
  );
}
