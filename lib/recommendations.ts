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

function scoreNutrition(product: Product) {
  if (product.category !== "Dog Food") return 50;
  if (!product.completeAndBalanced) return 20;
  if (!product.lifeStages?.length) return 55;
  return 90;
}

function scoreTransparency(product: Product) {
  let score = 0;
  if (product.labelVerified) score += 40;
  if (product.adequacyMethod && product.adequacyMethod !== "Unknown") score += 25;
  if (product.guaranteedAnalysis) score += 15;
  if (product.ingredients?.length) score += 10;
  if (product.caloriesPerKg) score += 10;
  return clamp(score);
}

function scoreValue(product: Product, catalog: Product[]) {
  const prices = catalog.map((item) => item.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (max === min) return 100;
  return clamp(100 - ((product.price - min) / (max - min)) * 100);
}

function scoreFeatures(product: Product) {
  return clamp(product.features.length * 20);
}

export function scoreProduct(product: Product, catalog: Product[] = [product]): ScoredProduct {
  const nutritionScore = scoreNutrition(product);
  const transparencyScore = scoreTransparency(product);
  const valueScore = scoreValue(product, catalog);
  const featureScore = scoreFeatures(product);

  // Evidence-first weighting. Verified label/nutrition data matters more than marketing features.
  const score = Math.round(
    nutritionScore * 0.4 +
      transparencyScore * 0.25 +
      valueScore * 0.2 +
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
