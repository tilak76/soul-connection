# Soul Connection - Netlify Deployment Guide (Client Only)

Follow these steps to deploy your Frontend to Netlify.

## 1. Push Code to GitHub
Ensure your latest changes are pushed.

## 2. New Site from Git
1. Log in to [Netlify](https://app.netlify.com/).
2. Click **"Add new site"** > **"Import from existing project"**.
3. Select **"GitHub"** and pick `tilak76/soul-connection`.

## 3. Build Settings
Netlify should detect these settings from `netlify.toml`:

- **Base directory**: `client`
- **Build command**: `npm run build`
- **Publish directory**: `dist`

## 4. Environment Variables
You MUST set your Backend URL here, otherwise the app won't work.

| Key | Value | Description |
|-----|-------|-------------|
| `VITE_API_URL` | `https://your-backend-server.com/api` | **REQUIRED** URL of your running backend. |
