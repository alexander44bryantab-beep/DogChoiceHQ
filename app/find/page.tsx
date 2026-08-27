import Link from "next/link";
import FindMatcher from "./FindMatcher";
import { getVerifiedProducts } from "@/lib/product-repository";

export default function FindPage() {
  const verifiedProducts = getVerifiedProducts();

  return (
    <main className="find-page">
      <div className="container find-wrap">
        <Link className="back-link" href="/">← DogChoiceHQ</Link>
        <p className="eyebrow">PERSONALIZED MATCHING</p>
        <h1>Tell us about your dog.</h1>
        <p className="find-intro">We’ll use the profile to prioritize products that fit your dog instead of treating every dog the same.</p>
        <FindMatcher products={verifiedProducts} />
        <p className="disclaimer">DogChoiceHQ recommendations are based on the information available in our verified catalog. They are not veterinary advice and should not replace your veterinarian’s guidance.</p>
      </div>
    </main>
  );
}
