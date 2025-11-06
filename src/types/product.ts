// src/types/product.ts

export type Product = {
  id: number;
  name: string;

  // Images (normalized from your sheet headers)
  first_image_url?: string;
  second_image_url?: string;
  third_image_url?: string;
  fourth_image_url?: string;

  // Meta
  platform?: string;
  category?: string;
  tags?: string;
  description?: string;

  // Prices
  original_price?: number;
  buy_price?: number;

  // Affiliate
  affiliate_url?: string;

  // Fallbacks for unexpected/extra columns:
  [key: string]: unknown;
};
