import {
  isRecommendationReady,
  type CatalogEvidence,
  type CommercialListing,
} from "./catalog-evidence-schema";
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
  /** Structured evidence for the real-product verification workflow. */
  catalogEvidence?: CatalogEvidence;
  /** Optional current retailer/affiliate listings kept separate from nutrition evidence. */
  commercialListings?: CommercialListing[];
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
  {
    id: "purina-pro-plan-turkey-sweet-potato-wet-adult",
    name: "Pro Plan Adult Complete Essentials Grain Free Turkey & Sweet Potato Entrée Classic Wet Dog Food",
    brand: "Purina Pro Plan",
    category: "Dog Food",
    price: 2.89,
    rating: 0,
    badge: "Verified Source",
    summary:
      "Adult wet dog food with turkey and sweet potato. Nutritional and label evidence is sourced from Purina materials; retailer pricing is tracked separately.",
    bestFor: "Adult dogs needing a complete and balanced wet food",
    features: [
      "Adult maintenance",
      "Complete and balanced",
      "Turkey as the first ingredient",
      "Wet food",
    ],
    affiliateUrl:
      "https://www.purina.com/dogs/shop/pro-plan-complete-essentials-grain-free-turkey-sweet-potato-wet-dog-food",
    lifeStages: ["Adult Maintenance"],
    completeAndBalanced: true,
    adequacyMethod: "Nutrient Profile",
    guaranteedAnalysis: {
      proteinMin: 9,
      fatMin: 6,
      fiberMax: 1.5,
      moistureMax: 78,
    },
    caloriesPerKg: 1191,
    ingredients: [
      "Turkey",
      "Water",
      "Liver",
      "Meat By-Products",
      "Chicken",
      "Sweet Potatoes",
      "Guar Gum",
      "Minerals",
      "Salt",
      "Carrageenan",
      "Fish Oil",
      "Vitamins",
      "Choline Chloride",
    ],
    labelVerified: true,
    verificationStatus: "verified",
    sourceUrl:
      "https://www.proplanvetdirect.com/canine-pro-plan-natural-grain-free-turkey-sweet-potato-entree-adult",
    lastVerified: "2026-08-26",
    catalogEvidence: {
      exactAdequacyStatement:
        "Pro Plan Complete Essentials Turkey & Sweet Potato Entrée Classic is formulated to meet the nutritional levels established by the AAFCO Dog Food Nutrient Profiles for maintenance of adult dogs.",
      adequacyMethod: "nutrient-profile",
      lifeStageVerified: true,
      guaranteedAnalysis: {
        proteinPercent: 9,
        fatPercent: 6,
        fiberPercent: 1.5,
        moisturePercent: 78,
        caloriesPerKg: 1191,
        caloriesPerCan: 438,
        basis: "as-fed",
      },
      ingredientsVerified: true,
      caloriesVerified: true,
      feedingDirectionsVerified: true,
      manufacturerVerified: true,
      source: {
        url: "https://www.proplanvetdirect.com/canine-pro-plan-natural-grain-free-turkey-sweet-potato-entree-adult",
        type: "manufacturer-product-page",
        title: "Complete Essentials Turkey & Sweet Potato Grain Free Wet Dog Food",
        accessedAt: "2026-08-26",
      },
      reviewerNotes:
        "Primary manufacturer source reviewed. Guaranteed analysis is recorded on an as-fed basis. Calorie content is 1,191 kcal/kg and 438 kcal/can. Feeding directions and adult-maintenance adequacy statement were also reviewed.",
      status: "verified",
      verifiedAt: "2026-08-26",
    },
    commercialListings: [
      {
        retailerName: "PetSmart",
        url: "https://www.petsmart.com/dog/food/canned-food/purina-pro-plan-complete-essentials-adult-wet-dog-food---grain-free-turkey-and-sweet-potato-13-oz-47255.html",
        packageSize: "13 oz can",
        price: 2.89,
        currency: "USD",
        priceCheckedAt: "2026-08-26",
      },
    ],
  },
];

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

/**
 * A product is publishable only when the product-level verification fields,
 * independent review record, and structured catalog evidence all agree.
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
  if (
    !record ||
    record.status !== "verified" ||
    record.sourceUrl !== product.sourceUrl ||
    record.verifiedAt !== product.lastVerified ||
    !hasRequiredVerificationEvidence(record)
  ) {
    return false;
  }

  const evidence = product.catalogEvidence;
  if (!evidence) return false;

  const category =
    product.category === "Dog Food" ? "wet-food" : "dry-food";

  return isRecommendationReady({
    id: product.id,
    brand: product.brand,
    productName: product.name,
    species: "dog",
    category,
    lifeStages: (product.lifeStages ?? []).map((stage) =>
      stage === "Puppy"
        ? "puppy"
        : stage === "Adult Maintenance"
          ? "adult"
          : "all-life-stages",
    ),
    labelSource: evidence.source,
    evidence,
    listings: product.commercialListings,
  });
}
