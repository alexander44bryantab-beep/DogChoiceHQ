import Link from "next/link";
import { getVerificationReviews } from "@/lib/verification-review";
import "../catalog/catalog.css";

export default function VerificationReviewPage() {
  const reviews = getVerificationReviews();
  const ready = reviews.filter((review) => review.readyForRecommendation).length;
  const verified = reviews.filter((review) => review.status === "verified").length;

  return (
    <main className="container product-page">
      <Link className="back-link" href="/catalog">← Catalog</Link>
      <p className="eyebrow">PRODUCT VERIFICATION</p>
      <h1 className="compare-title">Evidence review</h1>
      <p className="hero-copy">
        Every product must clear the evidence gate before DogChoiceHQ can use it in recommendations.
      </p>

      <section className="product-details">
        <div className="comparison-header">
          <h2>Review summary</h2>
          <span className="sample-note">
            {ready} ready · {verified} verified · {reviews.length} total
          </span>
        </div>
        <div className="catalog-list">
          {reviews.map((review) => (
            <article className="catalog-row" key={review.productId}>
              <div>
                <p className="product-brand">{review.status.replace("-", " ")}</p>
                <h3>{review.productName}</h3>
                <p>
                  {review.passedChecks}/{review.totalChecks} evidence checks passed · {review.completenessPercent}% complete
                </p>
                {review.missingChecks.length > 0 && (
                  <p className="sample-note">
                    Missing: {review.missingChecks.join(", ")}
                  </p>
                )}
              </div>
              <span className="verification-pill">
                {review.readyForRecommendation ? "Ready" : "Needs review"}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="product-details">
        <h2>Recommendation gate</h2>
        <p>
          A product is not recommendation-ready simply because its status says verified. The independent evidence record,
          source, verification date, label status, and required evidence checks must agree.
        </p>
      </section>
    </main>
  );
}
