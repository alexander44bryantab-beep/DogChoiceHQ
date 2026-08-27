import { getVerificationRecord, hasRequiredVerificationEvidence } from "./verification";

export type LifeStage = "Puppy" | "Adult Maintenance" | "All Life Stages";
export type AdequacyMethod = "Nutrient Profile" | "Feeding Trial" | "Unknown";
export type VerificationStatus = "demo" | "needs-review" | "verified";

export type GuaranteedAnalysis = {
  proteinMin?: number;
  fatMin?: number;
  fiberMax?: number;
  moistureMax?: number;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: "Dog Food" | "Treats" | "Supplements" | "Essentials";
  price: number;
  rating: number;
  badge?: string;
  summary: string;
  bestFor: string;
  features: string[];
  affiliateUrl: string;
  lifeStages?: LifeStage[];
  completeAndBalanced?: boolean;
  adequacyMethod?: AdequacyMethod;
  guaranteedAnalysis?: GuaranteedAnalysis;
  caloriesPerKg?: number;
  ingredients?: string[];
  labelVerified?: boolean;
  verificationStatus: VerificationStatus;
  sourceUrl?: string;
  lastVerified?: string;
};

// These are deliberately sample records. Do not publish them as real product recommendations.
export const products: Product[] = [
  {
    id: "acme-balanced-chicken",
    name: "Balanced Chicken Recipe",
    brand: "DogChoice Sample Brand",
    category: "Dog Food",
    price: 34.99,
    rating: 4.8,
    badge: "Demo Top Choice",
    summary: "Sample data used to demonstrate DogChoiceHQ's evidence-based comparison model.",
    bestFor: "Everyday adult dogs",
    features: ["Chicken-based recipe", "Complete meal format", "Strong value score"],
    affiliateUrl: "#",
    lifeStages: ["Adult Maintenance"],
    completeAndBalanced: true,
    adequacyMethod: "Nutrient Profile",
    guaranteedAnalysis: { proteinMin: 26, fatMin: 15, fiberMax: 5, moistureMax: 10 },
    caloriesPerKg: 3600,
    ingredients: ["Chicken", "Brown rice", "Peas"],
    labelVerified: false,
    verificationStatus: "demo",
  },
  {
    id: "acme-sensitive-salmon",
    name: "Sensitive Salmon Recipe",
    brand: "DogChoice Sample Brand",
    category: "Dog Food",
    price: 42.99,
    rating: 4.6,
    badge: "Demo Sensitive Choice",
    summary: "Sample data used to demonstrate specialized product comparisons.",
    bestFor: "Dogs needing a different protein option",
    features: ["Salmon-based recipe", "Alternative protein", "Premium positioning"],
    affiliateUrl: "#",
    lifeStages: ["Adult Maintenance"],
    completeAndBalanced: true,
    adequacyMethod: "Nutrient Profile",
    guaranteedAnalysis: { proteinMin: 28, fatMin: 16, fiberMax: 5, moistureMax: 10 },
    caloriesPerKg: 3700,
    ingredients: ["Salmon", "Oats", "Peas"],
    labelVerified: false,
    verificationStatus: "demo",
  },
  {
    id: "acme-budget-bites",
    name: "Everyday Value Bites",
    brand: "DogChoice Sample Brand",
    category: "Dog Food",
    price: 24.99,
    rating: 4.3,
    badge: "Demo Best Value",
    summary: "Sample budget data showing how price and product information can be compared together.",
    bestFor: "Budget-conscious shoppers",
    features: ["Lower price", "Everyday format", "Value focused"],
    affiliateUrl: "#",
    lifeStages: ["Adult Maintenance"],
    completeAndBalanced: true,
    adequacyMethod: "Nutrient Profile",
    guaranteedAnalysis: { proteinMin: 24, fatMin: 12, fiberMax: 6, moistureMax: 10 },
    caloriesPerKg: 3500,
    ingredients: ["Chicken meal", "Barley", "Corn"],
    labelVerified: false,
    verificationStatus: "demo",
  },
];

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

/**
 * A product is publishable only when the product-level verification fields
 * and the independent evidence record agree.
 */
export function isProductVerified(product: Product): boolean {
  if (
    product.verificationStatus !== "verified" ||
    product.labelVerified !== true ||
    !product.sourceUrl ||
    !product.lastVerified
  ) {
    return false;
  }

  const record = getVerificationRecord(product.id);
  return Boolean(
    record &&
      record.status === "verified" &&
      record.sourceUrl === product.sourceUrl &&
      record.verifiedAt === product.lastVerified &&
      hasRequiredVerificationEvidence(record),
  );
}
