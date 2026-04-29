import { NextResponse } from 'next/server';
import { galleryImages } from '@/lib/gallery-data';

export async function GET() {
  try {
    const data = galleryImages;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Gallery API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery data' }, { status: 500 });
  }
}
