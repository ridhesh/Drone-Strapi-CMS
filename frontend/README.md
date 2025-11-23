# VyomGarud Blog - Military-Grade UAV Systems

A modern blogging website powered by Strapi CMS and Next.js 16.

## Features

- 🚀 Next.js 16 with App Router
- 🎨 Tailwind CSS v4 for styling
- ✨ Framer Motion animations
- 📝 Strapi CMS for content management
- 🎯 TypeScript for type safety
- 📱 Fully responsive design
- 🔍 Search functionality
- 🏷️ Category-based filtering

## Prerequisites

- Node.js 18+
- npm or pnpm

## Installation

### 1. Clone or create the project
```bash
mkdir vyomgarud-blog
cd vyomgarud-blog
```

### 2. Setup Backend (Strapi)
```bash
npx create-strapi-app@latest backend --quickstart
```

### 3. Setup Frontend (Next.js)
```bash
npx create-next-app@latest frontend
cd frontend
npm install framer-motion lucide-react
```

### 4. Configure Environment Variables

Create `.env.local` in frontend directory: