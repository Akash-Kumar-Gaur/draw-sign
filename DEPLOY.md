# Deployment Instructions

## Option 1: Render (Recommended - Easiest)

1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository (or use manual deploy)
4. Settings:
   - **Name**: drawing-sync
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free (or any plan)
5. Click "Create Web Service"
6. Once deployed, you'll get a URL like `https://drawing-sync.onrender.com`
7. Open this URL on both devices to test!

## Option 2: Railway

1. Go to https://railway.app and sign up/login
2. Click "New Project" → "Deploy from GitHub repo" (or "Empty Project")
3. If using GitHub: Connect repo and Railway will auto-detect
4. If manual: Upload the project folder
5. Railway will auto-detect Node.js and deploy
6. Get your public URL from the deployment

## Option 3: Fly.io

1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Run: `fly launch` in the project directory
3. Follow prompts to create app
4. Deploy: `fly deploy`

## Option 4: Local Network Testing

If both devices are on the same WiFi:

1. Find your computer's IP: 
   - Mac/Linux: `ifconfig | grep "inet "`
   - Windows: `ipconfig`
2. Start server: `npm start`
3. On Device 1: Open `http://YOUR_IP:8080`
4. On Device 2: Open `http://YOUR_IP:8080`

## Quick Deploy Script

For the fastest deployment, I recommend Render - it takes about 2 minutes and requires no CLI tools.
