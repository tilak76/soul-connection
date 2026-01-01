# Soul Connection - Netlify Deployment Guide

Follow these steps to deploy your fullstack application (Frontend + Backend) to Netlify.

## 1. Push Code to GitHub
Ensure all your latest changes, including the new `netlify.toml` and `netlify/functions` folder, are pushed to your GitHub repository.

## 2. New Site from Git
1. Log in to [Netlify](https://app.netlify.com/).
2. Click **"Add new site"** > **"Import from existing project"**.
3. Select **"GitHub"** and authorize if needed.
4. Pick your repository: `tilak76/soul-connection` (or your specific repo name).

## 3. Build Settings (Automatic)
Because we added a `netlify.toml` file, Netlify should automatically detect these settings. If not, fill them in:

- **Base directory**: `(leave empty)`
- **Build command**: `npm install --prefix server && npm install --prefix client && npm run build --prefix client`
- **Publish directory**: `client/dist`

## 4. Environment Variables (Critical!)
You MUST add your secret keys. Netlify cannot read your `.env` file.
Go to **Site Configuration > Environment variables** and add the following:

| Key | Value | Description |
|-----|-------|-------------|
| `MONGO_URI` | `...` | Your MongoDB Connection String (from Atlas) |
| `JWT_SECRET` | `...` | Secret key for login tokens (e.g. `mysecret123`) |
| `PORT` | `5000` | (Optional, but good to have) |

## 5. Deploy
Click **"Deploy Site"**.

## Troubleshooting
- If the build fails, check the "Deploy log".
- If the app loads but you can't login/register, check the "Function logs" tab in Netlify or ensure your `MONGO_URI` is correct in the Environment Variables.
