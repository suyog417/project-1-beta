// frontend/src/app/api/blogs/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5000';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/blogs/${id}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json({ message: errorData.message || `Failed to fetch blog with ID ${id} from backend` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(`Error in Next.js API route (GET /api/blogs/${id}):`, error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const contentType = req.headers.get("content-type") || "";

    const response = await fetch(`${BACKEND_BASE_URL}/api/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': contentType,
      },
      body: req.body,
      // @ts-ignore
      duplex: 'half',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json({ message: errorData.message || `Failed to update blog with ID ${id}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(`Error in Next.js API route (PUT /api/blogs/${id}):`, error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json({ message: errorData.message || `Failed to delete blog with ID ${id}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(`Error in Next.js API route (DELETE /api/blogs/${id}):`, error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
