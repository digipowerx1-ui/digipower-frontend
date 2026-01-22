/**
 * Vercel Serverless Function - Proxy for live stock data
 * This proxies requests to the EC2 backend to avoid mixed content issues
 */

function getBackendUrl() {
  const url = process.env.BACKEND_API_URL;
  if (!url) {
    throw new Error('BACKEND_API_URL environment variable is not configured');
  }
  // Enforce HTTPS in production
  if (process.env.NODE_ENV === 'production' && !url.startsWith('https://')) {
    console.warn('Warning: BACKEND_API_URL should use HTTPS in production');
  }
  return url;
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const symbol = req.query.symbol?.toUpperCase() || 'DGXX';

    const backendUrl = getBackendUrl();
    const response = await fetch(`${backendUrl}/api/live-stock?symbol=${symbol}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const data = await response.json();

    // Return the data to the frontend
    res.status(200).json(data);
  } catch (error) {
    console.error('Error proxying to backend:', error);
    res.status(500).json({
      error: 'Failed to fetch stock data',
      message: error.message
    });
  }
}
