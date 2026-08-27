import type { Product } from "@/data/products";

export type VerificationStatus = "verified" | "needs-review" | "demo";

export function getVerificationStatus(product: Product): VerificationStatus {
  if (product.brand === "DogChoice Sample Brand") return "demo";
  if (!product.labelVerified || !product.sourceUrl || !product.lastVerified) return "needs-review";
  return "verified";
}

export function getVerificationLabel(product: Product) {
  const status = getVerificationStatus(product);
  if (status === "verified") return "Verified product data";
  if (status === "needs-review") return "Needs verification";
  return "Demo data — not for publication";
}

export function filterProducts(products: Product[], query: string, category?: Product["category"]) {
  const normalized = query.trim().toLowerCase();
  return products.filter((product) => {
    const categoryMatches = !category || product.category === category;
    const queryMatches = !normalized || [product.name, product.brand, product.bestFor, ...product.features]
      .join(" ")
      .toLowerCase()
      .includes(normalized);
    return categoryMatches && queryMatches;
  });
}
