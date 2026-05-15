# 👥 Recruit Crew - AI-Powered Recruitment Platform

> Modern recruitment platform with AI-powered candidate-job matching, interview question generation, and intelligent recommendations.

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss)
![Status](https://img.shields.io/badge/Status-Production-brightgreen?style=flat-square)

## 🌐 Live Demo

**Frontend:** https://recruit-crew.vercel.app

**Backend API:** https://recruit-crew-backend-ai.vercel.app

**Backend Repository:** https://github.com/Deepakraja03/recruit_crew_backend_ai

## 📋 Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [Routes & Pages](#routes--pages)
- [Components](#components)
- [Features Breakdown](#features-breakdown)
- [Workflows](#workflows)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### For Job Seekers 🎯

- ✅ **Google OAuth Authentication** - Quick and secure login
- 🔍 **Job Discovery** - Browse and filter job opportunities
- 📝 **Apply to Jobs** - Submit applications with one click
- 🤖 **AI Interview Questions** - Practice with AI-generated questions
- 📊 **Performance Tracking** - Get scores and feedback on answers
- 📋 **Application Management** - Track all your applications
- 👤 **Profile Management** - Update skills, experience, and preferences
- 📧 **Email Notifications** - Stay updated on application status
- ⭐ **Ratings & Reviews** - See company and job reviews
- 🎨 **Dark/Light Mode** - Choose your preferred theme

### For Recruiters/Organizations 👔

- 🏢 **Organization Registration** - Set up your company profile
- 📢 **Create Job Postings** - Post new job opportunities
- 📊 **Manage Applications** - Review and evaluate applications
- 👥 **Candidate Review** - Interview and assess candidates
- 📈 **Analytics Dashboard** - View application statistics
- 🎯 **Candidate Filtering** - Filter by skills and experience
- 💬 **Communication** - Message candidates
- ✅ **Approval Workflow** - Manage org approvals

### For Admins 🔐

- 🛡️ **Admin Dashboard** - System overview and controls
- 👥 **User Management** - Manage users and roles
- 🏢 **Organization Approval** - Review and approve organizations
- 📊 **System Analytics** - Monitor platform usage
- ⚙️ **System Configuration** - Configure platform settings
- 🚨 **Report Management** - Handle reported content

---

## 🖼️ Screenshots

### Home Page
- Landing page with platform overview
- Call-to-action buttons
- Feature highlights

### Candidate Dashboard
- Overview of applications
- Recommended jobs
- Performance metrics

### Job Listings
- Searchable job database
- Advanced filtering
- Job details modal

### Interview Section
- AI-generated questions
- Answer submission
- Real-time evaluation
- Score display

### Profile Management
- Edit personal information
- Add/manage skills
- Upload resume
- View statistics

---

## 🛠️ Tech Stack

### Frontend Framework
```
React 18.3.1              - UI library
TypeScript 5.5.3          - Type safety
Vite 5.4.2                - Build tool & dev server
React Router 7.3          - Client-side routing
```

### UI & Styling
```
Tailwind CSS 3.4.1        - Utility-first CSS
PostCSS 8.4.35            - CSS transformation
Autoprefixer 10.4.18      - Vendor prefixing
Framer Motion 12.5.0      - Animations
```

### State & Data
```
React Hooks               - State management
Context API               - Global state
Axios 1.7.2               - HTTP client
JWT Decode 4.0            - Token parsing
```

### Authentication
```
Google OAuth 0.12.1       - Google login
JWT                       - Token-based auth
```

### UI Components & Icons
```
Lucide React 0.344        - SVG icons
React Icons 5.5           - Icon library
Headless UI 2.2           - Unstyled components
Heroicons 2.1.5           - Icon set
```

### Utilities
```
React Query               - Data fetching
i18next 25.2.1           - Internationalization
Date-fns 3.6             - Date manipulation
React Datepicker 6.9     - Date picker component
React Countup 6.5.3      - Number animation
React Fast Marquee 1.6.4 - Scrolling text
React Quill 2.0          - Rich text editor
browser-image-compression 2.0.2 - Image optimization
```

### Development Tools
```
ESLint 9.9.1             - Code linting
TypeScript ESLint        - TS linting
Vite React Plugin 4.3.1  - React support in Vite
```

---

## 📁 Project Structure

```
recruit_crew/
├── src/
│   ├── components/                    # Reusable components
│   │   ├── Header.tsx                # Navigation header
│   │   ├── Footer.tsx                # Footer
│   │   ├── Sidebar.tsx               # Sidebar navigation
│   │   ├── JobCard.tsx               # Job listing card
│   │   ├── ApplicationCard.tsx       # Application card
│   │   ├── QuestionCard.tsx          # Question display
│   │   └── ...
│   │
│   ├── pages/                         # Page components
│   │   ├── Home.tsx                  # Landing page
│   │   ├── Dashboard.tsx             # User dashboard
│   │   ├── Questions.tsx             # Interview questions
│   │   ├── Events.tsx                # Job listings
│   │   ├── ApplyEvent.tsx            # Job application
│   │   ├── EventDetail.tsx           # Job details
│   │   ├── UserProfile.tsx           # User profile
│   │   ├── MyApplications.tsx        # Application tracking
│   │   ├── OrganizationRegister.tsx # Org signup
│   │   ├── OrganizationDashboard.tsx# Org dashboard
│   │   ├── OrganizationEvents.tsx    # Org job listings
│   │   ├── OrganizationAddEvent.tsx  # Create job posting
│   │   ├── VideoUpload.tsx           # Video submission
│   │   └── admin/
│   │       ├── AdminDashboard.tsx    # Admin panel
│   │       ├── AdminAddEvents.tsx    # Admin job management
│   │       └── AdminOrganizationReview.tsx
│   │
│   ├── services/                      # API calls & utilities
│   │   ├── api.ts                    # Axios instance
│   │   ├── authService.ts            # Auth endpoints
│   │   ├── jobService.ts             # Job endpoints
│   │   ├── aiService.ts              # AI API calls
│   │   └── userService.ts            # User endpoints
│   │
│   ├── hooks/                         # Custom React hooks
│   │   ├── useAuth.ts                # Authentication hook
│   │   ├── useJobs.ts                # Jobs data hook
│   │   └── useUser.ts                # User data hook
│   │
│   ├── context/                       # Context providers
│   │   ├── AuthContext.tsx           # Auth state
│   │   ├── UserContext.tsx           # User state
│   │   └── NotificationContext.tsx   # Notifications
│   │
│   ├── types/                         # TypeScript types
│   │   ├── user.ts
│   │   ├── job.ts
│   │   ├── application.ts
│   │   └── api.ts
│   │
│   ├── utils/                         # Utility functions
│   │   ├── validators.ts             # Input validation
│   │   ├── formatters.ts             # Data formatting
│   │   ├── constants.ts              # App constants
│   │   └── helpers.ts                # Helper functions
│   │
│   ├── styles/                        # Global styles
│   │   └── index.css                 # Global CSS
│   │
│   ├── App.tsx                        # Root component
│   ├── main.tsx                       # Entry point
│   └── vite-env.d.ts                 # Vite types
│
├── public/                            # Static assets
│   ├── logo.png
│   ├── favicon.ico
│   └── ...
│
├── index.html                         # HTML template
├── vite.config.ts                    # Vite config
├── tsconfig.json                     # TypeScript config
├── tailwind.config.js                # Tailwind config
├── postcss.config.js                 # PostCSS config
├── eslint.config.js                  # ESLint config
├── package.json
└── .env.example                      # Environment template
```

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 16.0 or higher - [Download](https://nodejs.org/)
- **npm** 8.0 or higher (comes with Node.js)
- **Git** - Version control - [Download](https://git-scm.com/)
- **Google OAuth Credentials** - [Setup Guide](#google-oauth-setup)

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized origins:
   - `http://localhost:5173` (development)
   - `https://recruit-crew.vercel.app` (production)
6. Copy Client ID for `.env` file

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Deepakraja03/recruit_crew.git
cd recruit_crew
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

```bash
cp .env.example .env
```

### 4. Configure Environment Variables

Edit `.env` file:

```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
VITE_API_URL=http://localhost:5000
VITE_BACKEND_AI_URL=http://localhost:5001
VITE_APP_NAME=Recruit Crew
```

---

## ⚙️ Configuration

### Environment Variables

```env
# Required
VITE_GOOGLE_CLIENT_ID=                    # Google OAuth Client ID
VITE_API_URL=http://localhost:5000       # Backend API URL

# Optional
VITE_BACKEND_AI_URL=http://localhost:5001 # AI Backend URL
VITE_APP_NAME=Recruit Crew               # App name
VITE_APP_DESCRIPTION=                    # App description
VITE_LOG_LEVEL=info                      # Log level
```

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
```

### Tailwind Configuration

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## 🚀 Running the Project

### Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Linter

```bash
npm run lint
```

---

## 🗺️ Routes & Pages

### Public Routes

```
/                                    Home landing page
/events                             Job listings
```

### Authentication Required Routes

```
/dashboard                          User dashboard
/profile                            User profile
/questions                          AI interview questions
/apply/:eventId                     Apply to job
/event-details/:eventId             View job details
/my-applications                    Track applications
/video                              Video upload
```

### Organization Routes

```
/organization                       Org registration
/organization-dashboard             Org dashboard
/organization-events                Org job listings
/organization-addEvent              Create job posting
/organization/pending               Pending approvals
/OrganizationReview                 Application review
```

### Admin Routes

```
/admin-dashboard                    Admin panel
/admin-addEvent                     Admin job management
/admin-organization-review          Org approval panel
```

---

## 🧩 Components

### Core Components

```typescript
// Header - Navigation
<Header />

// Sidebar - Navigation menu
<Sidebar />

// JobCard - Job listing display
<JobCard job={job} onApply={handleApply} />

// ApplicationCard - Application display
<ApplicationCard application={app} />

// QuestionCard - Interview question
<QuestionCard question={q} onAnswer={handleAnswer} />

// Modal - Generic modal
<Modal isOpen={open} onClose={close} title="Title">
  Content
</Modal>
```

---

## 🎯 Features Breakdown

### Authentication Flow

```
Login
  ↓
Google OAuth (Google Sign-In)
  ↓
JWT Token Generation
  ↓
Store Token (localStorage)
  ↓
Redirect to Dashboard
```

### Job Application Flow

```
Browse Jobs
  ↓
Click "Apply"
  ↓
View Job Details
  ↓
Submit Application
  ↓
AI Questions (Optional)
  ↓
Answer Questions
  ↓
Get Score & Feedback
  ↓
Application Submitted
```

### AI Interview Flow

```
Start Interview
  ↓
Fetch AI Questions (/generate)
  ↓
Display Questions
  ↓
Record Answers
  ↓
Submit Answers
  ↓
Backend AI Evaluation (/evaluate)
  ↓
Display Results & Score
  ↓
Provide Feedback
```

### Organization Management Flow

```
Register Organization
  ↓
Submit Information
  ↓
Admin Review
  ↓
Approval
  ↓
Access Dashboard
  ↓
Create Job Postings
  ↓
Review Applications
  ↓
Hire Candidates
```

---

## 🔗 API Integration

### Services Structure

```typescript
// services/authService.ts
export const loginWithGoogle = (token: string) => api.post('/auth/google', { token });
export const logout = () => api.post('/auth/logout');

// services/jobService.ts
export const getJobs = (filters?: JobFilters) => api.get('/jobs', { params: filters });
export const applyJob = (jobId: string, data: ApplicationData) => api.post(`/jobs/${jobId}/apply`, data);

// services/aiService.ts
export const generateQuestions = (role: string) => axios.get(`${AI_URL}/generate?role=${role}`);
export const evaluateAnswers = (data: EvaluationData) => axios.post(`${AI_URL}/evaluate`, data);
```

### API Call Example

```typescript
// Fetch jobs with loading state
const [jobs, setJobs] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  jobService.getJobs()
    .then(res => setJobs(res.data))
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
}, []);
```

---

## 🚀 Deployment

### Deploy to Vercel

**1. Connect Repository**
- Push code to GitHub
- Go to [Vercel](https://vercel.com/)
- Click "New Project"
- Select repository
- Vercel auto-detects framework

**2. Configure Environment**
- Add environment variables
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_API_URL` (production backend URL)
- `VITE_BACKEND_AI_URL`

**3. Deploy**
```bash
vercel --prod
```

### Deploy to Netlify

**1. Connect Repository**
```bash
npm install netlify-cli -g
netlify deploy --prod
```

**2. Configure Build Settings**
- Build command: `npm run build`
- Publish directory: `dist`

### Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages
npm run build
npm run deploy
```

---

## 📝 Environment Variables

### Development

```env
VITE_GOOGLE_CLIENT_ID=your-dev-client-id
VITE_API_URL=http://localhost:5000
VITE_BACKEND_AI_URL=http://localhost:5001
```

### Production

```env
VITE_GOOGLE_CLIENT_ID=your-prod-client-id
VITE_API_URL=https://api.recruit-crew.com
VITE_BACKEND_AI_URL=https://ai.recruit-crew.com
```

---

## 🤝 Contributing

We welcome contributions! Follow these steps:

### 1. Fork Repository
```bash
git clone https://github.com/yourusername/recruit_crew.git
```

### 2. Create Feature Branch
```bash
git checkout -b feature/amazing-feature
```

### 3. Make Changes
```bash
git add .
git commit -m "Add amazing feature"
```

### 4. Push to Branch
```bash
git push origin feature/amazing-feature
```

### 5. Open Pull Request

---

## Code Style Guidelines

- Use **TypeScript** for all new components
- Follow **React Hooks** patterns
- Use **Tailwind CSS** for styling
- Keep components small and reusable
- Write meaningful variable names
- Add comments for complex logic
- Test before submitting PR

---

## 🐛 Bug Reports

Found a bug? Please create an issue with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser/OS information

---

## 📚 Documentation

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/)

---

## 🛠️ Troubleshooting

### Issue: Port Already in Use

```bash
# macOS/Linux
lsof -i :5173

# Kill process
kill -9 <PID>

# Or use different port
npm run dev -- --port 5174
```

### Issue: CORS Error

- Check backend is running
- Verify `VITE_API_URL` in `.env`
- Enable CORS in backend

### Issue: Google OAuth Not Working

- Verify Client ID in `.env`
- Check localhost is added to authorized origins
- Clear browser cache

### Issue: Vite Hot Reload Not Working

```bash
# Clear cache
rm -rf node_modules/.vite

# Reinstall
npm install

# Restart dev server
npm run dev
```

---

## 📊 Performance Optimization

- Code splitting with React Router
- Lazy loading components
- Image optimization
- Caching strategies
- Minified production builds

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Team & Support

- **Developer**: Deepakraja03
- **Project Type**: Final Year Project - AI Integration
- **Status**: Active Production

### Support Channels
- 📧 Email: deepakraja.dev@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/Deepakraja03/recruit_crew/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/Deepakraja03/recruit_crew/discussions)

---

## 🙏 Acknowledgments

- React team for excellent library
- Google for OAuth integration
- Tailwind CSS for styling
- Vercel for deployment platform
- All contributors and users

---

<div align="center">

**Made with ❤️ by Deepakraja03**

[GitHub](https://github.com/Deepakraja03) • [LinkedIn](https://linkedin.com/in/deepakraja03) • [Portfolio](https://astro-portfolio.vercel.app)

If this project helped you, please consider giving it a ⭐

</div>
