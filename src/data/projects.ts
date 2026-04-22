import { Project } from '@/types'

export const projectsData: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with React and Node.js',
    longDescription:
      'Built a complete e-commerce platform with user authentication, product management, shopping cart, and payment integration. Implemented real-time inventory updates and order tracking.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=300&fit=crop',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'fullstack',
    github: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Collaborative task management with real-time updates',
    longDescription:
      'Created a team task management application with drag-and-drop board, real-time collaboration, and notification system using WebSocket.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
    tags: ['React', 'TypeScript', 'Firebase', 'Tailwind'],
    category: 'web',
    github: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: '3',
    title: 'Analytics Dashboard',
    description: 'Data visualization dashboard with interactive charts',
    longDescription:
      'Developed an analytics dashboard with real-time data visualization, custom chart creation, and exportable reports for data-driven decision making.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    tags: ['React', 'Chart.js', 'TypeScript', 'Node.js'],
    category: 'web',
    github: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: '4',
    title: 'Mobile Weather App',
    description: 'Native mobile weather application with forecasts',
    longDescription:
      'Cross-platform weather application with real-time weather data, location-based forecasts, and offline functionality.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=300&fit=crop',
    tags: ['React Native', 'TypeScript', 'API Integration'],
    category: 'mobile',
    github: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: '5',
    title: 'Design System',
    description: 'Comprehensive UI component library and design system',
    longDescription:
      'Created a reusable component library with documentation, accessibility standards, and Figma integration for design consistency across projects.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
    tags: ['React', 'Storybook', 'TypeScript', 'CSS'],
    category: 'design',
    github: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: '6',
    title: 'Content Management System',
    description: 'Headless CMS with modern API and admin panel',
    longDescription:
      'Built a flexible headless CMS with GraphQL API, real-time content versioning, and a user-friendly admin dashboard for content management.',
    image: 'https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=500&h=300&fit=crop',
    tags: ['Node.js', 'GraphQL', 'React', 'PostgreSQL'],
    category: 'fullstack',
    github: 'https://github.com',
    liveUrl: 'https://example.com',
  },
]
