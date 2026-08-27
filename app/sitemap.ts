import type { MetadataRoute } from "next";
import { products } from "../data/products";

const siteUrl = "https://dogchoicehq.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls = products
    .filter((product) => product.verificationStatus !== "demo")
    .map((product) => ({
      url: `${siteUrl}/products/${product.id}`,
      lastModified: product.lastVerified ? new Date(product.lastVerified) : new Date(),
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
