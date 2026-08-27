import Link from "next/link";
import "./compare.css";
import { products } from "@/data/products";
import { getRecommendationLabel, rankProducts } from "@/lib/recommendations";

export default function ComparePage() {
  const rankedProducts = rankProducts(products);
  return (
    <main>
      <section className="compare-hero"><div className="container"><Link href="/" className="back-link">← DogChoiceHQ</Link><p className="eyebrow">DOG FOOD COMPARISON</p><h1>Compare before you choose.</h1><p className="hero-copy">Our ranking prioritizes nutrition and label evidence, then considers transparency, value, and useful features. As verified catalog data grows, the ranking becomes more meaningful.</p></div></section>
      <section className="section container"><div className="comparison-header"><div><p className="eyebrow">RANKED OPTIONS</p><h2 className="section-title">Current comparison</h2></div><span className="sample-note">Demo catalog — not final product recommendations</span></div>
        <div className="comparison-grid">{rankedProducts.map((product, index) => <article className={index === 0 ? "comparison-card featured" : "comparison-card"} key={product.id}><div className="rank-row"><span className="rank">#{index + 1}</span><span className="badge">{getRecommendationLabel(product, index)}</span></div><p className="product-brand">{product.brand}</p><h3>{product.name}</h3><p className="product-summary">{product.summary}</p><div className="score-large"><strong>{product.score}</strong><span>/ 100</span></div><div className="metric"><span>Nutrition / suitability</span><b>{product.reasons[0].score}/100</b></div><div className="metric"><span>Label transparency</span><b>{product.reasons[1].score}/100</b></div><div className="metric"><span>Relative value</span><b>{product.reasons[2].score}/100</b></div><div className="metric"><span>Best for</span><b>{product.bestFor}</b></div><div className="features">{product.features.map((feature) => <span key={feature}>✓ {feature}</span>)}</div><Link className="button primary full" href={`/products/${product.id}`}>View product</Link></article>)}</div>
      </section>
      <section className="how section"><div className="container scoring-explainer"><p className="eyebrow">HOW THE SCORE WORKS</p><h2 className="section-title">Evidence before hype.</h2><div className="score-method"><div><strong>40%</strong><h3>Nutrition / suitability</h3><p>Complete-and-balanced and life-stage signals form the largest part of the current model.</p></div><div><strong>25%</strong><h3>Label transparency</h3><p>Verified label information, adequacy method, analysis, ingredients, and calories matter.</p></div><div><strong>20% + 15%</strong><h3>Value + features</h3><p>Relative price and useful product attributes round out the first-pass score.</p></div></div></div></section>
    </main>
  );
}
