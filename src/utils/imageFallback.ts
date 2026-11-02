import { CategoryId } from '../types';

// High-reliability CDN fallback images for each food & beverage category
export const CATEGORY_FALLBACK_IMAGES: Record<CategoryId, string> = {
  boissons_froides: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
  jus_cocktails: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80',
  boissons_chaudes: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
  burgers_plats: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
  pizzas: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
  desserts: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
};

export const getFallbackImageForCategory = (categoryId?: CategoryId): string => {
  if (categoryId && CATEGORY_FALLBACK_IMAGES[categoryId]) {
    return CATEGORY_FALLBACK_IMAGES[categoryId];
  }
  return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80';
};
