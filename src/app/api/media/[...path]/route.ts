import { NextRequest, NextResponse } from 'next/server';
import { STRAPI_MEDIA_URL } from '@/lib/strapi';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const filePath = path.join('/');

    // Construct the full Strapi media URL
    const mediaUrl = `${STRAPI_MEDIA_URL}/${filePath}`;

    // Fetch the file from Strapi
    const response = await fetch(mediaUrl, {
      headers: {
        'Accept': '*/*',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: response.status }
      );
    }

    // Get the content type from the response
    const contentType = response.headers.get('content-type') || 'application/octet-stream';

    // Get the file as array buffer
    const fileBuffer = await response.arrayBuffer();

    // Return the file with appropriate headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': contentType.includes('pdf')
          ? 'inline'
          : `attachment; filename="${filePath.split('/').pop()}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error proxying media file:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media file' },
      { status: 500 }
    );
  }
}
