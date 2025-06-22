# 🚀 Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Gemini API Key**: Get it from [Google AI Studio](https://makersuite.google.com/app/apikey)

## 🎯 Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Connect GitHub Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. **Import** your GitHub repository
4. Select the repository containing your portfolio

### Step 2: Configure Project Settings

1. **Framework Preset**: Auto-detected as "Create React App"
2. **Root Directory**: Leave as `./` (root)
3. **Build Command**: `cd frontend && yarn install && yarn build`
4. **Output Directory**: `frontend/build`
5. **Install Command**: `cd frontend && yarn install`

### Step 3: Set Environment Variables

1. In project settings, go to **"Environment Variables"**
2. Add the following variable:
   ```
   Name: REACT_APP_GEMINI_API_KEY
   Value: [Your Gemini API Key]
   Environment: Production, Preview, Development
   ```

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for deployment to complete (2-3 minutes)
3. Your portfolio will be live at `https://your-project-name.vercel.app`

## 🛠️ Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy from Project Root

```bash
# Navigate to your project directory
cd /path/to/your/portfolio

# Deploy to Vercel
vercel

# Follow the prompts:
# ? Set up and deploy "~/your-portfolio"? [Y/n] y
# ? Which scope do you want to deploy to? [Your Account]
# ? Link to existing project? [y/N] n
# ? What's your project's name? aneerban-ai-portfolio
# ? In which directory is your code located? ./
```

### Step 4: Set Environment Variables via CLI

```bash
# Add Gemini API key
vercel env add REACT_APP_GEMINI_API_KEY
# Enter your Gemini API key when prompted
# Select: Production, Preview, Development
```

### Step 5: Deploy to Production

```bash
vercel --prod
```

## 🚀 Quick Deploy Script

You can also use the provided deploy script:

```bash
# Make script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

## 🔧 Environment Variables Needed

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_GEMINI_API_KEY` | Google Gemini API key for AI functionality | ✅ Yes |

## 📋 Post-Deployment Checklist

- [ ] ✅ Portfolio loads correctly
- [ ] ✅ PersonaRouter AI agent works
- [ ] ✅ RAG Chat assistant responds
- [ ] ✅ Critique tool analyzes text
- [ ] ✅ Dark/light mode toggle works
- [ ] ✅ All sections scroll smoothly
- [ ] ✅ Mobile responsiveness
- [ ] ✅ All images load properly

## 🌐 Custom Domain (Optional)

### Add Custom Domain

1. Go to Project Settings → **Domains**
2. Add your custom domain (e.g., `aneerbansaha.com`)
3. Configure DNS records as instructed
4. Wait for SSL certificate provisioning

## 🐛 Troubleshooting

### Build Fails

```bash
# Check build locally first
cd frontend
yarn install
yarn build
```

### Environment Variables Not Working

1. Ensure variables start with `REACT_APP_`
2. Redeploy after adding environment variables
3. Check Vercel Dashboard → Project → Settings → Environment Variables

### AI Features Not Working

1. Verify `REACT_APP_GEMINI_API_KEY` is set correctly
2. Check browser console for errors
3. Test API key with a simple request

### Images Not Loading

1. Ensure images are in `frontend/public/images/` directory
2. Use absolute paths starting with `/images/`
3. Check image file sizes (optimize if needed)

## 📊 Performance Optimization

Your portfolio is already optimized with:

- ✅ **Code Splitting**: React.lazy() for AI components
- ✅ **Image Optimization**: WebP format support
- ✅ **CSS Optimization**: TailwindCSS purged unused styles
- ✅ **Bundle Optimization**: Create React App optimizations
- ✅ **Caching**: Static assets cached for 1 year

## 🎉 Success!

Once deployed, your AI-powered portfolio will be live and showcasing:

- 🧠 **3 Intelligent AI Agents**
- 🎨 **Modern Responsive Design**
- ⚡ **Lightning-Fast Performance**
- 🔒 **Secure HTTPS**
- 🌍 **Global CDN**

Your portfolio URL: `https://your-project-name.vercel.app`

---

**Need Help?** Check [Vercel Documentation](https://vercel.com/docs) or create an issue in your repository.