# Portfolio Setup Guide

Your modern portfolio web app is ready! Here's how to use it.

## 🚀 Quick Start

### Development
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
```

## 📝 Customizing Your Portfolio

### 1. Personal Information
Edit `src/data/personal.ts`:
- Update name, role, email, phone, location
- Add your social media links (GitHub, LinkedIn, Twitter)
- Update statistics (years of experience, projects, etc.)

### 2. Skills
Edit `src/data/skills.ts`:
- Add/remove skill categories
- Update skill names and proficiency levels (0-100)

### 3. Projects
Edit `src/data/projects.ts`:
- Add your projects with descriptions, images, tech stack
- Categories: `web`, `mobile`, `design`, `fullstack`
- Add GitHub and live demo links

### 4. Experience
Edit `src/data/experience.ts`:
- Add your work history
- Include company, role, dates, achievements, technologies

### 5. Testimonials
Edit `src/data/testimonials.ts`:
- Add client/colleague testimonials
- Include quotes, ratings, and profile images

## 📧 Email Setup

To enable the contact form:

1. Go to [EmailJS](https://www.emailjs.com/) and create a free account
2. Create an email service (Gmail recommended)
3. Create an email template with these variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{subject}}`
   - `{{message}}`
4. Get your credentials:
   - Service ID
   - Template ID
   - Public Key
5. Create `.env.local` file in the project root:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

## 🎨 Design Customization

### Colors
Edit `tailwind.config.js`:
- Change the `accent` color palette (currently cyan/teal)
- Modify font families
- Adjust breakpoints

### Dark Mode
- Automatically included and toggled via sidebar button
- Uses Tailwind's dark mode via `dark:` prefix

### Components
All UI components are in `src/components/ui/`:
- `Button.tsx` - Customizable button styles
- `Badge.tsx` - Tag/label components
- `Card.tsx` - Reusable card layout
- `SkillBar.tsx` - Animated progress bars

## 📱 Layout

- **Fixed Sidebar** (240px) on desktop - navigation + theme toggle
- **Mobile Navbar** - hamburger menu on small screens
- **Sections** - each section scrolls into view with animations
- **Responsive** - optimized for all screen sizes

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### GitHub Pages
1. Push to GitHub
2. Connect repo to Vercel dashboard
3. Set environment variables in Vercel settings

### Other Platforms
- **Netlify**: Connect GitHub repo directly
- **AWS Amplify**: Push to GitHub, connect to Amplify
- **Firebase Hosting**: Use `firebase deploy` after building

## 📦 Project Structure

```
src/
├── components/       # React components
│   ├── layout/      # Layout components (Sidebar, etc.)
│   ├── sections/    # Page sections
│   └── ui/          # Reusable UI components
├── data/            # Content data files
├── hooks/           # Custom React hooks
├── lib/             # Utilities
├── store/           # Zustand state management
├── types/           # TypeScript definitions
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Tailwind styles
```

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v3** - Styling
- **Framer Motion** - Animations
- **React Hook Form** - Form handling
- **Zod** - Form validation
- **Zustand** - State management
- **EmailJS** - Email sending
- **Vite** - Build tool

## 📚 Features

✅ Dark/Light mode toggle
✅ Smooth scroll animations
✅ Responsive design
✅ Contact form with validation
✅ Project filtering by category
✅ Experience timeline
✅ Testimonials carousel
✅ SEO optimized
✅ Performance optimized (121.5kb gzipped)

## ❓ Need Help?

- Check component prop types in their definition files
- Adjust animation timing in `framer-motion` sections
- Modify colors using Tailwind's color utilities
- Add new sections by copying existing section structure

Enjoy your new portfolio! 🎉
