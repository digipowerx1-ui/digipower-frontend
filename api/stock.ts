import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // Only allow GET requests
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { date } = request.query;

  // Validate date parameter
  if (!date || typeof date !== 'string') {
    return response.status(400).json({ error: 'Date parameter is required' });
  }

  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return response.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
  }

  try {
    const apiKey = process.env.MASSIVE_API_KEY;

    if (!apiKey) {
      console.error('MASSIVE_API_KEY is not set');
      return response.status(500).json({ error: 'Server configuration error' });
    }

    // Make request to Massive API
    const apiUrl = `https://api.massive.com/v1/open-close/DGXX/${date}?adjusted=true&apiKey=${apiKey}`;

    const apiResponse = await fetch(apiUrl);

    if (!apiResponse.ok) {
      console.error(`Massive API error: ${apiResponse.status}`);
      return response.status(apiResponse.status).json({
        error: 'Failed to fetch stock data'
      });
    }

    const data = await apiResponse.json();

    // Set cache headers (cache for 5 minutes)
    response.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

    return response.status(200).json(data);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}
