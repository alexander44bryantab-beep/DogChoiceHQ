# DogChoiceHQ

**Helping you make the best choices for your best friend.**

DogChoiceHQ is a Next.js comparison platform for dog products. The project is being built around transparent product research, dog-specific matching, and affiliate-ready product pages.

## Current features

- Next.js App Router + TypeScript
- Responsive DogChoiceHQ homepage
- Product data model with nutrition/label fields
- Evidence-first recommendation scoring
- Dog profile matching experience at `/find`
- Ranked comparison experience at `/compare`
- Dynamic product pages at `/products/[id]`
- About, privacy, and disclaimer pages
- Robots metadata route
- GitHub Actions typecheck + production build checks

## Development

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

## Data policy for launch

The current catalog contains **sample records only** and must not be presented as real product recommendations. Before launch, products should be populated from verified manufacturer/retailer information and given source URLs and verification dates.

For pet food, DogChoiceHQ should pay particular attention to the nutritional adequacy statement, life stage, guaranteed analysis, ingredients, calories, and relevant labeling information. FDA explains that a “complete and balanced” statement is tied to an applicable nutrient profile or an appropriate feeding-trial method, and that guaranteed analysis is expressed on an as-fed basis. See the FDA pet-food guidance before publishing product claims.

## Production roadmap

1. Replace sample products with verified real products.
2. Build category-specific scoring rules for food, treats, supplements, and essentials.
3. Add product images and structured SEO metadata.
4. Add retailer/affiliate integrations and clear disclosures.
5. Add analytics only after the privacy policy and consent approach are finalized.
6. Connect a production database/CMS when the catalog outgrows static TypeScript data.
7. Deploy the production build and configure the real domain.

DogChoiceHQ recommendations are educational and are not veterinary advice.
