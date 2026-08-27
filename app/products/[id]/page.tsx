import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/product-repository";

const siteUrl = "https://dogchoicehq.com";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return getProducts().map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Product not found" };

  const title = `${product.name} | ${product.brand}`;
  return {
    title,
    description: product.summary,
    alternates: { canonical: `${siteUrl}/products/${product.id}` },
    robots: product.labelVerified ? undefined : { index: false, follow: true },
    openGraph: { title, description: product.summary, url: `${siteUrl}/products/${product.id}`, type: "website" },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: product.brand },
    description: product.summary,
    category: product.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price.toFixed(2),
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/products/${product.id}`,
    },
  };

  return (
    <main className="container product-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link className="back-link" href="/catalog">← Back to catalog</Link>
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

      <section className="product-details" aria-labelledby="verification">
        <h2 id="verification">Verification</h2>
        <p><strong>{product.labelVerified ? "Label verified" : "Demo / not yet verified"}</strong></p>
        {product.lastVerified && <p>Last verified: {product.lastVerified}</p>}
        {product.sourceUrl && <p><a href={product.sourceUrl} rel="noopener noreferrer">View source</a></p>}
      </section>

      <section className="product-details" aria-labelledby="details">
        <h2 id="details">Product details</h2>
        <p><strong>Best for:</strong> {product.bestFor}</p>
        {product.lifeStages && <p><strong>Life stage:</strong> {product.lifeStages.join(", ")}</p>}
        {product.caloriesPerKg && <p><strong>Calories:</strong> {product.caloriesPerKg} kcal/kg</p>}
        <ul>{product.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
      </section>

      {product.guaranteedAnalysis && (
        <section className="product-details" aria-labelledby="analysis">
          <h2 id="analysis">Guaranteed analysis</h2>
          <ul>
            {product.guaranteedAnalysis.proteinMin !== undefined && <li>Protein: {product.guaranteedAnalysis.proteinMin}% min</li>}
            {product.guaranteedAnalysis.fatMin !== undefined && <li>Fat: {product.guaranteedAnalysis.fatMin}% min</li>}
            {product.guaranteedAnalysis.fiberMax !== undefined && <li>Fiber: {product.guaranteedAnalysis.fiberMax}% max</li>}
            {product.guaranteedAnalysis.moistureMax !== undefined && <li>Moisture: {product.guaranteedAnalysis.moistureMax}% max</li>}
          </ul>
        </section>
      )}

      {product.ingredients && (
        <section className="product-details" aria-labelledby="ingredients">
          <h2 id="ingredients">Ingredients</h2>
          <p>{product.ingredients.join(", ")}</p>
        </section>
      )}

      <p className="disclosure">DogChoiceHQ may earn a commission from qualifying purchases. Product details and prices should be verified with the retailer before purchase.</p>
    </main>
  );
}
