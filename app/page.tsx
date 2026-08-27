const categories = [
  { title: "Dog Food", text: "Compare everyday nutrition and find options that fit your dog." },
  { title: "Treats", text: "Find better treats for training, rewards, and everyday moments." },
  { title: "Supplements", text: "Explore popular supplements by purpose and ingredients." },
  { title: "Essentials", text: "Discover useful products for a happier, healthier dog." },
];

export default function Home() {
  return (
    <main>
      <nav className="nav container">
        <a className="brand" href="#">DogChoice<span>HQ</span></a>
        <div className="nav-links">
          <a href="#categories">Categories</a>
          <a href="#how-it-works">How it works</a>
          <a href="#about">About</a>
        </div>
      </nav>

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">SMARTER DOG PRODUCT CHOICES</p>
            <h1>Helping you make the <em>best choices</em> for your best friend.</h1>
            <p className="hero-copy">Compare dog products, understand the differences, and choose with confidence — without sorting through endless options yourself.</p>
            <div className="hero-actions">
              <a className="button primary" href="#categories">Explore products</a>
              <a className="button secondary" href="#how-it-works">How it works →</a>
            </div>
          </div>
          <div className="hero-card" aria-label="DogChoiceHQ comparison preview">
            <div className="dog-mark">🐕</div>
            <p className="card-label">DOGCHOICEHQ</p>
            <h2>Find the right fit.</h2>
            <div className="score"><strong>Top choice</strong><span>★★★★★</span></div>
            <div className="mini-row"><span>Quality</span><b>Excellent</b></div>
            <div className="mini-row"><span>Value</span><b>Great</b></div>
          </div>
        </div>
      </section>

      <section id="categories" className="section container">
        <p className="eyebrow">START EXPLORING</p>
        <h2 className="section-title">What are you shopping for?</h2>
        <div className="category-grid">
          {categories.map((category) => (
            <a className="category-card" href="#" key={category.title}>
              <div className="category-icon">◆</div>
              <h3>{category.title}</h3>
              <p>{category.text}</p>
              <span>Compare options →</span>
            </a>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="how section">
        <div className="container">
          <p className="eyebrow">OUR APPROACH</p>
          <h2 className="section-title">Less guesswork. Better choices.</h2>
          <div className="steps">
            <div><b>01</b><h3>We research</h3><p>We organize product information into useful, easy-to-understand comparisons.</p></div>
            <div><b>02</b><h3>We compare</h3><p>We focus on the details that actually matter when choosing for your dog.</p></div>
            <div><b>03</b><h3>You choose</h3><p>You get a clear starting point so you can make the final call with confidence.</p></div>
          </div>
        </div>
      </section>

      <footer id="about" className="footer">
        <div className="container footer-inner">
          <div><a className="brand" href="#">DogChoice<span>HQ</span></a><p>Helping you make the best choices for your best friend.</p></div>
          <p>© 2026 DogChoiceHQ. Product information should be independently verified.</p>
        </div>
      </footer>
    </main>
  );
}
