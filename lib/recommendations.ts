import type { Product } from "@/data/products";

export type RecommendationReason = {
  label: string;
  score: number;
};

export type ScoredProduct = Product & {
  score: number;
  reasons: RecommendationReason[];
};

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value));

/**
 * Transparent first-pass ranking model.
 * The weights remain explicit so every recommendation can be audited.
 * Nutrition and label-verification signals are intentionally separated from
 * marketing claims and will become data-driven as verified catalog fields are added.
 */
export function scoreProduct(product: Product, catalog: Product[] = [product]): ScoredProduct {
  const prices = catalog.map((item) => item.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = Math.max(maxPrice - minPrice, 1);

  // Conservative placeholder until verified label data is stored for each product.
  const nutritionScore = product.category === "Dog Food" ? 70 : 50;
  const transparencyScore = 50;
  const valueScore = clamp(100 - ((product.price - minPrice) / priceRange) * 100);
  const featureScore = clamp(product.features.length * 20);

  const score = Math.round(
    nutritionScore * 0.4 +
      transparencyScore * 0.2 +
      valueScore * 0.25 +
      featureScore * 0.15,
  );

  const reasons: RecommendationReason[] = [
    { label: "Nutrition / suitability", score: Math.round(nutritionScore) },
    { label: "Label transparency", score: Math.round(transparencyScore) },
    { label: "Relative value", score: Math.round(valueScore) },
    { label: "Useful features", score: Math.round(featureScore) },
  ];

  return { ...product, score, reasons };
}

export function rankProducts(products: Product[]) {
  return products
    .map((product) => scoreProduct(product, products))
    .sort((a, b) => b.score - a.score);
}

export function getRecommendationLabel(product: ScoredProduct, rank: number) {
  if (product.badge) return product.badge;
  if (rank === 0) return "Best Overall";
  if (product.price <= 30) return "Best Value";
  if (product.score >= 80) return "Top Choice";
  return "Strong Option";
}
