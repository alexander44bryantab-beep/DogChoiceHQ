export type AdequacyMethod =
  | "nutrient-profile"
  | "feeding-trial"
  | "product-family"
  | "intermittent-or-supplemental"
  | "unknown";

export type EvidenceStatus = "unreviewed" | "needs-review" | "verified" | "rejected";

export type SourceType =
  | "manufacturer-label"
  | "manufacturer-product-page"
  | "regulatory"
  | "retailer"
  | "other";

export type GuaranteedAnalysis = {
  proteinPercent?: number;
  fatPercent?: number;
  fiberPercent?: number;
  moisturePercent?: number;
  ashPercent?: number;
  caloriesPerKg?: number;
  caloriesPerCup?: number;
  caloriesPerCan?: number;
  basis: "as-fed" | "dry-matter" | "unknown";
};

export type CatalogEvidenceSource = {
  url: string;
  type: SourceType;
  title?: string;
  accessedAt: string;
  labelVersion?: string;
};

export type CatalogEvidence = {
  exactAdequacyStatement?: string;
  adequacyMethod: AdequacyMethod;
  lifeStageVerified: boolean;
  guaranteedAnalysis?: GuaranteedAnalysis;
  ingredientsVerified: boolean;
  caloriesVerified: boolean;
  feedingDirectionsVerified: boolean;
  manufacturerVerified: boolean;
  source: CatalogEvidenceSource;
  reviewerNotes?: string;
  status: EvidenceStatus;
  verifiedAt?: string;
};

export type CommercialListing = {
  retailerName: string;
  url: string;
  packageSize?: string;
  price?: number;
  currency?: "USD";
  priceCheckedAt?: string;
  affiliateUrl?: string;
};

export type RealCatalogRecord = {
  id: string;
  brand: string;
  productName: string;
  species: "dog";
  category: "dry-food" | "wet-food" | "fresh-food" | "freeze-dried" | "treat" | "supplement";
  manufacturer?: string;
  lifeStages: Array<"puppy" | "adult" | "senior" | "all-life-stages">;
  labelSource?: CatalogEvidenceSource;
  evidence?: CatalogEvidence;
  listings?: CommercialListing[];
};

/**
 * Evidence is a hard publication gate. Marketing copy or a product-level
 * verification flag alone is never sufficient for a recommendation.
 */
export function isCatalogEvidenceReady(evidence?: CatalogEvidence): boolean {
  if (!evidence || evidence.status !== "verified") return false;
  if (!evidence.exactAdequacyStatement) return false;
  if (evidence.adequacyMethod === "unknown") return false;
  if (!evidence.lifeStageVerified) return false;
  if (!evidence.ingredientsVerified) return false;
  if (!evidence.caloriesVerified) return false;
  if (!evidence.feedingDirectionsVerified) return false;
  if (!evidence.manufacturerVerified) return false;
  if (!evidence.source.url || !evidence.verifiedAt) return false;

  return true;
}

export function isRecommendationReady(record: RealCatalogRecord): boolean {
  return isCatalogEvidenceReady(record.evidence);
}
