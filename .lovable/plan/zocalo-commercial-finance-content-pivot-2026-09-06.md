# Zocalo Commercial Finance Content Pivot

## Goal
Reposition the entire public site from bespoke software engineering to boutique commercial loan brokerage while preserving the current layouts, color system, interactions, animation timing, card treatments, and button styling.

## Content changes
- Update the shared header wordmark treatment with a small “Commercial Finance” descriptor, simplify navigation to Loan Products, How It Works, and Why Zocalo, and change the main action to “Get Funded.”
- Replace homepage hero, trust statement, credibility figures, financing problem cards, routing demo copy/data, and final call to action with formal commercial-finance messaging.
- Refill the existing six-item master-detail selector with MCA, business line of credit, equipment financing, SBA loans, invoice/AR factoring, and short-term loans. Each retains the current diagram slot, checklist, and timeline pattern.
- Turn the existing process presentation into the four-step lender-matching journey: apply once, match across the lender panel, automatically route after a decline, and receive funds.
- Reframe Why Zocalo around lender access, product fit, speed, and transparent rate explanations.
- Rewrite the contact/application page copy and form prompts around funding qualification without changing its visual structure or submission behavior.
- Replace footer language and every remaining public-facing software, CRM, engineering, bespoke, and AI reference, including accessible labels where relevant.

## Page and route handling
- Add canonical `/loan-products` and `/how-it-works` pages using the current Services and process visual structures.
- Keep the old `/services`, `/what-we-build`, and `/process` URLs as redirects so existing links do not break, while removing them from navigation.
- Keep `/why-zocalo`, `/contact`, and `/` in place.

## Demo behavior
- Preserve the existing two-panel window, controls, timing, looping, reduced-motion behavior, and visual styling.
- Replace the call transcript with a realistic submitted application summary on the left.
- Replace the CRM pipeline with a lender waterfall on the right, progressing through checked, declined, reviewing, and approved states.

## Launch copy and metadata
- Give every content page a unique finance-specific title, description, Open Graph title/description, `og:type`, and Twitter card.
- Update root fallback metadata and keep the existing Zocalo favicon/logo assets unchanged.
- Perform a final repository scan to ensure no obsolete industry language remains in rendered copy or metadata.

## Validation
- Run the project’s automated checks after edits.
- Verify the homepage, Loan Products, How It Works, Why Zocalo, and application page in the browser at desktop and mobile widths, including selector interactions and the full lender-routing animation.

## Assumption
“Commercial Finance” will be used as the wordmark descriptor because it is clearer and more specific than “Capital”; “Get Funded” will be used in the compact header button, while the longer final action will read “Start Your Application.”
