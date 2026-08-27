import {
  getVerificationRecord,
  hasRequiredVerificationEvidence,
  type VerificationCheck,
} from "@/data/verification";
import { products, type Product } from "@/data/products";

export type VerificationReview = {
  productId: string;
  productName: string;
  status: "demo" | "needs-review" | "verified" | "missing-record";
  passedChecks: number;
  totalChecks: number;
  completenessPercent: number;
  missingChecks: VerificationCheck[];
  readyForRecommendation: boolean;
};

const allChecks: VerificationCheck[] = [
  "label",
  "source",
  "date",
  "life-stage",
  "adequacy",
  "analysis",
  "ingredients",
];

export function getVerificationReview(product: Product): VerificationReview {
  const record = getVerificationRecord(product.id);

  if (!record) {
    return {
      productId: product.id,
      productName: product.name,
      status: "missing-record",
      passedChecks: 0,
      totalChecks: allChecks.length,
      completenessPercent: 0,
      missingChecks: allChecks,
      readyForRecommendation: false,
    };
  }

  const passedChecks = allChecks.filter((check) =>
    record.evidence.some((item) => item.check === check && item.passed),
  ).length;

  const missingChecks = allChecks.filter(
    (check) => !record.evidence.some((item) => item.check === check && item.passed),
  );

  const completenessPercent = Math.round((passedChecks / allChecks.length) * 100);

  return {
    productId: product.id,
    productName: product.name,
    status: record.status,
    passedChecks,
    totalChecks: allChecks.length,
    completenessPercent,
    missingChecks,
    readyForRecommendation:
      record.status === "verified" &&
      hasRequiredVerificationEvidence(record) &&
      product.verificationStatus === "verified" &&
      product.labelVerified === true &&
      Boolean(product.sourceUrl) &&
      Boolean(product.lastVerified) &&
      record.sourceUrl === product.sourceUrl &&
      record.verifiedAt === product.lastVerified,
  };
}

export function getVerificationReviews(): VerificationReview[] {
  return products.map(getVerificationReview);
}
