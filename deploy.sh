#!/bin/bash

echo "🚀 Deploying Drawing Sync App to Production"
echo ""
echo "Choose deployment method:"
echo "1. Render (Easiest - Web UI, no CLI needed) ⭐"
echo "2. Railway (Fast, requires GitHub)"
echo "3. Fly.io (CLI-based)"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
  1)
    echo ""
    echo "📋 Render Deployment Steps:"
    echo "1. Go to: https://render.com"
    echo "2. Sign up/login (free)"
    echo "3. Click 'New +' → 'Web Service'"
    echo "4. Connect GitHub repo OR use 'Public Git repository'"
    echo "5. Settings:"
    echo "   - Name: drawing-sync"
    echo "   - Environment: Node"
    echo "   - Build Command: npm install"
    echo "   - Start Command: node server.js"
    echo "   - Plan: Free"
    echo "6. Click 'Create Web Service'"
    echo "7. Wait 2-3 minutes"
    echo "8. Get your URL and test!"
    echo ""
    echo "Or use Render CLI (if installed):"
    echo "  render deploy"
    ;;
  2)
    echo ""
    echo "📋 Railway Deployment:"
    echo "1. Go to: https://railway.app"
    echo "2. Sign up/login"
    echo "3. 'New Project' → 'Deploy from GitHub repo'"
    echo "4. Connect your repo"
    echo "5. Railway auto-detects and deploys!"
    ;;
  3)
    export FLYCTL_INSTALL="/Users/akash.gaur/.fly"
    export PATH="$FLYCTL_INSTALL/bin:$PATH"
    echo ""
    echo "📋 Fly.io Deployment:"
    flyctl auth login
    flyctl launch
    flyctl deploy
    ;;
  *)
    echo "Invalid choice"
    ;;
esac
