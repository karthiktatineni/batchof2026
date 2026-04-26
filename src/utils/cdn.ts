/**
 * Utility to handle CDN URL wrapping for images.
 * This ensures faster loading by utilizing edge servers.
 */

const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || '';

export function getCdnUrl(path: string): string {
  if (!path) return '';
  
  // If it's already an absolute URL, return it
  if (path.startsWith('http')) return path;
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Combine CDN URL with path
  return `${CDN_URL}${normalizedPath}`;
}
