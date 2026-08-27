"use client";

import type { Product } from "@/data/products";
import { getIngestionReview, type IngestionReview } from "@/data/catalog-ingestion";

export default function VerificationReviewTable({ products }: { products: Product[] }) {
  const reviews: IngestionReview[] = products.map(getIngestionReview);

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-3 font-semibold">Product</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Evidence</th>
            <th className="px-4 py-3 font-semibold">Missing</th>
            <th className="px-4 py-3 font-semibold">Recommendation</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {reviews.map((review) => (
            <tr key={review.productId} className="align-top">
              <td className="px-4 py-4">
                <div className="font-semibold text-slate-900">{review.productName}</div>
                <div className="text-slate-500">{review.brand}</div>
              </td>
              <td className="px-4 py-4">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                  {review.status}
                </span>
              </td>
              <td className="px-4 py-4 font-medium text-slate-800">
                {review.passedChecks}/{review.totalChecks} ({review.completionPercent}%)
              </td>
              <td className="max-w-sm px-4 py-4 text-slate-600">
                {review.missingChecks.length ? review.missingChecks.join(", ") : "None"}
              </td>
              <td className="px-4 py-4">
                <span className={review.recommendationReady ? "font-semibold text-emerald-700" : "font-semibold text-amber-700"}>
                  {review.recommendationReady ? "Ready" : "Needs review"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
