import { Product } from "@/types/product";
import fs from "fs";
import path from "path";

const productsFilePath = path.join(process.cwd(), "src", "data", "products.json");

export function getAllProducts(): Product[] {
  const data = fs.readFileSync(productsFilePath, "utf-8");
  return JSON.parse(data) as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = getAllProducts();
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  const products = getAllProducts();
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  const products = getAllProducts();
  return products.filter((p) => p.categoryEn === category || p.category === category);
}

export function getCategories(): { name: string; nameEn: string }[] {
  const products = getAllProducts();
  const seen = new Set<string>();
  const categories: { name: string; nameEn: string }[] = [];
  for (const p of products) {
    if (!seen.has(p.categoryEn)) {
      seen.add(p.categoryEn);
      categories.push({ name: p.category, nameEn: p.categoryEn });
    }
  }
  return categories;
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const products = getAllProducts();
  return products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, limit);
}

export function saveProducts(products: Product[]): void {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), "utf-8");
}