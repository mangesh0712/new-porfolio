export interface Skill {
  name: string
  level: number
}

export interface SkillCategory {
  category: string
  skills: Skill[]
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  image: string
  tags: string[]
  category: 'web' | 'mobile' | 'design' | 'fullstack'
  github?: string
  liveUrl?: string
}

export interface Experience {
  id: string
  role: string
  company: string
  location: string
  startDate: string
  endDate?: string
  isCurrent?: boolean
  description: string
  achievements: string[]
  technologies: string[]
  logo?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  quote: string
  image: string
  rating?: number
}

export interface ContactFormData {
  name: string
  email: string
  subject?: string
  message: string
}
