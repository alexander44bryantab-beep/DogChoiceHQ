import Link from "next/link";
import { products } from "../../data/products";

export default function ComparePage() {
  return (
    <main className="container compare-page">
      <Link className="back-link" href="/">← DogChoiceHQ</Link>
      <p className="eyebrow">DOG FOOD COMPARISON</p>
      <h1 className="compare-title">Compare your options.</h1>
      <p className="hero-copy">See the differences side by side. These sample products are placeholders while we build the real catalog and affiliate data.</p>
      <div className="comparison-table-wrap">
        <table className="comparison-table">
          <thead><tr><th>Product</th>{products.map((p) => <th key={p.id}>{p.name}</th>)}</tr></thead>
          <tbody>
            <tr><th>Brand</th>{products.map((p) => <td key={p.id}>{p.brand}</td>)}</tr>
            <tr><th>Rating</th>{products.map((p) => <td key={p.id}>★ {p.rating.toFixed(1)} / 5</td>)}</tr>
            <tr><th>Price</th>{products.map((p) => <td key={p.id}>${p.price.toFixed(2)}</td>)}</tr>
            <tr><th>Best for</th>{products.map((p) => <td key={p.id}>{p.bestFor}</td>)}</tr>
            <tr><th>Highlights</th>{products.map((p) => <td key={p.id}>{p.features.join(" • ")}</td>)}</tr>
            <tr><th>Details</th>{products.map((p) => <td key={p.id}><Link className="table-link" href={`/products/${p.id}`}>View product →</Link></td>)}</tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
