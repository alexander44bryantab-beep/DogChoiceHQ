import Link from "next/link";
import { products } from "@/data/products";
import { getVerificationLabel } from "@/lib/catalog";
import "./catalog.css";

export default function CatalogPage() {
  return (
    <main className="container product-page">
      <Link className="back-link" href="/">← DogChoiceHQ</Link>
      <p className="eyebrow">PRODUCT CATALOG</p>
      <h1 className="compare-title">Research before we recommend.</h1>
      <p className="hero-copy">Every product record is designed to carry source, verification, nutrition, pricing, and recommendation data. Products should not be treated as launch-ready recommendations until those fields are verified.</p>
      <section className="product-details">
        <div className="comparison-header"><h2>Catalog status</h2><span className="sample-note">{products.length} prototype records</span></div>
        <div className="catalog-list">
          {products.map((product) => (
            <article className="catalog-row" key={product.id}>
              <div><p className="product-brand">{product.brand}</p><h3>{product.name}</h3><p>{product.category} · {product.bestFor}</p></div>
              <span className="verification-pill">{getVerificationLabel(product)}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="product-details">
        <h2>Publication checklist</h2>
        <ul>
          <li>Confirm the manufacturer and exact product name.</li>
          <li>Verify the current package label and nutritional adequacy statement.</li>
          <li>Record guaranteed analysis, calories, ingredients, and life-stage information.</li>
          <li>Capture a primary source URL and verification date.</li>
          <li>Check current price and retailer availability before publishing commercial claims.</li>
        </ul>
      </section>
    </main>
  );
}
