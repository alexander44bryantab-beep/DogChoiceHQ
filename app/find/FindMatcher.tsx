"use client";

import { useMemo, useState } from "react";
import { defaultDogProfile, getDogProfileSummary, scoreDogMatch, type DogProfile } from "@/lib/dog-profile";
import { scoreProduct } from "@/lib/recommendations";
import type { Product } from "@/data/products";

type Props = { products: Product[] };

type MatcherProduct = {
  bestFor: string;
  lifeStages?: ("puppy" | "adult" | "senior")[];
  priorities: string[];
};

function toMatcherProduct(product: Product): MatcherProduct {
  return {
    bestFor: product.bestFor,
    lifeStages: product.lifeStages?.flatMap((stage) => {
      if (stage === "Puppy") return ["puppy"] as const;
      if (stage === "Adult Maintenance") return ["adult"] as const;
      return ["puppy", "adult", "senior"] as const;
    }),
    priorities: product.features.map((feature) => feature.toLowerCase()),
  };
}

function isEligibleForLifeStage(product: Product, lifeStage: DogProfile["lifeStage"]) {
  if (!product.lifeStages?.length) return false;
  if (product.lifeStages.includes("All Life Stages")) return true;

  const stageMap: Record<DogProfile["lifeStage"], Product["lifeStages"][number]> = {
    puppy: "Puppy",
    adult: "Adult Maintenance",
    senior: "Adult Maintenance",
  };

  return product.lifeStages.includes(stageMap[lifeStage]);
}

export default function FindMatcher({ products }: Props) {
  const [profile, setProfile] = useState<DogProfile>(defaultDogProfile);

  const recommendations = useMemo(() => {
    const eligibleProducts = products.filter((product) =>
      isEligibleForLifeStage(product, profile.lifeStage),
    );

    return eligibleProducts
      .map((product) => {
        const match = scoreDogMatch(profile, toMatcherProduct(product));
        const evidence = scoreProduct(product, eligibleProducts);

        // Dog fit is the primary signal; evidence quality is a secondary guardrail.
        const score = Math.round(match.score * 0.7 + evidence.score * 0.3);

        return {
          product,
          score,
          reasons: [
            ...match.reasons,
            { label: "Evidence quality", points: Math.round(evidence.score * 0.3) },
          ],
        };
      })
      .sort((a, b) => b.score - a.score);
  }, [profile, products]);

  const set = <K extends keyof DogProfile>(key: K, value: DogProfile[K]) =>
    setProfile((current) => ({ ...current, [key]: value }));

  return (
    <>
      <section className="profile-panel">
        <div className="field">
          <label>Life stage</label>
          <div className="choice-row">
            {["puppy", "adult", "senior"].map((value) => (
              <button
                type="button"
                className={profile.lifeStage === value ? "choice active" : "choice"}
                key={value}
                onClick={() => set("lifeStage", value as DogProfile["lifeStage"])}
              >
                {value[0].toUpperCase() + value.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Size</label>
          <div className="choice-row">
            {["small", "medium", "large"].map((value) => (
              <button
                type="button"
                className={profile.size === value ? "choice active" : "choice"}
                key={value}
                onClick={() => set("size", value as DogProfile["size"])}
              >
                {value[0].toUpperCase() + value.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Activity level</label>
          <div className="choice-row">
            {["low", "moderate", "high"].map((value) => (
              <button
                type="button"
                className={profile.activityLevel === value ? "choice active" : "choice"}
                key={value}
                onClick={() => set("activityLevel", value as DogProfile["activityLevel"])}
              >
                {value[0].toUpperCase() + value.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label htmlFor="weight">Weight (lb)</label>
          <input
            id="weight"
            type="number"
            min="1"
            max="300"
            value={profile.weightLb}
            onChange={(event) => set("weightLb", Number(event.target.value))}
          />
        </div>
      </section>

      <div className="profile-summary">{getDogProfileSummary(profile)}</div>

      <section className="results">
        <div className="results-head">
          <div>
            <p className="eyebrow">YOUR STARTING POINT</p>
            <h2>Matched products</h2>
          </div>
          <span>{products.length ? "Verified catalog" : "No verified products yet"}</span>
        </div>

        {recommendations.length ? (
          recommendations.map(({ product, score, reasons }, index) => (
            <article className="match-card" key={product.id}>
              <div className="rank">#{index + 1}</div>
              <div className="match-main">
                <p className="brand-small">{product.brand}</p>
                <h3>{product.name}</h3>
                <p>{product.bestFor}</p>
                <div className="reason-list">
                  {reasons.map((reason) => (
                    <span key={`${reason.label}-${reason.points}`}>
                      {reason.label}{reason.points ? ` +${reason.points}` : ""}
                    </span>
                  ))}
                </div>
              </div>
              <div className="match-score">
                <strong>{score}</strong>
                <span>match</span>
              </div>
            </article>
          ))
        ) : (
          <p className="empty-state">
            {products.length
              ? "We don't have a verified product that fits this life stage yet. Try another profile or check back as the catalog grows."
              : "We don't have verified products that can be responsibly matched yet. Check back as the catalog grows."}
          </p>
        )}
      </section>
    </>
  );
}
