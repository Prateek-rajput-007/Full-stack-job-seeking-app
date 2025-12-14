# HireMeToo - Job Seeking Application (Frontend)

A modern, full-stack job seeking application frontend built with **React**, **Vite**, and **Tailwind CSS**. This application serves as the client-side interface for connecting job seekers with employers, featuring a premium dark-themed UI, smooth animations, and a seamless user experience.

## ✨ Features

- **Authentication System**: Secure Login and Registration for Job Seekers and Employers.
- **Job Seeker Dashboard**: 
  - Browse recommended jobs.
  - Track application status.
  - View daily career tips.
- **Employer Dashboard**:
  - Post new job listings with detailed requirements.
  - Manage posted jobs (Edit/Delete).
  - View "My Jobs" and applicant details.
- **Job Browsing**: 
  - Advanced search and filtering (Category, Location, Keyword).
  - Detailed job views with salary and location info.
- **Job Applications**: 
  - Integrated application form with cover letter submission.
  - Validation ensuring complete data entry.
- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile devices.
- **Modern UI/UX**: 
  - Glassmorphism aesthetic.
  - Interactive animations using `framer-motion`.
  - Real-time notifications with `react-hot-toast`.

## 🛠️ Technology Stack

- **Framework**: [React](https://react.dev/) (v18)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State/Notifications**: Context API, [React Hot Toast](https://react-hot-toast.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **HTTP Client**: [Axios](https://axios-http.com/)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (if part of a larger repo, navigate to the frontend folder):
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Running the Development Server**:
   ```bash
   npm run dev
   ```
   The application will typically start at `http://localhost:5173`.

### Building for Production

To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

## 📂 Project Structure

```bash
src/
├── components/
│   ├── Application/   # Job application forms
│   ├── Auth/          # Login and Register components
│   ├── Home/          # Landing page and Dashboard components
│   ├── Job/           # Job listing, Details, Posting, and Management
│   ├── Layout/        # Navbar, Footer, etc.
│   └── NotFound/      # 404 Page
├── context/           # Global state (Auth, User context) - (Implied in main.jsx)
├── services/          # API service calls (jobService, applicationService, etc.)
├── App.jsx            # Main App Component with Routing
├── main.jsx           # Entry point
└── index.css          # Global styles & Tailwind directives
```

## 🔧 Environment Configuration

Ensure your backend server URL is correctly configured in `src/services/api.js`.
Default configuration assumes the backend is running locally or at a specified URL.

```javascript
// src/services/api.js
baseURL: "http://localhost:4000/api/v1" // Update this if your backend runs elsewhere
```

## 🎨 customizable Design

The application uses Tailwind CSS for all styling. Global color schemes (Violet/Fuchsia gradients) and dark mode backgrounds (`slate-950`) can be customized directly in the Tailwind classes or configuration.

---

**Developed for the Full Stack Job Seeking App Project.**
