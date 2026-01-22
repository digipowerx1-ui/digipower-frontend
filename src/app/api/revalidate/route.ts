import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

// Secret token to secure the webhook - set this in your environment variables
const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;

export async function POST(request: Request) {
  try {
    // Get the secret from query params or headers
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret') || request.headers.get('x-revalidation-secret');

    // Validate the secret token
    if (REVALIDATION_SECRET && secret !== REVALIDATION_SECRET) {
      return NextResponse.json(
        { error: 'Invalid secret token' },
        { status: 401 }
      );
    }

    // Parse the request body to get the content type
    let body: { model?: string; entry?: { id?: number } } = {};
    try {
      body = await request.json();
    } catch {
      // Body might be empty for simple revalidation calls
    }

    const model = body.model?.toLowerCase() || searchParams.get('model')?.toLowerCase();
    const paths: string[] = [];

    // Determine which paths to revalidate based on the Strapi model
    switch (model) {
      case 'press-release':
      case 'press-releases':
        paths.push('/press-releases');
        paths.push('/investor-relations'); // Also shows press releases
        // If a specific entry was updated, revalidate its detail page too
        if (body.entry?.id) {
          paths.push(`/press-releases/${body.entry.id}`);
        }
        break;

      case 'sec-filing':
      case 'sec-filings':
        paths.push('/sec-filings');
        break;

      case 'open-position':
      case 'open-positions':
        paths.push('/career');
        break;

      default:
        // If no specific model, revalidate common pages
        if (!model) {
          paths.push('/press-releases');
          paths.push('/sec-filings');
          paths.push('/investor-relations');
        }
    }

    // Revalidate all the paths
    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({
      revalidated: true,
      paths,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error during revalidation:', error);
    return NextResponse.json(
      {
        error: 'Failed to revalidate',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Also support GET for easy manual testing
export async function GET(request: Request) {
  return POST(request);
}
