import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/common/SectionHeading';
import { testimonialsData } from '@/data/testimonials';
import { motion } from 'framer-motion';
import { TestimonialCard } from './TestimonialCard';
import { TestimonialsEmpty } from './TestimonialsEmpty';

export function Testimonials() {
  return (
    <SectionWrapper id="testimonials" className="bg-white dark:bg-gray-950 py-16">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-4 text-center"
        >
          <Badge variant="accent">Client Feedback</Badge>
        </motion.div>

        <SectionHeading className="mb-8">What People Say</SectionHeading>

        {testimonialsData.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-3">
            {testimonialsData.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        ) : (
          <TestimonialsEmpty />
        )}
      </div>
    </SectionWrapper>
  )
}
