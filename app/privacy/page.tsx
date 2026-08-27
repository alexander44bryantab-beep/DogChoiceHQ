import Link from "next/link";

export default function PrivacyPage() {
  return <main className="container product-page"><Link className="back-link" href="/">← DogChoiceHQ</Link><p className="eyebrow">PRIVACY</p><h1 className="compare-title">Privacy at DogChoiceHQ.</h1><p className="hero-copy">This prototype is designed to minimize unnecessary personal information. Dog profile inputs used by the on-page matcher are currently processed in the browser and are not intentionally stored by the prototype.</p><section className="product-details"><h2>Before launch</h2><p>We will publish a complete privacy policy before collecting accounts, analytics identifiers, contact information, or other personal data. Any future data collection will be documented here along with retention and deletion practices.</p></section></main>;
}
