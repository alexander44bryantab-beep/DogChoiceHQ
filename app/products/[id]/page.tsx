import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "../../../data/products";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <main className="container product-page">
      <Link className="back-link" href="/compare">← Back to comparison</Link>
      <div className="product-hero">
        <div className="product-placeholder">🐕</div>
        <div>
          <p className="eyebrow">{product.category.toUpperCase()}</p>
          {product.badge && <div className="badge">{product.badge}</div>}
          <h1 className="compare-title">{product.name}</h1>
          <p className="product-brand">{product.brand}</p>
          <p className="hero-copy">{product.summary}</p>
          <div className="product-meta"><strong>★ {product.rating.toFixed(1)}</strong><strong>${product.price.toFixed(2)}</strong></div>
          <a className="button primary" href={product.affiliateUrl}>Check current price</a>
        </div>
      </div>
      <section className="product-details">
        <h2>Why it stands out</h2>
        <p><strong>Best for:</strong> {product.bestFor}</p>
        <ul>{product.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
      </section>
      <p className="disclosure">DogChoiceHQ may earn a commission from qualifying purchases. Product details and prices should be verified with the retailer before purchase.</p>
    </main>
  );
}
