export type VerificationCheck =
  | "label"
  | "source"
  | "date"
  | "life-stage"
  | "adequacy"
  | "analysis"
  | "ingredients";

export type VerificationEvidence = {
  check: VerificationCheck;
  passed: boolean;
  note?: string;
};

export type VerificationRecord = {
  productId: string;
  status: "demo" | "needs-review" | "verified";
  verifiedAt?: string;
  sourceUrl?: string;
  evidence: VerificationEvidence[];
  reviewerNote?: string;
};

export const verificationRecords: VerificationRecord[] = [
  {
    productId: "purina-pro-plan-turkey-sweet-potato-wet-adult",
    status: "verified",
    verifiedAt: "2026-08-26",
    sourceUrl: "https://www.proplanvetdirect.com/canine-pro-plan-natural-grain-free-turkey-sweet-potato-entree-adult",
    evidence: [
      { check: "label", passed: true, note: "Manufacturer product/label information reviewed." },
      { check: "source", passed: true, note: "Primary Purina source recorded." },
      { check: "date", passed: true, note: "Evidence reviewed 2026-08-26." },
      { check: "life-stage", passed: true, note: "Adult maintenance." },
      { check: "adequacy", passed: true, note: "AAFCO Dog Food Nutrient Profiles adequacy statement for adult maintenance." },
      { check: "analysis", passed: true, note: "Guaranteed analysis and calorie content recorded from manufacturer materials." },
      { check: "ingredients", passed: true, note: "Ingredient statement recorded from manufacturer materials." },
    ],
    reviewerNote: "Verified manufacturer evidence; retailer price is stored separately.",
  },
  {
    productId: "royal-canin-fresh-health-nutrition-adult",
    status: "verified",
    verifiedAt: "2026-08-26",
    sourceUrl: "https://www.royalcanin.com/us/dogs/products/retail-products/fresh-health-nutrition-adult-8100",
    evidence: [
      { check: "label", passed: true, note: "Manufacturer product information reviewed." },
      { check: "source", passed: true, note: "Primary Royal Canin US source recorded." },
      { check: "date", passed: true, note: "Evidence reviewed 2026-08-26." },
      { check: "life-stage", passed: true, note: "Adult, one-to-seven-year life stage." },
      { check: "adequacy", passed: true, note: "AAFCO Dog Food Nutrient Profiles maintenance statement." },
      { check: "analysis", passed: true, note: "Guaranteed analysis and calorie content recorded from manufacturer materials." },
      { check: "ingredients", passed: true, note: "Ingredient statement recorded from manufacturer materials." },
    ],
    reviewerNote: "Verified manufacturer evidence; retailer price is stored separately.",
  },
  {
    productId: "royal-canin-fresh-health-nutrition-senior",
    status: "verified",
    verifiedAt: "2026-08-26",
    sourceUrl: "https://www.royalcanin.com/us/dogs/products/retail-products/fresh-health-nutrition-senior-8101",
    evidence: [
      { check: "label", passed: true, note: "Manufacturer product information reviewed." },
      { check: "source", passed: true, note: "Primary Royal Canin US source recorded." },
      { check: "date", passed: true, note: "Evidence reviewed 2026-08-26." },
      { check: "life-stage", passed: true, note: "Senior, over-seven-year life stage." },
      { check: "adequacy", passed: true, note: "AAFCO Dog Food Nutrient Profiles maintenance statement." },
      { check: "analysis", passed: true, note: "Guaranteed analysis and calorie content recorded from manufacturer materials." },
      { check: "ingredients", passed: true, note: "Ingredient statement recorded from manufacturer materials." },
    ],
    reviewerNote: "Verified manufacturer evidence; retailer price is stored separately.",
  },
];

export function getVerificationRecord(productId: string) {
  return verificationRecords.find((record) => record.productId === productId);
}

export function hasRequiredVerificationEvidence(record: VerificationRecord) {
  const required: VerificationCheck[] = ["label", "source", "date"];
  return required.every((check) => record.evidence.some((item) => item.check === check && item.passed));
}

export function getVerificationScore(record: VerificationRecord): number {
  if (record.evidence.length === 0) return 0;
  const passed = record.evidence.filter((item) => item.passed).length;
  return Math.round((passed / record.evidence.length) * 100);
}

export function isVerificationComplete(record: VerificationRecord): boolean {
  return (
    record.status === "verified" &&
    hasRequiredVerificationEvidence(record) &&
    record.evidence.some((item) => item.check === "life-stage" && item.passed) &&
    record.evidence.some((item) => item.check === "adequacy" && item.passed) &&
    record.evidence.some((item) => item.check === "analysis" && item.passed) &&
    record.evidence.some((item) => item.check === "ingredients" && item.passed)
  );
}
