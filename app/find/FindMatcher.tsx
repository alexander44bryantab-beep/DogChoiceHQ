"use client";

import { useMemo, useState } from "react";
import { defaultDogProfile, getDogProfileSummary, scoreDogMatch, type DogProfile } from "@/lib/dog-profile";
import type { Product } from "@/data/products";

type Props = { products: Product[] };

export default function FindMatcher({ products }: Props) {
  const [profile, setProfile] = useState<DogProfile>(defaultDogProfile);

  const recommendations = useMemo(() => products.map((product) => {
    const match = scoreDogMatch(profile, {
      bestFor: product.bestFor,
      lifeStages: product.lifeStages?.map((stage) => stage === "Puppy" ? "puppy" : stage === "Adult Maintenance" ? "adult" : "senior"),
      priorities: product.features.map((feature) => feature.toLowerCase()),
    });
    return { product, ...match };
  }).sort((a, b) => b.score - a.score), [profile, products]);

  const set = <K extends keyof DogProfile>(key: K, value: DogProfile[K]) => setProfile((current) => ({ ...current, [key]: value }));

  return (
    <>
      <section className="profile-panel">
        <div className="field"><label>Life stage</label><div className="choice-row">{(["puppy", "adult", "senior"] as const).map((value) => <button type="button" className={profile.lifeStage === value ? "choice active" : "choice"} key={value} onClick={() => set("lifeStage", value)}>{value[0].toUpperCase() + value.slice(1)}</button>)}</div></div>
        <div className="field"><label>Size</label><div className="choice-row">{(["small", "medium", "large"] as const).map((value) => <button type="button" className={profile.size === value ? "choice active" : "choice"} key={value} onClick={() => set("size", value)}>{value[0].toUpperCase() + value.slice(1)}</button>)}</div></div>
        <div className="field"><label>Activity level</label><div className="choice-row">{(["low", "moderate", "high"] as const).map((value) => <button type="button" className={profile.activityLevel === value ? "choice active" : "choice"} key={value} onClick={() => set("activityLevel", value)}>{value[0].toUpperCase() + value.slice(1)}</button>)}</div></div>
        <div className="field"><label htmlFor="weight">Weight (lb)</label><input id="weight" type="number" min="1" max="300" value={profile.weightLb} onChange={(event) => set("weightLb", Number(event.target.value))} /></div>
      </section>
      <div className="profile-summary">{getDogProfileSummary(profile)}</div>
      <section className="results"><div className="results-head"><div><p className="eyebrow">YOUR STARTING POINT</p><h2>Matched products</h2></div><span>{products.length ? "Verified catalog" : "No verified products yet"}</span></div>
        {recommendations.length ? recommendations.map(({ product, score, reasons }, index) => <article className="match-card" key={product.id}><div className="rank">#{index + 1}</div><div className="match-main"><p className="brand-small">{product.brand}</p><h3>{product.name}</h3><p>{product.bestFor}</p><div className="reason-list">{reasons.map((reason) => <span key={reason.label}>{reason.label}{reason.points ? ` +${reason.points}` : ""}</span>)}</div></div><div className="match-score"><strong>{score}</strong><span>match</span></div></article>) : <p className="empty-state">We don't have verified products that can be responsibly matched yet. Check back as the catalog grows.</p>}
      </section>
    </>
  );
}
