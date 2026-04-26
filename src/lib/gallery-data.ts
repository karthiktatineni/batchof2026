export type YearCategory = '1st Year' | '2nd Year' | '3rd Year' | '4th Year';

export interface GalleryImage {
  id: string;
  src: string;
  category: YearCategory;
  title: string;
}

export const galleryImages: GalleryImage[] = [];
