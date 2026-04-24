import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { testimonialsData } from '@/data/testimonials';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

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

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-8 text-center text-4xl font-bold text-gray-900 dark:text-white"
        >
          What People Say
        </motion.h2>

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
                <Card className="flex h-full flex-col">
                  {testimonial.rating && (
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <FiStar
                          key={i}
                          size={18}
                          className="fill-cyan-500 text-cyan-500"
                        />
                      ))}
                    </div>
                  )}

                  <p className="mb-6 flex-1 text-gray-600 dark:text-gray-300">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center gap-4 border-t border-gray-200 pt-4 dark:border-gray-800">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-gray-700 dark:bg-gray-800"
          >
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
              Coming Soon
            </p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Testimonials will be added soon. Stay tuned!
            </p>
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  )
}
