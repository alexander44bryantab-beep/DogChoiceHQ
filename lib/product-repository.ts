import { products, type LifeStage, type Product } from "@/data/products";

export type ProductFilters = {
  category?: Product["category"];
  lifeStage?: LifeStage;
  query?: string;
  verifiedOnly?: boolean;
};

/**
 * Single gateway for product/catalog reads.
 *
 * Today this repository reads the local sample catalog. Keeping these queries
 * behind one interface lets us replace the backing store with PostgreSQL (or
 * another server-side data source) without rewriting the UI and recommendation
 * layers.
 */
export function getProducts(): Product[] {
  return products;
}

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getVerifiedProducts(): Product[] {
  return products.filter((product) => product.labelVerified === true);
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((product) => product.category === category);
}

export function searchProducts(query: string): Product[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return products;

  return products.filter((product) => {
    const searchable = [
      product.name,
      product.brand,
      product.category,
      product.summary,
      product.bestFor,
      ...product.features,
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(normalized);
  });
}

export function getFilteredProducts(filters: ProductFilters = {}): Product[] {
  const query = filters.query?.trim().toLowerCase();

  return products.filter((product) => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.lifeStage && !product.lifeStages?.includes(filters.lifeStage)) return false;
    if (filters.verifiedOnly && product.labelVerified !== true) return false;

    if (query) {
      const searchable = [
        product.name,
        product.brand,
        product.category,
        product.summary,
        product.bestFor,
        ...product.features,
      ]
        .join(" ")
        .toLowerCase();

      if (!searchable.includes(query)) return false;
    }

    return true;
  });
}

/**
 * Returns products that are eligible for a dog's life stage and optionally
 * requires verified label data. More detailed scoring belongs in the
 * recommendation layer, not the catalog repository.
 */
export function getEligibleProducts(
  lifeStage: LifeStage,
  options: { verifiedOnly?: boolean } = {},
): Product[] {
  return getFilteredProducts({
    lifeStage,
    verifiedOnly: options.verifiedOnly ?? true,
  });
}
