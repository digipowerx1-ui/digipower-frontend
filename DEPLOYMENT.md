# Deployment Guide

## 📁 Project Structure

```
digipower-frontend/
├── backend/                  # Standalone API server (deployable separately)
│   ├── .env                  # Backend environment variables
│   ├── .env.example         # Backend environment template
│   ├── .gitignore           # Backend gitignore
│   ├── package.json         # Backend dependencies only
│   ├── index.js             # API server code
│   ├── README.md            # Backend documentation
│   └── node_modules/        # Backend dependencies
│
├── src/                     # Frontend React code
├── public/                  # Static assets
├── package.json             # Frontend dependencies
├── vite.config.ts          # Vite configuration
└── README-API.md           # API integration guide
```

## 🚀 Deployment Strategies

### Strategy 1: Separate Deployment (Recommended)

Deploy frontend and backend independently for better scalability and maintainability.

#### Backend Deployment Options:

**Option A: Railway** (Easiest)
```bash
cd backend
railway login
railway init
railway up
```

**Option B: Heroku**
```bash
cd backend
heroku create digipowerx-api
heroku config:set MASSIVE_API_KEY=your_key
git subtree push --prefix backend heroku main
```

**Option C: DigitalOcean App Platform**
1. Create new app from GitHub
2. Set root directory to `/backend`
3. Build command: `npm install`
4. Run command: `npm start`
5. Add environment variables

**Option D: AWS EC2**
```bash
# SSH into EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone your-repo
cd backend
npm install

# Create .env file
nano .env
# Add: MASSIVE_API_KEY=your_key

# Use PM2 for process management
sudo npm install -g pm2
pm2 start index.js --name digipowerx-api
pm2 startup
pm2 save

# Setup Nginx as reverse proxy
sudo apt install nginx
sudo nano /etc/nginx/sites-available/api
```

Nginx configuration:
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /ws {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}
```

#### Frontend Deployment:

**Vercel** (Recommended for React/Vite)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variable
vercel env add VITE_API_PROXY
# Value: https://api.yourdomain.com
```

**Netlify**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Environment variables in Netlify dashboard:
VITE_API_PROXY=https://api.yourdomain.com
```

### Strategy 2: Monorepo Deployment

Deploy both frontend and backend together (simpler but less flexible).

**Railway Monorepo**
1. Create `railway.json`:
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run api & npm run dev",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

2. Deploy:
```bash
railway login
railway init
railway up
```

## 🔧 Environment Variables

### Backend (.env)
```env
API_PORT=3000
MASSIVE_API_KEY=your_actual_key_here
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_PROXY=https://api.yourdomain.com  # Your deployed backend URL
VITE_API_URL=https://api.digipowerx.com
VITE_CONTACT_EMAIL=info@digipowerx.com
```

## 📋 Pre-Deployment Checklist

### Backend
- [ ] Set `NODE_ENV=production` in environment
- [ ] Configure CORS for specific frontend origins
- [ ] Add rate limiting for API endpoints
- [ ] Enable HTTPS/WSS
- [ ] Set up monitoring and logging
- [ ] Configure firewall rules
- [ ] Test WebSocket connections
- [ ] Verify API key is working

### Frontend
- [ ] Update `VITE_API_PROXY` to production backend URL
- [ ] Test API connectivity
- [ ] Build and test production bundle
- [ ] Configure CDN for assets
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Enable analytics if needed

## 🔒 Security Hardening

### Backend Security
```javascript
// Add to backend/index.js

// 1. Rate limiting
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);

// 2. CORS configuration for production
app.use(cors({
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  credentials: true
}));

// 3. Helmet for security headers
import helmet from 'helmet';
app.use(helmet());

// 4. Input validation
import { body, validationResult } from 'express-validator';
```

### Frontend Security
- Use environment variables for API URLs (never hardcode)
- Implement CSP (Content Security Policy)
- Enable HTTPS only
- Sanitize user inputs
- Use secure WebSocket (WSS) in production

## 📊 Monitoring & Logging

### Backend Monitoring
```bash
# Install PM2 for process management
npm install -g pm2

# Start with PM2
pm2 start backend/index.js --name api

# Monitor
pm2 monit

# View logs
pm2 logs api

# Setup PM2 monitoring dashboard (optional)
pm2 link <secret> <public>
```

### Application Monitoring
```javascript
// Add to backend/index.js

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// Error tracking
import * as Sentry from '@sentry/node';
Sentry.init({ dsn: process.env.SENTRY_DSN });
```

## 🧪 Testing Deployment

### Test Backend
```bash
# Health check
curl https://api.yourdomain.com/api/health

# Live stock data
curl https://api.yourdomain.com/api/live-stock

# WebSocket (use wscat)
npm install -g wscat
wscat -c wss://api.yourdomain.com/ws/stock
```

### Test Frontend
1. Visit https://yourdomain.com
2. Open browser DevTools → Network
3. Check API requests are going to correct backend
4. Test WebSocket connection in Console:
```javascript
const ws = new WebSocket('wss://api.yourdomain.com/ws/stock');
ws.onmessage = (e) => console.log(JSON.parse(e.data));
```

## 🔄 CI/CD Setup

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Deploy to Railway
        run: |
          cd backend
          npm install
          railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Build and Deploy
        run: |
          npm install
          npm run build
          vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

## 📞 Support

For deployment issues:
- Backend: Check `backend/README.md`
- API Integration: Check `README-API.md`
- Frontend: Check main `README.md`
