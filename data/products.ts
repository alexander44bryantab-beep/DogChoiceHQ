export type Product = {
  id: string;
  name: string;
  brand: string;
  category: "Dog Food" | "Treats" | "Supplements" | "Essentials";
  price: number;
  rating: number;
  badge?: string;
  summary: string;
  bestFor: string;
  features: string[];
  affiliateUrl: string;
};

export const products: Product[] = [
  {
    id: "acme-balanced-chicken",
    name: "Balanced Chicken Recipe",
    brand: "DogChoice Sample Brand",
    category: "Dog Food",
    price: 34.99,
    rating: 4.8,
    badge: "Best Overall",
    summary: "A sample complete-and-balanced style food used to demonstrate the DogChoiceHQ comparison system.",
    bestFor: "Everyday adult dogs",
    features: ["Chicken-based recipe", "Complete meal format", "Strong value score"],
    affiliateUrl: "#",
  },
  {
    id: "acme-sensitive-salmon",
    name: "Sensitive Salmon Recipe",
    brand: "DogChoice Sample Brand",
    category: "Dog Food",
    price: 42.99,
    rating: 4.6,
    badge: "Sensitive Choice",
    summary: "A sample salmon-focused recipe for demonstrating specialized product comparisons.",
    bestFor: "Dogs needing a different protein option",
    features: ["Salmon-based recipe", "Alternative protein", "Premium positioning"],
    affiliateUrl: "#",
  },
  {
    id: "acme-budget-bites",
    name: "Everyday Value Bites",
    brand: "DogChoice Sample Brand",
    category: "Dog Food",
    price: 24.99,
    rating: 4.3,
    badge: "Best Value",
    summary: "A sample budget-friendly option showing how price and quality can be compared together.",
    bestFor: "Budget-conscious shoppers",
    features: ["Lower price", "Everyday format", "Value focused"],
    affiliateUrl: "#",
  },
];

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}
