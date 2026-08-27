import Link from "next/link";

export default function AboutPage() {
  return <main className="container product-page"><Link className="back-link" href="/">← DogChoiceHQ</Link><p className="eyebrow">ABOUT DOGCHOICEHQ</p><h1 className="compare-title">Better choices, explained clearly.</h1><p className="hero-copy">DogChoiceHQ is being built as a research and comparison platform for dog products. Our goal is to organize product information, explain meaningful differences, and help shoppers make informed decisions.</p><section className="product-details"><h2>How we approach recommendations</h2><p>We separate verified product information from marketing claims, show how our scoring works, and disclose when information has not yet been verified.</p><p>DogChoiceHQ is not a veterinary service. Product comparisons are educational and should not replace professional veterinary advice.</p></section></main>;
}
