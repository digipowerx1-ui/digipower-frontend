import { NextResponse } from 'next/server';

function getBackendUrl(): string {
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

export async function GET(request: Request) {
  try {
    const BACKEND_API_URL = getBackendUrl();
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol')?.toUpperCase() || 'DGXX';
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required (YYYY-MM-DD format)' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${BACKEND_API_URL}/api/stock?symbol=${symbol}&date=${date}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'No data available for the specified date' },
          { status: 404 }
        );
      }
      throw new Error(`Backend returned ${response.status}`);
    }

    const data = await response.json();

    // Add caching headers - historical stock data can be cached longer
    // Cache for 1 hour on client, 24 hours on CDN (data doesn't change for past dates)
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error proxying to backend:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch stock data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
