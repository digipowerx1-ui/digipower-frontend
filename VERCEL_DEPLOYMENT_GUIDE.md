# Vercel Deployment Guide - Fixing Mixed Content Issues

## Problem
Your Vercel frontend (HTTPS) was blocked from calling your EC2 backend (HTTP) due to browser mixed content security policy. The error message you saw was:
```
Referrer Policy: strict-origin-when-cross-origin
```

## Solution
We've implemented Vercel serverless functions as proxies to your EC2 backend. This bypasses the mixed content issue because:
1. Frontend calls Vercel API routes (same domain, HTTPS) ✅
2. Vercel API routes call EC2 backend (server-to-server, no browser restrictions) ✅
3. Data flows back to the frontend through HTTPS ✅

## What Changed

### 1. New Vercel Serverless Functions
- `api/live-stock.js` - Proxies live stock data from EC2
- `api/stock.js` - Proxies historical stock data from EC2

### 2. Updated Frontend Code
- `src/pages/Investor.tsx` - Now uses relative API paths
- `src/pages/StockInformation.tsx` - Now uses relative API paths

### 3. Updated Configuration
- `vercel.json` - Added `BACKEND_API_URL` environment variable

## Deployment Steps

### Step 1: Add Environment Variable in Vercel Dashboard

1. Go to your Vercel project: https://vercel.com/dashboard
2. Navigate to your project → **Settings** → **Environment Variables**
3. Add the following environment variable:
   - **Key**: `BACKEND_API_URL`
   - **Value**: `http://ec2-51-20-254-227.eu-north-1.compute.amazonaws.com`
   - **Environments**: Check all (Production, Preview, Development)
4. Click **Save**

### Step 2: Deploy to Vercel

Option A - Deploy via Git (Recommended):
```bash
git add .
git commit -m "Add Vercel serverless proxies to fix mixed content issues"
git push origin main
```
Vercel will automatically deploy your changes.

Option B - Deploy via Vercel CLI:
```bash
npm install -g vercel
vercel --prod
```

### Step 3: Test Your Deployment

Once deployed, test your site:
1. Visit: https://digipower-frontend.vercel.app/investor-relations
2. Open browser DevTools (F12) → Network tab
3. You should see successful API calls to `/api/live-stock` and `/api/stock`
4. No more mixed content errors! ✅

## Local Development

To test locally with Vercel dev server:

```bash
# Install Vercel CLI if not already installed
npm install -g vercel

# Run Vercel dev server
vercel dev
```

This will:
- Run your Vite frontend on http://localhost:3000
- Run the serverless functions locally
- Allow you to test the full flow

## Alternative Solutions (Long-term)

While the serverless proxy works great, consider these long-term solutions:

### Option 1: Enable HTTPS on EC2 Backend (Recommended)
**Benefits**: Direct connection, no proxy overhead, more secure

**Steps**:
1. Use AWS Certificate Manager (ACM) to get a free SSL certificate
2. Use AWS Application Load Balancer (ALB) with HTTPS listener
3. Update `BACKEND_API_URL` to `https://your-domain.com`

### Option 2: Use Cloudflare as Reverse Proxy
**Benefits**: Free SSL, DDoS protection, caching, analytics

**Steps**:
1. Add your domain to Cloudflare
2. Point your domain to EC2 IP
3. Enable Cloudflare proxy (orange cloud icon)
4. Cloudflare automatically provides HTTPS

### Option 3: Use AWS API Gateway
**Benefits**: Managed service, auto-scaling, built-in HTTPS

**Steps**:
1. Create API Gateway REST API
2. Create proxy integration to EC2
3. Deploy to stage
4. Get HTTPS endpoint from API Gateway

## Monitoring

After deployment, monitor:
1. Vercel function logs: https://vercel.com/dashboard → Your Project → Logs
2. Check function invocations and errors
3. Monitor response times

## Troubleshooting

### Issue: "Failed to fetch stock data"
**Solution**: Check that `BACKEND_API_URL` is set correctly in Vercel dashboard

### Issue: "Backend returned 500"
**Solution**: Check EC2 backend is running and accessible:
```bash
curl http://ec2-51-20-254-227.eu-north-1.compute.amazonaws.com/api/live-stock
```

### Issue: Functions timing out
**Solution**: Vercel serverless functions have a 10s timeout on hobby plan. Upgrade to Pro for 60s timeout.

## Cost Considerations

**Vercel Hobby Plan (Free)**:
- 100GB bandwidth/month
- 100 hours function execution/month
- Should be sufficient for moderate traffic

**Vercel Pro Plan ($20/month)**:
- 1TB bandwidth
- 1000 hours function execution
- 60s function timeout (vs 10s)
- Recommended for production

## Security Notes

1. **API Key Protection**: Your `MASSIVE_API_KEY` is only used on the EC2 backend (server-side), never exposed to frontend ✅
2. **CORS**: The proxy functions include proper CORS headers
3. **Rate Limiting**: Consider adding rate limiting to prevent abuse

## Questions?

If you encounter any issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify environment variables are set
4. Test EC2 backend directly with curl

---

**Status**: ✅ Ready to deploy
**Last Updated**: 2025-11-23
