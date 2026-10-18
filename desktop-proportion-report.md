# Desktop proportion repair — 18 October 2026

## Result and scope

Merbaoe remains the opening project, but its screenshot no longer expands across the
entire desktop content width. The approved identity, vanilla stack, original images,
sandbox qualification and existing case-study facts are preserved. Nothing deployed.

Direction: **The well-kept board**, seed **1952153374**. No redraw: the owner likes the
design and requested proportion/spacing repairs, not a different visual identity.
Idea: this studio's real operational screens become the evidence on its project board.
Live thing: manual Cashier / Reports / Shift previews, with a static no-JS fallback.
No stock/generated imagery, new claims, client names, metrics or testimonials added.

## Repairs, highest impact first

1. Merbaoe: 4:7 text/preview layout; native aspect ratio; image height capped at 560px.
   At 1440px the image is 526.8px high and uses 61.6% of the feature width.
   At 1536px it is 550.7px; at 1920px, 549.9px. It stacks on phones.
   Controls, project link and sandbox status are grouped with the title.
2. Shared content width capped at 90rem and homepage headline capped at 5rem.
   Wide screens no longer inflate every component to the browser edges.
3. Services: removed unnecessary minimum row height and nested screenshot inset;
   vertically centered proofs; added 3rem separation between service rows.
4. About: removed viewport-driven principle heights and stretched title/body spacing;
   changed wide screenshot strip to 2:1; corrected archive count to 19 projects.
5. Contact: 1.5rem between field groups; helper text remains attached to its input;
   increased small location note to the shared small-text size.
6. Case template: pale media field for interfaces already classified as light.
   Other project artwork and factual content are unchanged.
7. Refreshed shared asset query versions in all eight HTML entry points.

## Actual audit coverage

- Homepage screenshots: 1440×900, 1536×775, 1920×1080, 768×1024, 390×844.
- Home skill inspector: desktop/tablet/mobile folds and page contact sheets opened.
- About, Services, Contact: desktop/mobile inspector screenshots visually reviewed.
- Work, Services, About, Contact, Privacy, 404: 13 section viewport captures reviewed.
- All 19 project opening covers captured and reviewed in sheets. This is NOT a
  manual reading or screenshot review of every section in all 19 project pages.
- Existing regression checks cover representative project narratives and interactions.
- Browser emulation is Chromium-based, not physical phones or Safari/Firefox.
- 1536px is an additional desktop check, not a claim about the user's actual zoom.

Evidence: `.taste-skill/desktop-proportions/`, `desktop-repair-r2/`,
`desktop-repair-about/`, `desktop-repair-contact/`, `desktop-repair-services-r3/`.

## Checks

- Proportion guard PASS: five widths, image ≤560px, desktop share ≤66%, no overflow;
  13 section captures and 19 case covers. About principles remain content-sized.
- Presentation regression PASS: 65 layout checks, menu/viewer Escape and focus,
  filters, reduced motion and sandbox failed-image loading.
- Merbaoe regression PASS: sandbox facts, five gallery items, keyboard selection,
  rapid selection, no-JS fallback, desktop/mobile project rendering.
- Desktop craft regression PASS: homepage heading checks at 320/390/768/1024/1440/1920,
  centered desktop logo at 1440/1920, wide-route overflow, navigation hover/focus,
  no captured console errors.
- Static checks PASS: eight routes, 19 projects, 164 asset references, 19 galleries,
  eight existing narrative case studies and 24 screen references, Services content,
  and public-link semantics. This is not live verification of every external site.
- Contact: eight mocked validation/provider test groups PASS; no real email sent.
- Lint: 11 selected presentation source files, 0 FAIL / 1 WARN (27 em dashes across
  the files). This was not a claim that every legacy stylesheet passes the style lint.
- `git diff --check`: no whitespace errors; Git reports existing CRLF conversion warnings.

## Inspector findings kept visible

- Homepage: 0 FAIL / 1 WARN (no footage).
- About: 0 FAIL / 3 WARN (repeated card rows, no footage, limited motion).
- Services, third round: 1 FAIL / 3 WARN. The eyebrow detector still associates three
  trailing project captions with the following service headings on mobile. The
  screenshots show those captions inside their preceding project cards, but this
  remains an unresolved inspector result, not a claimed pass. Size-count/card-row
  warnings also remain.
- Contact: 2 FAIL / 2 WARN at capture time: few pictures and still-page; no-footage
  and a small location note. The note was enlarged afterward. The other findings
  remain open. Adding four unrelated pictures and extra form animation would expand
  this spacing repair beyond the requested preservation of the approved design.
- No footage added: no relevant supplied clip, and the manually selected real product
  screenshots are the intended evidence. No decorative replacement footage used.

## Visual rounds

ROUND 1
Seen in one second: operational software, with Merbaoe now beside its explanation.
Idea (one sentence): real operational screens carry the studio's project evidence.
Live thing: Cashier / Reports / Shift selector.
Layout words by section: hero=split / Merbaoe=split / work=paired gallery /
services=editorial rows / Phera=colour band / about=split / footer=close.
Scores: design 7.0 · usability 7.0 · creativity 6.0 · content 5.0 → overall 6.6
Caps applied: generic headline limits creativity; source UI includes QA/missing-photo
tiles, conservatively retaining the placeholder-related content cap.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. `desktop-repair-r1/tablet-fold.jpg`: third preview control wrapped; compact control padding.
2. About baseline: principles stretched through excess vertical space; remove minimum height.
3. Services baseline: proofs undersized inside double inset; use available artwork area.

ROUND 2
Seen in one second: clearer hierarchy without replacing the visual identity.
Idea (one sentence): real operational screens carry the studio's project evidence.
Live thing: Cashier / Reports / Shift selector.
Layout words by section: unchanged; shared desktop content width bounded.
Scores: design 7.5 · usability 8.0 · creativity 6.0 · content 5.0 → overall 7.1 (homepage)
Caps applied: same creativity/content caps. Cross-page inspector failures cap a
whole-site claim at 6.0; the homepage score must not be generalized to all pages.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Services mobile: neighboring service chapters too close; increase chapter separation.
2. Contact desktop: field groups difficult to distinguish; use 1.5rem group spacing.
3. Case covers: harsh black bands behind light interfaces; use pale existing-brand field.

ROUND 3 — Services cross-page closeout
Seen in one second: separate service chapters with readable project examples.
Idea (one sentence): each service is paired with a real delivered interface.
Live thing: project links and native FAQ disclosures; homepage preview remains intact.
Layout words by section: introduction=split / services=paired proof /
engagements=matrix / process=matrix / FAQ=list / close=colour band.
Scores: design 7.0 · usability 7.5 · creativity 6.0 · content 7.0 → overall 6.0 (capped)
Caps applied: unresolved inspector FAIL; do not round this to 7.5 or call it 10/10.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. `desktop-repair-services-r3/mobile-page-01.jpg`: tiny two-up product previews remain
   less useful than desktop; a future one-column service-proof treatment can improve them.
2. Same screenshot/report: caption-to-next-heading detection remains unresolved.
3. `desktop-repair-services-r3/desktop-page-02.jpg`: repeated engagement/process grids
   remain template-like; changing their composition is a further design decision.

Stop at the requested maximum of three visual rounds. Primary oversizing and spacing
repairs are implemented; this report deliberately does not certify every detail as finished.

## Remaining content constraints

Merbaoe's original sandbox images include QA items and unavailable photos. These were
not edited out or misrepresented as operational data. Some archive covers are logos or
login screens rather than strong product views; new authentic screenshots are needed.
Long project names can still occupy three lines in the shared case-cover template.
Phera remains explicitly in development, without invented product screenshots or outcomes.
