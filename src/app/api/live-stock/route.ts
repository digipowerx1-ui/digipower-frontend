import { NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://ec2-51-20-254-227.eu-north-1.compute.amazonaws.com';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol')?.toUpperCase() || 'DGXX';

    const response = await fetch(`${BACKEND_API_URL}/api/live-stock?symbol=${symbol}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Don't cache the response - we want real-time data
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const data = await response.json();

    // Add caching headers to reduce API hits
    // Cache for 30 seconds on client, 60 seconds on CDN
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=30, s-maxage=60, stale-while-revalidate=120',
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
