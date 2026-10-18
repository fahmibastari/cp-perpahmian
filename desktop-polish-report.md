# Desktop craft pass — 17 October 2026

Scope: refine the existing vanilla HTML/CSS/JavaScript portfolio, preserving brand assets and factual project records. No deployment or contact submission.

Direction context: The well-kept board, seed 1952153374. No redraw: this is a component refinement following the user's approved audit, with brand-led editorial spacing taking precedence over the earlier dense tile treatment. References already reviewed: Lovably (shared alignment anchors) and Oimachi (consistent project presentation). No borrowed imagery or copy.

Idea: the studio's field-to-office software and web/mobile pairs become a readable, browsable record of engineering work. The live element remains the three-project selector, backed by real screenshots and case-study links.

ROUND 1
Seen in one second: the operations headline, supported by the real SiCater interface.
Idea (one sentence): real software is the evidence, with a restrained frame around it.
Live thing: Magic Pin / SiCater / UBM project selector.
Layout words by section: hero=editorial split / showcase=interactive stage / work=archive / capabilities=rows / experiments=colour field / studio=note / footer=closing statement.
Scores: design 7 · usability 8 · creativity 6 · content 8 → overall 7.2, capped at 6.5.
Caps applied: visible decorative hairlines remain from old motion styles; the general concept is not unique enough to score highly for creativity.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. desktop-page-01.jpg: scroll scaling shrinks the showcase media away from its adjacent copy; remove scaling on the outer frame and keep motion inside it.
2. desktop-page-02.jpg and mobile-page-01.jpg: legacy rules add green dividers, pointer corner marks, and excessive footer metadata margin. Remove the decoration at its source and reset footer spacing.
3. mobile-page-01.jpg: too many near-identical font sizes; unify captions, links, controls and headings around the shared roles, and use one square media treatment.

Initial skill lint: 43 FAIL, 8 WARN in the eight inspected home/shared source files. Most mono findings use an old token whose value is already Manrope; rename those references instead of suppressing the check. Initial post-edit browser inspector: 0 FAIL, 2 WARN (no footage, mobile size count).

No footage is added: the supplied project screenshots are direct evidence; unrelated stock footage would weaken that connection. No new client, testimonial, metric, outcome, photo, or sample content is introduced.

ROUND 2
Seen in one second: typography and the SiCater screen, with a genuinely centred masthead.
Idea (one sentence): let real engineering work carry the portfolio, without competing decorative frames.
Live thing: the original three-project selector, with loading and error handling preserved.
Layout words by section: hero=editorial split / showcase=interactive stage / work=archive / capabilities=rows / experiments=colour field / studio=note / footer=closing statement.
Scores: design 7.5 · usability 7 · creativity 6 · content 8 → overall 7.2, capped at 5 for clipped content in the regression screenshots.
Caps applied: narrow-screen capability titles moved outside their container because of legacy horizontal animation; creativity remains category-level.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. polish-round2/mobile-page-01.jpg: service titles travel beyond the left gutter. Change their entrance to small vertical movement so text stays inside its column.
2. repair-browser/about-html-1440-page.jpg: the principle heading inherits a two-column subgrid inside a narrow column. Give that heading and description a single-column layout.
3. desktop-craft/project-html-id-magicpin-1920.jpg and services-html-1920.jpg: case copy retains an old bottom margin; service proof captions have excessive independent padding. Reset those local rules and remove decorative alphabet badges.

The source lint now reports 0 FAIL. Existing project-copy warnings are retained rather than rewriting factual records during this presentation pass. One offscreen anti-spam field has an explicit lint exception for its 1px height; it is not a visible decorative line.

ROUND 3 — final review
Seen in one second: a clear two-line operations headline, real product evidence, and a centred logo with quiet navigation.
Idea (one sentence): make the portfolio feel like a carefully maintained record of work rather than a collection of competing tiles.
Live thing: the original project selector, supported by working filters and keyboard-operable image galleries.
Layout words by section: hero=editorial split / showcase=interactive stage / work=archive / capabilities=rows / experiments=colour field / studio=note / footer=closing statement.
Scores (subjective self-assessment): design 7.5 · usability 8.5 · creativity 6 · content 8. Overall approximately 7.6/10; not a claim of independent evaluation or a perfect result.
Caps applied: creativity remains capped at 6 because the split-hero/archive concept is familiar. No inspector failures or clipped-layout regression failures remain in the tested views.
Top three remaining refinements, with screenshot evidence and possible future fixes:
1. desktop-craft/about-principles-1440.jpg: principle rows retain horizontal entrance movement, so their edges can look staggered during the animation. A future motion pass could use vertical-only entrances consistently.
2. polish-round3/mobile-fold.jpg: a complete desktop interface is necessarily small on a phone. Preserve the original evidence, but consider a separately authored detail crop alongside the full image if finer interface reading is important.
3. polish-final-wide/desktop-fold.jpg: the split hero is coherent but not particularly distinctive. A future content-led concept pass could strengthen the opening through a specific, verified engineering decision instead of adding decoration or unsupported outcomes.

Stopped after the requested maximum of three visual rounds. All seven final desktop/tablet/mobile inspector screenshots and all three wide-desktop inspector screenshots were opened and reviewed, along with targeted navigation, footer, services, About and case-study screenshots.

## Final verification

- Skill source lint: 21 production files, 0 FAIL and 4 WARN. Three warnings concern existing project-copy phrases; one concerns aggregate em-dash usage. Factual project records were not rewritten to silence these warnings.
- Skill browser inspector: 1440, 768 and 390px, plus a separate 1920px run; both reports have 0 FAIL and 1 WARN for no footage. Existing screenshot evidence is intentionally retained instead of unrelated video.
- `tests/presentation-check.mjs`: 60 layout checks, 0 failing checks, covering eight routes at desktop/tablet/mobile and all 18 project titles at narrow/desktop widths. Interaction checks also cover project selection, filters, menu Escape/focus return, gallery navigation/Escape/focus return, and reduced motion.
- `tests/desktop-craft-check.mjs`: home at 320, 390, 768, 1024, 1440 and 1920px, plus five additional routes at 1920px. No horizontal overflow; home headline remains at most two lines. Desktop logo centre error is 0.0px at 1440 and 1920; navigation Contact and hero CTA are both 52px high. Focus and hover screenshots were also checked.
- Static site, services, case-study and editorial checks pass. Contact tests pass using mocks, including provider rejection, timeout and rate-limit cases. No real enquiry was sent.
- JavaScript syntax checks and `git diff --check` pass. Browser checks captured no console errors.

## Scope and limitations

The redesign and design-taste skills guided shared alignment, square component treatment, restrained motion and screenshot-based iteration. Vanilla HTML/CSS/JavaScript, the green/black/white identity, logo, project assets and factual case-study records remain in place.

This is a targeted presentation repair, not a complete CSS architecture rewrite: legacy layers and specificity overrides remain. Automated browser checks use Chromium and emulated viewport sizes, not physical devices or Safari/Firefox. The site was not deployed, and production email delivery was not tested.

Evidence folders: `.taste-skill/polish-round3/`, `.taste-skill/polish-final-wide/`, `.taste-skill/desktop-craft/` and `.taste-skill/repair-browser/`.
