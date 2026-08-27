"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/data/products";

export default function CatalogSearch({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      const categoryMatch = category === "All" || product.category === category;
      const queryMatch = !normalized || [product.name, product.brand, product.bestFor, ...product.features].join(" ").toLowerCase().includes(normalized);
      return categoryMatch && queryMatch;
    });
  }, [products, query, category]);

  return (
    <>
      <div className="catalog-filters">
        <label>Search products<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try food, salmon, value..." /></label>
        <label>Category<select value={category} onChange={(event) => setCategory(event.target.value)}><option>All</option><option>Dog Food</option><option>Treats</option><option>Supplements</option><option>Essentials</option></select></label>
      </div>
      <p className="filter-count">Showing {results.length} of {products.length} products</p>
      <div className="catalog-list">
        {results.map((product) => <article className="catalog-row" key={product.id}><div><p className="product-brand">{product.brand}</p><h3>{product.name}</h3><p>{product.category} · {product.bestFor}</p></div><span className="verification-pill">Prototype</span></article>)}
        {!results.length && <p>No matching products yet. Try another search.</p>}
      </div>
    </>
  );
}
