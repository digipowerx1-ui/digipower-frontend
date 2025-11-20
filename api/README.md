# API Serverless Functions

This directory contains Vercel serverless functions that act as a secure proxy for external APIs.

## Stock API Proxy

The `stock.ts` serverless function proxies requests to the Massive.com stock API while keeping the API key secure on the server side.

### Usage

**Endpoint:** `GET /api/stock`

**Query Parameters:**
- `date` (required): Date in `YYYY-MM-DD` format

**Example:**
```
GET /api/stock?date=2025-11-20
```

**Response:**
Returns the stock data from the Massive.com API in JSON format.

### Security

- The API key is stored in the `MASSIVE_API_KEY` environment variable
- The API key is **NOT** prefixed with `VITE_`, so it remains server-side only
- The key is never exposed to the client-side code or browser
- Requests are cached for 5 minutes to reduce API calls

### Local Development

For local development, the API functions will work automatically with Vercel CLI:

```bash
npm install -g vercel
vercel dev
```

### Production Deployment

When deploying to Vercel:

1. Set the `MASSIVE_API_KEY` environment variable in your Vercel project settings
2. The serverless function will automatically be deployed and available at `/api/stock`

### Environment Variables

Make sure to add the following environment variable in your Vercel project:

- `MASSIVE_API_KEY`: Your Massive.com API key (do NOT prefix with `VITE_`)
