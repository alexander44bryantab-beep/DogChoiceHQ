import type { MetadataRoute } from "next";
import { products } from "../data/products";

const siteUrl = "https://dogchoicehq.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls = products
    .filter((product) => product.labelVerified === true)
    .map((product) => ({
      url: `${siteUrl}/products/${product.id}`,
      ...(product.lastVerified ? { lastModified: new Date(product.lastVerified) } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/catalog`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/find`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.5 },
    ...productUrls,
  ];
}
