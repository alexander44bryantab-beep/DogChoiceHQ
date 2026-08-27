import Link from "next/link";
import VerificationReviewTable from "../VerificationReviewTable";
import { products } from "@/data/products";
import "../../catalog/catalog.css";

export default function VerificationReviewTablePage() {
  return (
    <main className="container product-page">
      <Link className="back-link" href="/verification-review">← Verification review</Link>
      <p className="eyebrow">PRODUCT VERIFICATION</p>
      <h1 className="compare-title">Evidence review table</h1>
      <p className="hero-copy">
        Review every catalog record against the ingestion gate before it can enter DogChoiceHQ recommendations.
      </p>
      <section className="product-details">
        <div className="comparison-header">
          <h2>Catalog evidence</h2>
          <span className="sample-note">{products.length} records</span>
        </div>
        <VerificationReviewTable products={products} />
      </section>
      <section className="product-details">
        <h2>Review rule</h2>
        <p>
          Missing evidence is surfaced explicitly. A product stays out of recommendations until the required evidence,
          verification record, and product-level status all agree.
        </p>
      </section>
    </main>
  );
}
