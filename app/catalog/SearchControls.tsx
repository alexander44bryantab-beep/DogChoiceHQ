"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function SearchControls() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("query") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "all");

  const updateUrl = useCallback((nextQuery: string, nextCategory: string) => {
    const params = new URLSearchParams(searchParams.toString());
    nextQuery ? params.set("query", nextQuery) : params.delete("query");
    nextCategory !== "all" ? params.set("category", nextCategory) : params.delete("category");
    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);

  useEffect(() => {
    const timer = window.setTimeout(() => updateUrl(query.trim(), category), 250);
    return () => window.clearTimeout(timer);
  }, [query, category, updateUrl]);

  return (
    <div className="catalog-controls">
      <label>
        <span>Search products</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Brand, product, or use case" />
      </label>
      <label>
        <span>Category</span>
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="all">All categories</option>
          <option value="Dog Food">Dog Food</option>
          <option value="Treats">Treats</option>
          <option value="Supplements">Supplements</option>
          <option value="Essentials">Essentials</option>
        </select>
      </label>
    </div>
  );
}
