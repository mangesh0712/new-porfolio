import emailjs from '@emailjs/browser'
import { ContactFormData } from '@/types'

export async function sendEmail(data: ContactFormData): Promise<boolean> {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      throw new Error('EmailJS configuration is missing')
    }

    emailjs.init(publicKey)

    const response = await emailjs.send(serviceId, templateId, {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
    })

    return response.status === 200
  } catch (error) {
    console.error('Email sending error:', error)
    return false
  }
}
