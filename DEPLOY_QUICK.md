# Quick Production Deployment

## Option 1: Render (Easiest - 2 minutes) ⭐ RECOMMENDED

1. Go to https://render.com
2. Sign up/login (free)
3. Click "New +" → "Web Service"
4. Connect GitHub (or use "Public Git repository" with this repo)
5. Or manually:
   - **Name**: `drawing-sync`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free
6. Click "Create Web Service"
7. Wait 2-3 minutes for deployment
8. Get your URL: `https://drawing-sync.onrender.com` (or similar)
9. Open on both devices and test!

**Note**: Free tier sleeps after 15 min inactivity, first request may be slow.

## Option 2: Railway (Fast & Simple)

1. Go to https://railway.app
2. Sign up/login
3. "New Project" → "Deploy from GitHub repo"
4. Connect your repo or upload the folder
5. Railway auto-detects Node.js
6. Get your public URL
7. Done!

## Option 3: Fly.io (CLI-based)

```bash
cd /tmp/drawing-app
export FLYCTL_INSTALL="/Users/akash.gaur/.fly"
export PATH="$FLYCTL_INSTALL/bin:$PATH"
flyctl launch
# Follow prompts, then:
flyctl deploy
```

## Option 4: Vercel/Netlify (Requires adapter)

These are optimized for static sites. For WebSocket apps, use Render/Railway/Fly.io.

---

**Fastest**: Render web interface (no CLI needed)
