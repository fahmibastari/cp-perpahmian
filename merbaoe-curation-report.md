# Merbaoe-first curation and layout repair

18 October 2026. Local implementation only; no deployment or real enquiry sent.

## Direction and boundaries

Used redesign-existing-projects, then design-taste-frontend. Retained **The well-kept
board**, seed **1952153374**, with no redraw: the user likes the established design
and requested curation, layout and spacing improvements, not another visual identity.
The logo, Manrope, green/ink/white palette, original assets and vanilla stack remain.

Idea: show real working interfaces as the proof of an operational-software practice,
with one clear lead project and a compact supporting selection.
Live thing: the manual Merbaoe Cashier / Reports / Shift screenshot selector. It is
not a live application or a claim that the displayed data is operational.

## What changed

- Merbaoe replaces SiCater as the homepage lead. Its sandbox status is visible above
  the first screenshot and in the caption. A dedicated project walkthrough includes
  five original screenshots: cashier, recipes/costs, inventory, profit and cash shift.
- Selected work follows with Magic Pin, Flamboys, 2Watuju, JustSpeak, DIGIVASS and
  SpekHP. SiCater and UBM remain accessible in Work; nothing was deleted.
- Magic Pin uses the map, Flamboys the roasting curve, 2Watuju the architecture
  catalogue, JustSpeak the public landing screen, DIGIVASS the administration overview,
  and SpekHP the public discovery screen. JustSpeak explicitly retains back-end credit.
- Removed nested insets from single-screen artwork; selected cards share a 2:1 stage,
  contain the original image and have consistent caption and row spacing.
- Reorganized the hero's heading, supporting copy and action around shared columns.
  Screen-selection controls sit above the image, so changing a view does not require
  returning from controls underneath a tall screenshot. No autoplay.
- Fixed a service heading's inherited two-row grid span; related service text and
  evidence links now stay together. Reduced the Phera band's unnecessary height.
- Tightened heading-to-body spacing in case narratives. Merbaoe uses its native image
  ratio instead of black letterboxing and a balanced two-column facts layout.
- About principles retain a short vertical entrance rather than drifting sideways.
- Phera has a clearly labelled independent-product section, **In development**.
  No fictional interface, stack, release date, client or outcome was added.
- Shared asset URLs are versioned `20261018-merbaoe1` to avoid stale browser caches.

## Factual safeguards

The user confirmed Merbaoe captures come from a sandbox account, not the operating
account. The original QA entries, figures and missing-product-photo tiles are preserved;
they are not presented as customers, revenue, usage metrics or business outcomes.
Role, timeline, stack and production status remain unconfirmed and are omitted.
2026 is labelled as the screenshot capture year, not a claimed creation date; the
Merbaoe structured data does not assert a creation date. Existing eight detailed
case studies and their factual contributions are preserved.

No external imagery was downloaded or generated. All displayed project imagery and
the logo come from the supplied repository. No stock media, invented testimonials,
sample client names or fabricated numbers were introduced. The prior audit's public
research about the coffee shop is background only, not software-delivery proof.

## Visual critique

Three design rounds. Each round's desktop, tablet and mobile fold and page sheets
were opened and inspected. The last round included corrective verification reruns,
not a new design direction. Scores below are subjective visual critique, not test results.

### ROUND 1

Seen in one second: operational-software heading and a large cashier interface.
Idea (one sentence): let Merbaoe lead with product evidence, followed by complementary work.
Live thing: three manually selectable sandbox views.
Layout words by section: hero=split-and-image / work=paired gallery / services=rows /
Phera=announcement / studio=statement / footer=action.
Scores: design 7.0 · usability 7.5 · creativity 6.0 · content 5.0 → overall 6.9.
Caps applied: creativity 6, since the broad studio headline is not uniquely ownable;
content 5 under the skill's conservative visible-placeholder cap, because the supplied
sandbox itself contains missing-photo QA tiles. Those are authentic evidence, not
portfolio-authored mockups, and must not be falsified to improve the score.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. `merbaoe-round1/desktop-fold.jpg`: sandbox context appeared only below the tall image.
   Added explicit sandbox wording beside the project title.
2. `merbaoe-round1/mobile-page-01.jpg`: services had excessive internal gaps.
   Reset the inherited heading row span and tightened mobile row gaps.
3. `merbaoe-round1/desktop-page-02.jpg`: Phera occupied too much space for a short
   development announcement. Reduced padding and removed repetitive defensive copy.

### ROUND 2

Seen in one second: the studio proposition, then Kopi Merbaoe and its cashier screen.
Idea (one sentence): a clear lead workspace and a supporting gallery of different capabilities.
Live thing: sandbox screen selection with loading and failure feedback.
Layout words by section: hero=split-and-image / work=paired gallery / services=rows /
Phera=announcement / studio=statement / footer=action.
Scores: design 7.7 · usability 8.0 · creativity 6.0 · content 5.0 → overall 7.2.
Caps applied: same creativity and original-sandbox-placeholder caps as round 1.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. `merbaoe-round2/desktop-page-01.jpg`: selector controls were below a tall image.
   Moved them to the project heading and made the project title a visible link.
2. `merbaoe-details/case-1440-story.jpg` (pre-repair capture): narrative headings and
   body copy were separated by forced empty space. Removed the forced minimum height
   and space-between positioning from narrative cards.
3. `merbaoe-details/case-1440-fold.jpg` (pre-repair capture): black image bars and an
   orphan facts tile distracted from the new project. Used its native image ratio
   and a two-column fact layout. These paths were refreshed after verification.

### ROUND 3

Seen in one second: a confident software proposition above a recognizable coffee POS.
Idea (one sentence): inspect the product screens before reading the claims.
Live thing: an accessible, non-autoplay Cashier / Reports / Shift selector, with a
static image/link fallback, latest-request protection and a recoverable error state.
Layout words by section: hero=split-and-image / work=paired gallery / services=rows /
Phera=announcement / studio=statement / footer=action.
Scores: design 7.8 · usability 8.2 · creativity 6.0 · content 5.0 → overall 7.3.
Caps applied: same conservative caps. Final score is **below 7.5, not 10/10**.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. `merbaoe-round3/desktop-fold.jpg`: the cashier capture still contains QA entries
   and missing-photo tiles. Kept the supplied evidence intact with clear sandbox copy;
   a cleaner genuine capture would require a separately supplied asset.
2. `merbaoe-round3/mobile-fold.jpg`: a complete desktop POS is an overview, not readable
   field-level content at phone width. Preserved the full screen and route to the
   project's enlargeable gallery; did not invent a mobile application.
3. `merbaoe-round3/desktop-page-02.jpg`: Phera and founder information still use related
   split compositions, and the headline is category-level. Kept this restrained layout
   rather than adding unsupported Phera imagery or expanding the approved redesign scope.

All fourteen passes were considered: focal point; mass hierarchy; distinctiveness;
shared edges; proximity; type; palette; original imagery; section variety; phone layout;
fullness; content; collisions; and live interaction. Remaining softness is mostly in
asset presentation and distinctiveness, not detected clipping or broken controls.

## Verification

- Skill lint on 12 presentation sources: **0 FAIL, 1 WARN**. The warning counts 28
  em dashes across multiple files, including existing titles/metadata and dynamic copy;
  it is not 28 in one visible page. Existing factual copy was not globally rewritten.
- Final skill inspector at **1440, 768, 390px**: **0 FAIL, 1 WARN**. The warning is
  no video: no authentic product clip was supplied, and unrelated stock footage would
  weaken evidence. Original images, interaction feedback and reduced-motion-aware
  entrances provide movement without pretending a screenshot is a live app.
- Final homepage: 17 headings, at most two lines; 8 images; about 5.2 desktop screens.
  Both the fold and all generated page sheets were visually reviewed at every width.
- Presentation regression: **65 layout checks, 0 failures** across representative
  routes at 1440/768/390 and every project at 320/1440. Also checked selector failure,
  menu Escape/focus restoration, filters, gallery navigation/Escape/focus and live
  reduced-motion changes. This is targeted accessibility testing, not a WCAG certification.
- Desktop craft regression: homepage at **320, 390, 768, 1024, 1440, 1920px**; heading
  wrapping, control size, header alignment, wide-route overflow and nav hover/focus pass.
- Merbaoe-specific regression: factual omissions, five galleries, Phera status,
  keyboard activation, rapid selection, no-JS image/link fallback and desktop/mobile case.
- Static checks: 8 HTML routes, 19 projects, 164 asset references; 8 detailed case studies
  with 24 screen references; 19 galleries; 6 filter totals; services structure; JS syntax.
- Contact tests: 8 mocked groups pass; **no real emails sent**.

Diagnostics and screenshots are under `.taste-skill/merbaoe-round1`, `merbaoe-round2`,
`merbaoe-round3`, `merbaoe-regression`, `merbaoe-details`, and `desktop-craft`.
No files were deleted, no dependency was added, and no deployment was performed.
