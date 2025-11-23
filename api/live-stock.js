/**
 * Vercel Serverless Function - Proxy for live stock data
 * This proxies requests to the EC2 backend to avoid mixed content issues
 */
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

    // Call EC2 backend (server-to-server, no mixed content issues)
    const backendUrl = process.env.BACKEND_API_URL || 'http://ec2-51-20-254-227.eu-north-1.compute.amazonaws.com';
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
