# Launch-quality visual rebuild

## What will change

### Live demo
- Rebuild the demo as a restrained software window with monochrome controls, a compact address/title bar, crisp borders, and 4–6px corners.
- Use a true two-panel layout: a live call transcript on the left and a three-column CRM pipeline on the right.
- Animate the resolved lead from the transcript side into the New column, then show its qualification state without making the interface feel playful.
- Keep pause, play, replay, automatic looping, and reduced-motion support.
- Stack the panels cleanly on small screens while keeping all three pipeline columns usable.

### Problem section
- Replace the card grid with an editorial split composition.
- Keep the headline and supporting copy sticky on desktop; present five numbered rows on the right.
- Give each row an accessible expandable description, subtle hover/focus motion, and a vertical progress rule that fills as the list enters the viewport.
- Collapse to a natural single-column flow on mobile with no sticky or overlapping content.

### Services interaction
- Restyle 01–06 as large, bold, outlined JetBrains Mono drafting numbers.
- Add a shared moving selection indicator rather than six independently toggled bars.
- Redraw each service diagram whenever the selection changes and introduce a restrained active-panel texture/color wash.
- Preserve keyboard-accessible tabs and the existing service content.

### Site-wide launch polish
- Remove obsolete drifting/floating decorative styles and audit visible sections for flat fills, crisp corners, and consistent spacing.
- Keep subtle gradients only where they function as low-opacity background texture or masking—not as button/UI fills.
- Confirm every content page has unique Zocalo metadata and ensure the existing Zocalo favicon is correctly linked.

## Validation
- Check the homepage, Services, What We Build, and Contact pages in the running site.
- Verify the new homepage sections and Services interaction at desktop and mobile widths.
- Check interaction states, reduced-motion behavior, console errors, and production readiness.

## Technical details
- Use the existing React, Framer Motion, semantic color tokens, and JetBrains Mono setup.
- Keep the work entirely in presentation code; no data or account changes are required.
