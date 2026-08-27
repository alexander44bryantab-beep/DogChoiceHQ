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

/**
 * Verification records are kept separate from product presentation data so
 * evidence can grow without coupling the UI to the review workflow.
 */
export const verificationRecords: VerificationRecord[] = [];

export function getVerificationRecord(productId: string) {
  return verificationRecords.find((record) => record.productId === productId);
}

export function hasRequiredVerificationEvidence(record: VerificationRecord) {
  const required: VerificationCheck[] = ["label", "source", "date"];
  return required.every((check) =>
    record.evidence.some((item) => item.check === check && item.passed),
  );
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
