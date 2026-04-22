import { Experience } from '@/types'

export const experienceData: Experience[] = [
  {
    id: '1',
    role: 'Senior frontend Engineer 1',
    company: 'ConnectWise',
    location: 'Remote',
    startDate: '2023-08',
    endDate: undefined,
    isCurrent: true,
    description:
      'Developing and maintaining scalable frontend applications for ConnectWise products, working on PSA (Manage) and CPQ (Cell) platforms with React and modern web technologies.',
    achievements: [
      'Connectwise Neon - data-driven-form using rjsf for dynamic form rendering, complex form state management, and validation',
      'ConnectWise CPQ - Guided selling and quoting application for sales teams, Quote-creation etc',
      'ConnectWise PSA - Cloud-based platform for professional services companies managing operations (helpdesk, projects, billing, CRM, resource allocation, RPA/GenAI features). Complex, data-heavy system with real-time synchronization',
    ],
    technologies: ['React', 'mui', 'TypeScript', 'Azure DevOps', 'Jest', 'React Testing Library', 'Storybook'],
  },
  
  {
    id: '2',
    role: 'Programmer Analyst',
    company: 'Cognizant',
    location: 'Pune, India',
    startDate: '2022-01',
    endDate: '2023-08',
    isCurrent: false,
    description:
      'Developed application landscape repository (IAPPLI) for Societe Generale supporting management of applications across strategy, finance, production support, security, compliance, and infrastructure.',
    achievements: [
      'Built scalable React widgets for integration across multiple applications',
      'Developed application management features supporting key business activities',
      'Collaborated with cross-functional teams on enterprise-scale applications',
    ],
    technologies: ['React', 'TypeScript', 'Azure DevOps', 'Node.js'],
  },
  {
    id: '3',
    role: 'Software Developer',
    company: 'Bushel Technologies',
    location: 'Remote',
    startDate: '2019-11',
    endDate: '2022-10',
    isCurrent: false,
    description:
      'Developed full-stack web applications including B2Bedge (B2B middleware), Client Focus Dictionary, and InsurPay projects. Worked with diverse tech stacks and frameworks.',
    achievements: [
      'Built B2Bedge - B2B middleware application for transaction accounting',
      'Developed Client Focus Dictionary for business representation management',
      'Created InsurPay reminder project for ICICI bank agents',
    ],
    technologies: ['React', 'JavaScript', 'Node.js', 'MongoDB', 'Material-UI'],
  },
  {
    id: '4',
    role: 'Full Stack Web Developer',
    company: 'FDC Innovations Pvt Ltd',
    location: 'Pune, India',
    startDate: '2019-05',
    endDate: '2019-10',
    isCurrent: false,
    description:
      'Built full-stack web applications using modern JavaScript frameworks and technologies.',
    achievements: [
      'Developed responsive web applications',
      'Implemented backend APIs and frontend interfaces',
      'Collaborated on full development lifecycle projects',
    ],
    technologies: ['React', 'JavaScript', 'Node.js', 'Express', 'MongoDB'],
  },
]
