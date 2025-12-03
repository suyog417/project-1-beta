// frontend/src/app/api/blogs/route.ts

import { NextRequest, NextResponse } from 'next/server';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5000';

export async function GET(req: NextRequest) {
  console.log('GET /api/blogs: Fetching from', `${BACKEND_BASE_URL}/api/blogs`);
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/blogs`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json({ message: errorData.message || 'Failed to fetch blogs from backend' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in Next.js API route (GET /api/blogs):', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    
    const response = await fetch(`${BACKEND_BASE_URL}/api/blogs/create`, {
      method: 'POST',
      headers: {
        'Content-Type': contentType,
      },
      body: req.body,
      // @ts-ignore - duplex is needed for streaming body in some fetch implementations
      duplex: 'half', 
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return NextResponse.json({ message: errorData.message || 'Failed to create blog' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error('Error in Next.js API route (POST /api/blogs):', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
