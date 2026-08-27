import Link from "next/link";
import "./compare.css";
import { products } from "@/data/products";
import { getRecommendationLabel, rankProducts } from "@/lib/recommendations";

export default function ComparePage() {
  const rankedProducts = rankProducts(products);
  return (
    <main>
      <section className="compare-hero"><div className="container"><Link href="/" className="back-link">← DogChoiceHQ</Link><p className="eyebrow">DOG FOOD COMPARISON</p><h1>Compare before you choose.</h1><p className="hero-copy">Our ranking combines rating, value, and product features into a transparent starting point. As we add verified data, these scores will become more useful.</p></div></section>
      <section className="section container"><div className="comparison-header"><div><p className="eyebrow">RANKED OPTIONS</p><h2 className="section-title">Current comparison</h2></div><span className="sample-note">Demo catalog — not final product recommendations</span></div>
        <div className="comparison-grid">{rankedProducts.map((product, index) => <article className={index === 0 ? "comparison-card featured" : "comparison-card"} key={product.id}><div className="rank-row"><span className="rank">#{index + 1}</span><span className="badge">{getRecommendationLabel(product, index)}</span></div><p className="product-brand">{product.brand}</p><h3>{product.name}</h3><p className="product-summary">{product.summary}</p><div className="score-large"><strong>{product.score}</strong><span>/ 100</span></div><div className="metric"><span>Rating</span><b>{product.rating.toFixed(1)} / 5</b></div><div className="metric"><span>Price</span><b>${product.price.toFixed(2)}</b></div><div className="metric"><span>Best for</span><b>{product.bestFor}</b></div><div className="features">{product.features.map((feature) => <span key={feature}>✓ {feature}</span>)}</div><Link className="button primary full" href={`/products/${product.id}`}>View product</Link></article>)}</div>
      </section>
      <section className="how section"><div className="container scoring-explainer"><p className="eyebrow">HOW THE SCORE WORKS</p><h2 className="section-title">No mystery ranking.</h2><div className="score-method"><div><strong>55%</strong><h3>Rating</h3><p>Customer rating contributes the largest share of the first-pass score.</p></div><div><strong>25%</strong><h3>Value</h3><p>Price is considered so a higher-priced product doesn't automatically win.</p></div><div><strong>20%</strong><h3>Features</h3><p>Useful product features contribute to the remaining score.</p></div></div></div></section>
    </main>
  );
}
