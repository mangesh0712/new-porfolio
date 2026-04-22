import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { sendEmail } from '@/lib/emailService';
import { motion } from 'framer-motion';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

type ContactFormInputs = z.infer<typeof contactSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>(
    'idle'
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormInputs) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const success = await sendEmail(data)
      if (success) {
        setSubmitStatus('success')
        reset()
        setTimeout(() => setSubmitStatus('idle'), 3000)
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = cn(
    'mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3',
    'text-gray-900 placeholder-gray-500 transition-colors',
    'focus:border-gray-900 focus:outline-none',
    'dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-white'
  );

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-lg border border-gray-200 bg-gray-50 p-8 dark:border-gray-800 dark:bg-gray-900"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Name
        </label>
        <input
          {...register('name')}
          type="text"
          placeholder="Your name"
          className={inputClasses}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          placeholder="your@email.com"
          className={inputClasses}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Subject
        </label>
        <input
          {...register('subject')}
          type="text"
          placeholder="What's this about?"
          className={inputClasses}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Message
        </label>
        <textarea
          {...register('message')}
          placeholder="Your message..."
          rows={5}
          className={inputClasses}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      {submitStatus === 'success' && (
        <div className="rounded-lg bg-green-500/10 p-4 text-green-600 dark:text-green-400">
          ✓ Message sent successfully! I'll get back to you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="rounded-lg bg-red-500/10 p-4 text-red-600 dark:text-red-400">
          ✗ Failed to send message. Please try again.
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </motion.form>
  )
}
