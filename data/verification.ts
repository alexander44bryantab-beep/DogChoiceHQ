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
