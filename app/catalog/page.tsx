import Link from "next/link";
import { products } from "@/data/products";
import { getVerificationLabel } from "@/lib/catalog";
import SearchControls from "./SearchControls";
import "./catalog.css";

export default async function CatalogPage({ searchParams }: { searchParams?: Promise<{ query?: string; category?: string }> }) {
  const params = await searchParams;
  const query = (params?.query ?? "").trim().toLowerCase();
  const category = params?.category ?? "all";
  const filtered = products.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const haystack = `${product.name} ${product.brand} ${product.category} ${product.bestFor} ${product.summary}`.toLowerCase();
    return matchesCategory && (!query || haystack.includes(query));
  });

  return (
    <main className="container product-page">
      <Link className="back-link" href="/">← DogChoiceHQ</Link>
      <p className="eyebrow">PRODUCT CATALOG</p>
      <h1 className="compare-title">Research before we recommend.</h1>
      <p className="hero-copy">Search and filter the catalog while we build the verified product database behind DogChoiceHQ.</p>
      <section className="product-details">
        <div className="comparison-header"><h2>Catalog</h2><span className="sample-note">{filtered.length} of {products.length} prototype records</span></div>
        <SearchControls />
        <div className="catalog-list">
          {filtered.length ? filtered.map((product) => (
            <article className="catalog-row" key={product.id}>
              <div><p className="product-brand">{product.brand}</p><h3>{product.name}</h3><p>{product.category} · {product.bestFor}</p></div>
              <span className="verification-pill">{getVerificationLabel(product)}</span>
            </article>
          )) : <p className="empty-state">No products match those filters yet.</p>}
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
