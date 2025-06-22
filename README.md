# Aneerban Saha - AI-Powered Portfolio

🚀 **Live Link**:[Click Here](portfolio-ten-weld-qwcouv5pr1.vercel.app/)
 
An intelligent portfolio website featuring three AI agents powered by Google Gemini:

## ✨ Features

- **PersonaRouterAgent**: Classifies visitors and personalizes navigation
- **RAG Assistant**: Conversational Q&A about portfolio content  
- **CritiqueAgent**: AI-powered text analysis tool
- **Modern Design**: Responsive with dark/light mode
- **Smooth Animations**: Built with Framer Motion

## 🛠️ Tech Stack

- **Frontend**: React.js + TailwindCSS + Framer Motion
- **AI**: Google Gemini API (2.0-flash)
- **State**: Zustand
- **Deployment**: Vercel
- **Styling**: TailwindCSS with custom animations

## 🚀 Quick Start

```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
cd frontend
yarn install

# Set up environment variables
cp .env.example .env.local
# Add your REACT_APP_GEMINI_API_KEY

# Start development server
yarn start
```

## 📦 Deployment

### Vercel Deployment

1. **Connect to Vercel**:
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Set Environment Variables**:
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add: `REACT_APP_GEMINI_API_KEY` = `your-gemini-api-key`

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Environment Variables

```env
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
```

## 🧠 AI Agents

### 1. PersonaRouterAgent
- Classifies user intent (recruiter, developer, student, etc.)
- Provides personalized navigation recommendations
- Auto-scrolls to relevant sections

### 2. RAG Assistant  
- Semantic search through portfolio content
- Conversational Q&A interface
- Real-time responses about skills, projects, experience

### 3. CritiqueAgent
- Analyzes resumes, job descriptions, and text
- Structured feedback with scores
- Downloadable critique reports

## 📱 Features

- ✅ Fully responsive design
- ✅ Dark/Light mode toggle
- ✅ Smooth scrolling navigation
- ✅ Interactive AI components
- ✅ Professional portfolio sections
- ✅ Modern animations and transitions

## 🎯 Portfolio Sections

- **Hero**: AI-powered introduction
- **About**: Professional background
- **Skills**: Technical expertise
- **Experience**: Work history
- **Projects**: AI/ML showcase
- **Awards**: Recognition and achievements
- **Education**: Academic background
- **AI Tools**: Interactive critique tool
- **Contact**: Social links and information

## 🔧 Development

Built with modern web technologies and AI integration:

- **React Hooks** for state management
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **Gemini API** for AI functionality
- **Client-side vector search** for RAG
- **Responsive design** for all devices

## 📄 License

© 2025 Aneerban Saha. All rights reserved.
