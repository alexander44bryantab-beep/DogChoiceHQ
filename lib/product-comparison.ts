import type { Product } from "../data/products";
import { isProductVerified } from "../data/products";

export type DogProfile = {
  lifeStage: "Puppy" | "Adult Maintenance" | "All Life Stages";
  size?: "Small" | "Medium" | "Large";
  priorities?: string[];
  maxPrice?: number;
};

export type ComparisonRow = {
  productId: string;
  productName: string;
  brand: string;
  fitScore: number;
  verificationScore: number;
  valueScore: number;
  totalScore: number;
  reasons: string[];
};

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

function lifeStageFit(product: Product, profile: DogProfile): number {
  if (!product.lifeStages?.length) return 0;
  if (product.lifeStages.includes(profile.lifeStage)) return 100;
  if (product.lifeStages.includes("All Life Stages")) return 90;
  return 0;
}

function priorityFit(product: Product, profile: DogProfile): number {
  if (!profile.priorities?.length) return 100;
  const text = [product.name, product.summary, product.bestFor, ...product.features]
    .join(" ")
    .toLowerCase();
  const matches = profile.priorities.filter((priority) =>
    text.includes(priority.toLowerCase()),
  ).length;
  return (matches / profile.priorities.length) * 100;
}

function priceFit(product: Product, profile: DogProfile): number {
  if (profile.maxPrice === undefined) return 100;
  if (product.price <= profile.maxPrice) return 100;
  const over = (product.price - profile.maxPrice) / profile.maxPrice;
  return clamp(100 - over * 100);
}

function verificationScore(product: Product): number {
  if (!isProductVerified(product)) return 0;
  const evidence = product.catalogEvidence;
  if (!evidence) return 0;
  const checks = [
    evidence.exactAdequacyStatement,
    evidence.adequacyMethod,
    evidence.lifeStageVerified,
    evidence.guaranteedAnalysis,
    evidence.ingredientsVerified,
    evidence.caloriesVerified,
    evidence.feedingDirectionsVerified,
    evidence.manufacturerVerified,
    evidence.source,
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

function valueScore(product: Product, profile: DogProfile): number {
  const budget = profile.maxPrice ?? product.price;
  if (product.price <= 0) return 0;
  return clamp((budget / product.price) * 70 + product.rating * 6);
}

export function compareVerifiedProducts(
  products: Product[],
  profile: DogProfile,
): ComparisonRow[] {
  return products
    .filter(isProductVerified)
    .map((product) => {
      const stage = lifeStageFit(product, profile);
      const priorities = priorityFit(product, profile);
      const price = priceFit(product, profile);
      const fitScore = Math.round(stage * 0.5 + priorities * 0.3 + price * 0.2);
      const verification = verificationScore(product);
      const value = valueScore(product, profile);
      const totalScore = Math.round(fitScore * 0.6 + verification * 0.25 + value * 0.15);
      const reasons: string[] = [];

      if (stage >= 90) reasons.push(`Matches ${profile.lifeStage.toLowerCase()} life stage`);
      if (priorities >= 75 && profile.priorities?.length) reasons.push("Matches stated priorities");
      if (price >= 90) reasons.push("Fits the stated budget");
      if (verification === 100) reasons.push("Evidence requirements passed");

      return {
        productId: product.id,
        productName: product.name,
        brand: product.brand,
        fitScore,
        verificationScore: verification,
        valueScore: value,
        totalScore,
        reasons,
      };
    })
    .sort((a, b) => b.totalScore - a.totalScore);
}
