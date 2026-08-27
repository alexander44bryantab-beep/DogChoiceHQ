import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/data/products";
import { getVerificationReview } from "@/lib/verification-review";

export default async function VerificationProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  const review = product ? getVerificationReview(id) : undefined;

  if (!product || !review) notFound();

  const evidence = product.catalogEvidence;

  return (
    <main className="container product-page">
      <Link className="back-link" href="/verification-review">← Evidence review</Link>
      <p className="eyebrow">PRODUCT EVIDENCE</p>
      <h1 className="compare-title">{product.name}</h1>
      <p className="hero-copy">{product.brand} · {review.status.replace("-", " ")}</p>

      <section className="product-details">
        <div className="comparison-header">
          <h2>Verification result</h2>
          <span className="verification-pill">
            {review.readyForRecommendation ? "Ready" : "Needs review"}
          </span>
        </div>
        <p>
          {review.passedChecks}/{review.totalChecks} evidence checks passed · {review.completenessPercent}% complete
        </p>
        {review.missingChecks.length > 0 && (
          <p className="sample-note">Missing: {review.missingChecks.join(", ")}</p>
        )}
      </section>

      <section className="product-details">
        <h2>Label & nutrition evidence</h2>
        <dl className="catalog-list">
          <div className="catalog-row"><dt>Life stage</dt><dd>{product.lifeStages?.join(", ") || "Not verified"}</dd></div>
          <div className="catalog-row"><dt>Adequacy statement</dt><dd>{evidence?.exactAdequacyStatement || "Not verified"}</dd></div>
          <div className="catalog-row"><dt>Substantiation</dt><dd>{evidence?.adequacyMethod || "Not verified"}</dd></div>
          <div className="catalog-row"><dt>Guaranteed analysis</dt><dd>{evidence?.guaranteedAnalysis ? "Verified" : "Not verified"}</dd></div>
          <div className="catalog-row"><dt>Ingredients</dt><dd>{evidence?.ingredientsVerified ? "Verified" : "Not verified"}</dd></div>
          <div className="catalog-row"><dt>Calories</dt><dd>{evidence?.caloriesVerified ? "Verified" : "Not verified"}</dd></div>
          <div className="catalog-row"><dt>Feeding directions</dt><dd>{evidence?.feedingDirectionsVerified ? "Verified" : "Not verified"}</dd></div>
          <div className="catalog-row"><dt>Manufacturer</dt><dd>{evidence?.manufacturerVerified ? "Verified" : "Not verified"}</dd></div>
        </dl>
      </section>

      <section className="product-details">
        <h2>Source & verification</h2>
        <dl className="catalog-list">
          <div className="catalog-row"><dt>Source</dt><dd>{evidence?.source.url || product.sourceUrl || "Not provided"}</dd></div>
          <div className="catalog-row"><dt>Verified</dt><dd>{evidence?.verifiedAt || product.lastVerified || "Not verified"}</dd></div>
          <div className="catalog-row"><dt>Status</dt><dd>{evidence?.status || product.verificationStatus}</dd></div>
        </dl>
      </section>
    </main>
  );
}
