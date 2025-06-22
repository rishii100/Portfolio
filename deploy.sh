#!/bin/bash

echo "🚀 Deploying Aneerban's AI Portfolio to Vercel..."

# Build the project
echo "📦 Building the project..."
cd frontend
yarn install
yarn build
cd ..

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
npx vercel --prod

echo "✅ Deployment complete!"
echo "🔧 Don't forget to set REACT_APP_GEMINI_API_KEY in Vercel dashboard!"