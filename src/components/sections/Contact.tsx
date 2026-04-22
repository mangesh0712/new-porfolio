import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Badge } from '@/components/ui/Badge'
import { ContactForm } from './ContactForm'
import { personal } from '@/data/personal'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'

export function Contact() {
  return (
    <SectionWrapper id="contact" className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-6 text-center"
        >
          <Badge variant="accent">Get In Touch</Badge>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-4 text-center text-4xl font-bold text-gray-900 dark:text-white"
        >
          Let's Connect
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12 text-center text-lg text-gray-600 dark:text-gray-300"
        >
          Have a question or want to work together? Feel free to reach out!
        </motion.p>

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
              Contact Information
            </h3>

            <div className="space-y-8">
              <a
                href={`mailto:${personal.email}`}
                className="group flex items-start gap-4 rounded-lg p-4 transition-colors hover:bg-white dark:hover:bg-gray-800"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-amber-400">
                  <FiMail size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Email
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {personal.email}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${personal.phone}`}
                className="group flex items-start gap-4 rounded-lg p-4 transition-colors hover:bg-white dark:hover:bg-gray-800"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-amber-400">
                  <FiPhone size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Phone
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {personal.phone}
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4 rounded-lg p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <FiMapPin size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Location
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {personal.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">
                Follow Me
              </h4>
              <div className="flex justify-center gap-4">
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-emerald-700 text-white p-3 transition-colors hover:bg-emerald-800 dark:bg-amber-400 dark:text-emerald-900 dark:hover:bg-amber-300"
                >
                  <FiGithub size={20} />
                </a>
                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-emerald-700 text-white p-3 transition-colors hover:bg-emerald-800 dark:bg-amber-400 dark:text-emerald-900 dark:hover:bg-amber-300"
                >
                  <FiLinkedin size={20} />
                </a>
                <a
                  href={personal.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-emerald-700 text-white p-3 transition-colors hover:bg-emerald-800 dark:bg-amber-400 dark:text-emerald-900 dark:hover:bg-amber-300"
                >
                  <FiTwitter size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          <ContactForm />
        </div>
      </div>
    </SectionWrapper>
  )
}
