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
 *
 * We intentionally keep the weights visible so the ranking can be audited and
 * improved as DogChoiceHQ begins using verified product data.
 */
export function scoreProduct(product: Product): ScoredProduct {
  const ratingScore = clamp(product.rating * 20);
  const valueScore = clamp(100 - product.price * 1.25);
  const featureScore = clamp(product.features.length * 20);

  const score = Math.round(
    ratingScore * 0.55 + valueScore * 0.25 + featureScore * 0.2,
  );

  const reasons: RecommendationReason[] = [
    { label: "User rating", score: Math.round(ratingScore) },
    { label: "Value", score: Math.round(valueScore) },
    { label: "Product features", score: Math.round(featureScore) },
  ];

  return { ...product, score, reasons };
}

export function rankProducts(products: Product[]) {
  return products
    .map(scoreProduct)
    .sort((a, b) => b.score - a.score);
}

export function getRecommendationLabel(product: ScoredProduct, rank: number) {
  if (rank === 0) return "Best Overall";
  if (product.score >= 80) return "Top Choice";
  if (product.price <= 30) return "Best Value";
  return "Strong Option";
}
