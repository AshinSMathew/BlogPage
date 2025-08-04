# Blog Platform - LAUNCHPAD by MuLearn

> **Task 7 - Web Development Level 4**  
> **Submitted for:** LAUNCHPAD by MuLearn - Oronium Web Development Program  
> **Level:** 4  
> **Task:** 7

## Project Overview

A modern, responsive blog platform built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. This project demonstrates advanced React concepts, API integration, and modern web development practices by creating a fully functional blog homepage with dynamic content fetching from MockAPI.

## Live Demo

[https://blog-page-oronium.vercel.app/](https://blog-page-oronium.vercel.app/)

## Project Objectives

This project was developed as part of the LAUNCHPAD by MuLearn program to demonstrate:

- Advanced React/Next.js development skills
- TypeScript implementation for type safety
- External API integration and data management
- Responsive UI/UX design principles
- Modern web development best practices
- Component-based architecture
- State management and error handling


## Technology Stack

### **Frontend Framework**
- **Next.js 14**: React framework with App Router
- **React 18**: Latest React with hooks and concurrent features
- **TypeScript**: Static type checking for enhanced development

### **Styling & UI**
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **Lucide React**: Modern icon library
- **CSS Grid & Flexbox**: Advanced layout techniques

### **Data & API**
- **MockAPI.io**: External API for blog post data

### **Development Tools**
- **TypeScript**: Type checking and IntelliSense

## 📁 Project Structure

```
blog-platform/
├── app/
│   ├── page.tsx                 # Main blog homepage
│   ├── layout.tsx              # Root layout component
│   └── globals.css             # Global styles
├── components/
│   ├── blog-hero-section.tsx   # Hero section component
│   ├── recent-post-section.tsx # Recent posts grid
│   ├── featured-post-sidebar.tsx # Sidebar component
│   └── blocks/
│       └── navbars/
│           └── simple-navbar-with-hover-effects.tsx
├── lib/
│   └── api.ts 
|   └──utils.ts             # API utilities and helpers
├── .env.local                 # Environment variables
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## 🚀 Setup Instructions

### **Prerequisites**
- Node.js 18+ installed
- npm or yarn package manager
- MockAPI.io account and project

### **Installation Steps**

1. **Clone the repository**
   ```bash
   git clone https://github.com/AshinSMathew/BlogPage
   cd blog-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Create .env.local file
   cp .env.example .env.local
   
   # Add your MockAPI project secret
   NEXT_PUBLIC_PROJECT_SECRET=your_mockapi_project_secret
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open application**
   Navigate to `http://localhost:3000`

## 🔧 API Configuration

### **MockAPI Setup**
1. Create account at [MockAPI.io](https://mockapi.io)
2. Create new project
3. Create endpoint: `/api/post`
4. Configure with schema:
   ```json
   {
     "id": "string",
     "title": "string",
     "content": "string",
     "image": "string (URL)",
     "createdAt": "string (ISO date)"
   }
   ```

### **Environment Variables**
```env
# .env.local
NEXT_PUBLIC_PROJECT_SECRET=your_project_secret_here
```

## 📊 API Response Format

The application expects API responses in the following format:

```json
{
  "id": "1",
  "title": "Getting Started with Next.js",
  "content": "Next.js is a powerful framework for building SSR and static web applications using React.",
  "image": "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb",
  "createdAt": "2025-08-01T10:00:00Z"
}
```


## 👨‍💻 Developer Information

**Project Author**: [Ashin Sabu Mathew](https://github.com/AshinSMathew) 
**Program**: LAUNCHPAD by MuLearn  
**Level**: Web Development Level 4  
**Task**: Task 7 - Blog Platform Development  