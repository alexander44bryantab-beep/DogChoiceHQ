"use client";

import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { defaultDogProfile, getDogProfileSummary, scoreDogMatch, type DogProfile } from "@/lib/dog-profile";

const stageMap = { puppy: "Puppy", adult: "Adult Maintenance", senior: "All Life Stages" } as const;

export default function FindPage() {
  const [profile, setProfile] = useState<DogProfile>(defaultDogProfile);

  const recommendations = useMemo(() => {
    return products
      .map((product) => {
        const match = scoreDogMatch(profile, {
          bestFor: product.bestFor,
          lifeStages: product.lifeStages?.map((stage) => stage === "Puppy" ? "puppy" : stage === "Adult Maintenance" ? "adult" : "senior"),
          priorities: product.features.map((feature) => feature.toLowerCase()),
        });
        return { product, ...match };
      })
      .sort((a, b) => b.score - a.score);
  }, [profile]);

  const set = <K extends keyof DogProfile>(key: K, value: DogProfile[K]) =>
    setProfile((current) => ({ ...current, [key]: value }));

  return (
    <main className="find-page">
      <div className="container find-wrap">
        <a className="back-link" href="/">← DogChoiceHQ</a>
        <p className="eyebrow">PERSONALIZED MATCHING</p>
        <h1>Tell us about your dog.</h1>
        <p className="find-intro">We’ll use the profile to prioritize products that fit your dog instead of treating every dog the same.</p>

        <section className="profile-panel">
          <div className="field">
            <label>Life stage</label>
            <div className="choice-row">
              {(["puppy", "adult", "senior"] as const).map((value) => (
                <button className={profile.lifeStage === value ? "choice active" : "choice"} key={value} onClick={() => set("lifeStage", value)}>{value[0].toUpperCase() + value.slice(1)}</button>
              ))}
            </div>
          </div>
          <div className="field">
            <label>Size</label>
            <div className="choice-row">
              {(["small", "medium", "large"] as const).map((value) => (
                <button className={profile.size === value ? "choice active" : "choice"} key={value} onClick={() => set("size", value)}>{value[0].toUpperCase() + value.slice(1)}</button>
              ))}
            </div>
          </div>
          <div className="field">
            <label>Activity level</label>
            <div className="choice-row">
              {(["low", "moderate", "high"] as const).map((value) => (
                <button className={profile.activityLevel === value ? "choice active" : "choice"} key={value} onClick={() => set("activityLevel", value)}>{value[0].toUpperCase() + value.slice(1)}</button>
              ))}
            </div>
          </div>
          <div className="field">
            <label htmlFor="weight">Weight (lb)</label>
            <input id="weight" type="number" min="1" max="300" value={profile.weightLb} onChange={(event) => set("weightLb", Number(event.target.value))} />
          </div>
        </section>

        <div className="profile-summary">{getDogProfileSummary(profile)}</div>

        <section className="results">
          <div className="results-head"><div><p className="eyebrow">YOUR STARTING POINT</p><h2>Matched products</h2></div><span>Demo catalog</span></div>
          {recommendations.map(({ product, score, reasons }, index) => (
            <article className="match-card" key={product.id}>
              <div className="rank">#{index + 1}</div>
              <div className="match-main">
                <p className="brand-small">{product.brand}</p>
                <h3>{product.name}</h3>
                <p>{product.bestFor}</p>
                <div className="reason-list">{reasons.map((reason) => <span key={reason.label}>{reason.label}{reason.points ? ` +${reason.points}` : ""}</span>)}</div>
              </div>
              <div className="match-score"><strong>{score}</strong><span>match</span></div>
            </article>
          ))}
        </section>

        <p className="disclaimer">This is a prototype matching experience using sample product records. It is not veterinary advice and should not replace your veterinarian’s guidance.</p>
      </div>
    </main>
  );
}
