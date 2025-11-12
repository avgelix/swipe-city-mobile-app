# Technical Decisions

## 📋 Final Tech Stack Summary
This document outlines all technical decisions made for the "Where to Move" game application.

---

## ✅ Core Decisions

### AI Service
**Choice:** Google Gemini (gemini-1.5-flash)
- Generous free tier (1500 requests/day)
- No expiration on free tier
- Good quality responses for city matching and explanations

### Number of Questions
**Choice:** 20 questions
- Deep personalization for accurate city matches
- Provides comprehensive user profile across all categories

### Question Management
**Choice:** Hardcoded in code (questions.js)
- Simple to implement for MVP
- Faster to build and test
- Can migrate to JSON later if needed

### API Key Security
**Choice:** Vercel Serverless Function
- Keeps API key hidden from browser
- Free tier on Vercel
- Enables rate limiting for protection

### Swipe Library
**Choice:** Framer Motion
- Handles 8-direction swipes for multiple choice questions
- Smooth animations out of the box
- Great documentation and ease of use

### User Progress Tracking
**Choice:** localStorage
- Simple implementation
- Allows users to resume if they refresh
- No external services needed
- Privacy-friendly (data stays on device)

---

## 🎨 Frontend Stack

### Framework: React
- Component-based architecture for reusable card components
- Built-in state management for answers and game phases
- Rich ecosystem for swipe gestures and maps
- Mobile-first development support

### Styling: Tailwind CSS
- Utility-first approach for custom Zillow-inspired design
- Smaller bundle size (only ships used CSS)
- Perfect for card animations and swipe interactions
- Modern aesthetic for sleek interfaces

### Animation: Framer Motion
- Handles 8-direction swipe gestures
- Smooth, performant animations
- Easy to implement and customize

---

## 🗺️ Maps Integration

### Service: Google Maps JavaScript API
- Dynamic background city maps
- Updates with each answered question
- Well-documented and widely supported
- Free tier available for limited usage

---

## 🤖 AI Integration

### Service: Google Gemini (gemini-1.5-flash)
- Generates city recommendations from general knowledge
- Creates personalized match explanations
- No manual city database needed
- 1500 free requests/day (no expiration)

### Implementation:
- API calls via Vercel Serverless Function (keeps key secure)
- Client-side triggers, server-side execution
- No database required for city data

---

## 🚀 Hosting & Deployment

### Platform: Vercel
- Free tier hosting
- Automatic Git deployments
- Serverless functions for API proxy
- Optimized for React SPAs

### Architecture: Single Page Application (SPA)
- Client-side only (no backend server)
- All logic happens in browser
- State managed in React + localStorage
- Simple deployment and maintenance

---

## 📊 Data Management

### User Progress: localStorage
- Saves answers as user progresses
- Allows resume on page refresh
- No external database needed
- Privacy-friendly (data stays on device)

### Questions: Hardcoded (questions.js)
- 20 questions across 8 categories
- Binary (Y/N) and multiple choice (8 directions)
- Easy to update via code changes

---

## 💰 Cost Structure

### Budget: $0 (Free tier only)
- Google Gemini: 1500 requests/day (free, no expiration)
- Google Maps: Free tier for limited usage
- Vercel: Free tier hosting + serverless functions
- No database costs (client-side only)

### Trade-offs:
- Limited daily API requests (acceptable for personal/testing)
- No user authentication or cloud storage
- Manual question updates require redeployment

---

## 👨‍💻 Developer Context

- **Experience Level:** Intermediate
- **React Knowledge:** Some experience
- **CSS Frameworks:** Familiar with Bootstrap and Tailwind
- **Goal:** Build functional MVP without complexity
