```markdown
# Deployment Guide - Resource Management System

## Architecture Overview

```
GitHub (Source) 
    ↓
GitHub Actions (CI/CD)
    ↓
├── Backend → Render (https://rms-backend.onrender.com)
├── Frontend → Vercel (https://rms.vercel.app)
└── Database → Supabase (PostgreSQL)
```

## Prerequisites

- GitHub account
- Supabase account (free)
- Render account (free)
- Vercel account (free)

---

## 1. Database Setup (Supabase)

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create new organization (if needed)
4. Create new project:
   - Name: `rms-database`
   - Database Password: (save this!)
   - Region: Choose closest to you
   - Click "Create new project"

### Step 2: Get Database Connection String

1. In Supabase dashboard, go to **Settings** → **Database**
2. Scroll to **Connection string** section
3. Copy the **Connection pooling** string (recommended for serverless)
4. Replace `[YOUR-PASSWORD]` with your actual password

Example:
```
postgresql://postgres.xxxxx:[PASSWORD]@aws-0-region.pooler.supabase.com:5432/postgres
```

### Step 3: Run Database Schema

1. In Supabase, go to **SQL Editor**
2. Click **New query**
3. Copy content from `database/schema/create_tables.sql`
4. Paste and click **Run**
5. Repeat for `values.sql` if you have initial data

---

## 2. Backend Deployment (Render)

### Step 1: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub

### Step 2: Create Web Service

1. Click **New** → **Web Service**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `rms-backend`
   - **Region**: Choose closest
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Step 3: Add Environment Variables

In Render dashboard, go to **Environment** tab and add:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | (paste your Supabase connection string) |
| `SECRET_KEY` | (generate random 32+ character string) |
| `ALGORITHM` | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `30` |
| `FRONTEND_URL` | (will add after Vercel deployment) |
| `ENVIRONMENT` | `production` |

### Step 4: Deploy

1. Click **Create Web Service**
2. Wait for first deployment (5-10 minutes)
3. Copy your backend URL: `https://rms-backend.onrender.com`

---

## 3. Frontend Deployment (Vercel)

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub

### Step 2: Import Project

1. Click **Add New** → **Project**
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

### Step 3: Add Environment Variables

Add this environment variable:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | `https://rms-backend.onrender.com` |

### Step 4: Deploy

1. Click **Deploy**
2. Wait for deployment (2-3 minutes)
3. Copy your frontend URL: `https://rms.vercel.app`

### Step 5: Update Backend CORS

Go back to Render → Environment variables → Add:

| Key | Value |
|-----|-------|
| `FRONTEND_URL` | `https://rms.vercel.app` |

---

## 4. GitHub Secrets Configuration

For CI/CD to work, add these secrets to GitHub:

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

### Secrets to Add:

#### Backend Secrets:
- `RENDER_API_KEY`: Get from Render → Account Settings → API Keys
- `RENDER_SERVICE_ID`: Get from Render → Service → Settings

#### Frontend Secrets:
- `VERCEL_TOKEN`: Get from Vercel → Settings → Tokens
- `VERCEL_ORG_ID`: Get from Vercel → Settings → General
- `VERCEL_PROJECT_ID`: Get from Vercel → Project Settings → General
- `NEXT_PUBLIC_API_URL`: `https://rms-backend.onrender.com`

---

## 5. Testing the Deployment

### Backend Test:
```bash
curl https://rms-backend.onrender.com/health
# Should return: {"status": "ok"}
```