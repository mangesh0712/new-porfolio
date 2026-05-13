import { motion } from 'framer-motion';

export function TestimonialsEmpty() {
  return (
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
  );
}
