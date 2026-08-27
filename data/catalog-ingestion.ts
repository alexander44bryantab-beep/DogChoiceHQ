import {
  isRecommendationReady,
  type RealCatalogRecord,
} from "./catalog-evidence-schema";

export type IngestionResult = {
  ready: boolean;
  missing: string[];
  record: RealCatalogRecord;
};

/**
 * Validates a real catalog record before it can enter the recommendation pipeline.
 * This intentionally reports missing evidence instead of silently filling gaps.
 */
export function validateCatalogRecord(record: RealCatalogRecord): IngestionResult {
  const missing: string[] = [];
  const evidence = record.evidence;

  if (!record.id) missing.push("product id");
  if (!record.brand) missing.push("brand");
  if (!record.productName) missing.push("product name");
  if (record.species !== "dog") missing.push("dog species");
  if (!record.lifeStages.length) missing.push("life stage");
  if (!evidence) {
    missing.push("verification evidence");
    return { ready: false, missing, record };
  }

  if (!evidence.exactAdequacyStatement) missing.push("exact adequacy statement");
  if (evidence.adequacyMethod === "unknown") missing.push("adequacy substantiation method");
  if (!evidence.lifeStageVerified) missing.push("life-stage verification");
  if (!evidence.guaranteedAnalysis) missing.push("guaranteed analysis");
  if (!evidence.ingredientsVerified) missing.push("ingredients verification");
  if (!evidence.caloriesVerified) missing.push("calorie verification");
  if (!evidence.feedingDirectionsVerified) missing.push("feeding-directions verification");
  if (!evidence.manufacturerVerified) missing.push("manufacturer verification");
  if (!evidence.source.url) missing.push("primary source URL");
  if (!evidence.verifiedAt) missing.push("verification date");
  if (evidence.status !== "verified") missing.push("verified evidence status");

  return {
    ready: missing.length === 0 && isRecommendationReady(record),
    missing,
    record,
  };
}

export function getIngestionStatus(record: RealCatalogRecord): string {
  const result = validateCatalogRecord(record);
  return result.ready
    ? "Ready for recommendation"
    : `Needs review: ${result.missing.join(", ")}`;
}
