export type DogLifeStage = "puppy" | "adult" | "senior";
export type DogSize = "small" | "medium" | "large";
export type ActivityLevel = "low" | "moderate" | "high";

export type DogProfile = {
  lifeStage: DogLifeStage;
  size: DogSize;
  activityLevel: ActivityLevel;
  weightLb: number;
  priorities: string[];
};

export type MatchReason = {
  label: string;
  points: number;
};

export const defaultDogProfile: DogProfile = {
  lifeStage: "adult",
  size: "medium",
  activityLevel: "moderate",
  weightLb: 50,
  priorities: [],
};

export function getDogProfileSummary(profile: DogProfile) {
  const stage = profile.lifeStage[0].toUpperCase() + profile.lifeStage.slice(1);
  const activity = profile.activityLevel[0].toUpperCase() + profile.activityLevel.slice(1);
  return `${stage} • ${profile.weightLb} lb • ${activity} activity`;
}

export function scoreDogMatch(profile: DogProfile, product: {
  bestFor: string;
  lifeStages?: DogLifeStage[];
  sizes?: DogSize[];
  activityLevels?: ActivityLevel[];
  priorities?: string[];
}) {
  let score = 0;
  const reasons: MatchReason[] = [];

  if (product.lifeStages?.includes(profile.lifeStage)) {
    score += 30;
    reasons.push({ label: "Life-stage match", points: 30 });
  }

  if (product.sizes?.includes(profile.size)) {
    score += 15;
    reasons.push({ label: "Size match", points: 15 });
  }

  if (product.activityLevels?.includes(profile.activityLevel)) {
    score += 15;
    reasons.push({ label: "Activity match", points: 15 });
  }

  const matchedPriorities = profile.priorities.filter((priority) =>
    product.priorities?.includes(priority),
  );

  if (matchedPriorities.length) {
    const points = Math.min(matchedPriorities.length * 10, 30);
    score += points;
    reasons.push({ label: `${matchedPriorities.length} priority match${matchedPriorities.length > 1 ? "es" : ""}`, points });
  }

  if (score === 0) {
    reasons.push({ label: "General catalog match", points: 0 });
  }

  return { score, reasons };
}
