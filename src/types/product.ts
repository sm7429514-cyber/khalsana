export type Product = {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  category: string;
  categoryEn: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
  images: string[];
  featured: boolean;
  whatsappMessage: string;
  createdAt: string;
};