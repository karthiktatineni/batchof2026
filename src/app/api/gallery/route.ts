import { NextResponse } from 'next/server';
import redis from '@/lib/redis';
import { galleryImages } from '@/lib/gallery-data';

export async function GET() {
  try {
    // Try to get from cache first
    const cachedData = await redis.get('gallery_data');
    
    if (cachedData) {
      return NextResponse.json(JSON.parse(cachedData));
    }

    // If not in cache, get from source (lib/gallery-data)
    const data = galleryImages;

    // Store in cache for 1 hour (3600 seconds)
    await redis.set('gallery_data', JSON.stringify(data), 'EX', 3600);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Gallery API Error:', error);
    // Fallback to source if Redis fails
    return NextResponse.json(galleryImages);
  }
}
