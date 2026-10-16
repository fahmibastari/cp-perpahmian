# perpahmian.tech — brand-led engineering studio

## Direction
Work-led, geometric, calm. The supplied modular logo guides the visual identity.
The Instrument reference informs composition and motion, not the typography.
Preserve the logo and exact user-supplied white, #111111, and #8BCF6A brand colours.

## Shared system
- Portfolio Grid for home/work; editorial service rows; long-form case studies.
- Compact centred-logo masthead with visible desktop links and accessible mobile menu.
- Manrope throughout: 400 for prose, 500 for supporting emphasis, 600 for headings
  and controls, 700 available for inherited strong emphasis. No serif display face.
- Shared hero/page/section/feature/statement scale in tokens.css, calibrated for
  sans-serif proportions rather than retaining the former oversized serif sizes.
- Fixed media ratios; contained product screenshots, no invented device chrome.
- White main canvas, pale green-grey product stages and footer, ink experiments section.
- Named spacing/type/colour tokens live in tokens.css. All routes share studio.css.
- CTA: short action labels, SVG arrows, instant visible keyboard focus.
- Motion: a homepage scroll-directed, three-chapter product story. Native scroll
  drives reversible wipes, text travel, layered media and a chapter progress rail.
  One sticky stage; other sections stay in document flow with gentle media accents.
  Chapter buttons and a skip link provide direct navigation. No wheel interception,
  autoplay, cursor followers, or scroll library. Reduced motion and short viewports
  use a static, manually selectable stage. Inactive scenes are inert/aria-hidden.
- Media: fixed-ratio artboards, non-overlapping desktop/mobile screenshot columns,
  common inset geometry and captions outside the artwork. Never simulate device chrome.

## Proximity choreography — October 2026

`motion-intent.js` and `motion-intent.css` add one shared pointer layer to all eight
routes. The modular logo supplies the visual language: measured corner frames,
small registration marks, and independently responsive square process nodes.

- Pointer distance, not just hover, drives the response. Ranges: controls 64px,
  media 96px, logo 120px, editorial rows/fields 48px, process nodes 68px.
- Logo tiles repel locally and settle; foreground media moves up to 10px while
  background media moves up to 5px. Corner frames appear before the media caption.
- CTA arrows lead by at most 5px. Labels and hit areas stay fixed. The native cursor
  remains visible and no full-screen cursor follower or decorative particles are used.
- Independent CSS translate/rotate/scale compose with existing scroll transforms.
  One demand-driven RAF, 95ms exponential damping, read-before-write geometry,
  offscreen observation, and no continuous idle animation.
- Decorative aria-hidden artwork remains visually responsive; inert scenes and
  background content under the image dialog do not. Node distance uses the original
  square rather than the expanding ring, avoiding self-influencing geometry.
- Fine-pointer desktop only (960px+); touch input ignored, reduced-motion preference
  disables the layer, including live changes. Keyboard focus and native links remain.
- Verified locally at 1440px and 390px on all eight routes: no horizontal overflow,
  missing images, clipped heading words, or inconsistent fonts. Fixed the lab caption
  selector so all pointer-only decoration stays hidden at mobile size.
- Actual pointer checks: CTA responded 29px outside its hit area; logo tiles moved
  independently of scroll; Services node ring and contact field rail responded;
  pointer departure settled back to zero. Project viewer closed with Escape and
  restored focus; R&D filter still displayed five projects. No enquiry was submitted.
- `tests/intent-check.cjs` covers geometry, damping, idle settling, touch/reduced-motion
  modes and live preference changes. Browser QA was Chromium, not physical iOS testing.

## Content boundaries
Keep routes, project records, real client/R&D distinction, Resend contact endpoint,
company Gmail and LinkedIn. Founder name only, no portrait. DIGIVASS is field tooling;
do not mention political affiliation. Do not invent testimonials or impact metrics.

## Page families
- Home: short statement, product stage, selected projects, proof-linked services,
  independent experiments, concise studio introduction.
- Work: compact introduction and filterable consistent two-column catalogue.
- Services: service explanations directly paired with relevant delivered work.
- About: studio point of view, founder-led accountability, principles and facts.
- Project: introduction, wide visual, facts, specific narrative and full-image gallery.
- Contact: readable contact information and existing functional enquiry form.
- Privacy/404: same chrome and type, no decorative new content.

## Verification — 2026-10-14
- All eight HTML routes inspected for layout overflow at 320, 375, 414, 768,
  1280, and 1920 CSS pixels: none detected.
- Visual spot checks: home, work, services, about, contact, and SiCater case study.
- Manual showcase checked at 320, 375, 768, and 1280: all three slides retain
  the same stage height at each viewport.
- Mobile menu opens, closes with Escape, and returns focus. R&D filter shows
  five projects. Empty contact submission flags name, email, and brief.
- JavaScript syntax and `node tests/site-check.cjs` pass: 8 routes, 18 projects,
  147 asset references after the media refinement. No captured browser console errors.
- No live email was sent. Vercel/Resend backend was not modified or redeployed.
- Reduced-motion fallback is implemented; physical iOS/Android devices were
  not available for this browser-based pass.

## Media refinement verification — 2026-10-14
- Rechecked home, work, services and SiCater detail at 320, 375, 414, 768 and
  1280 CSS pixels: no horizontal overflow or broken loaded images.
- All three showcase slides retain equal stage heights at each tested width.
- Media-curtain reveals complete; headline has an intact accessible label.
- Screenshots are composed in CSS; supplied image files are not edited.
- Motion is progressive enhancement; no new animation library or autoplay.

## Layout correction — 2026-10-14
- The previous overflow-only check missed a specificity regression: the service
  scroll-state selector forced desktop columns on mobile. State reset and layout
  rules are now separate; services stack below 960px.
- Product screenshot pairings use separate grid columns, not absolute overlap.
  Flamboys shows one dashboard instead of two overlapping panels.
- Case gallery frames have equal 4:3 dimensions, contained images and full-size links.
- Removed compounded Work group spacing, oversized founder role styling and the
  body minimum width that overflowed a 320px window with a visible scrollbar.
- Browser audit: 8 routes at 320/390/768/1024/1440; all 40 combinations pass
  overflow, service column/card width, paired image overlap and gallery frame checks
  after the 320px regression was repaired and all 8 narrow routes rechecked.
- Visual checks include mobile Services/About, tablet selected work, desktop
  Contact and Magic Pin gallery. These checks are not a substitute for user review.
- Reusable read-only browser assertions: tests/layout-check.js.

## Scroll-directed homepage — 2026-10-14
- One three-chapter sticky scene: SiCater / Magic Pin / UBM, with reversible
  scroll-linked masks, restrained layer travel, branded colour fields and progress.
- Direct chapter controls and Skip to work verified. Native scroll is not intercepted.
- Tested all 3 chapters at 320x740, 390x844, 768x900 and 1440x900: no horizontal
  overflow, active copy/media fit inside the scene, exactly one accessible chapter.
- Short-screen fallback tested at 390x560: no pin, manual chapter selection works.
- Reverse scroll verified from chapter 3 to 2 to 1 with a stable pinned position.
- Reduced-motion CSS and JS branch implemented; OS preference not toggled in QA.
- No browser console errors captured. Syntax and site-check pass (147 asset references).
- Scope: homepage only; backend and project records are unchanged. No deployment.


## Page-specific motion system — 2026-10-14

Implementation: experience.css / experience.js, loaded after the existing layout
and presentation layers on all eight routes. Native scroll remains in control.

- Home: supplied logo assembles from sixteen tiles; the existing three-chapter
  product scene remains scroll-directed. Its geometry now responds to hero resizing.
- Work: pinned horizontal product spectrum, followed by the complete archive.
  Filter changes animate both entering cards and the positions of retained cards.
- Services: sticky Frame / Shape / Build / Run circuit draws alongside delivery
  steps. Capability dividers and proof panels respond to arrival in the viewport.
- About: logo assembly, reading emphasis, and a sticky principles heading with
  separately revealed numbered principles. No founder photo was introduced.
- Project detail: narrative chapter marker, gallery frame choreography, and a
  fullscreen native-dialog viewer with arrow-key navigation and focus restoration.
- Contact: a local-only draft circuit responds to the three essential fields.
  It counts filled fields, not validation success; existing submission is unchanged.
- Privacy: section index and reading location; 404: a brand reassembly composition.
- Shared: masked heading entrances, menu-link stagger, page reading rail and
  footer reveal. Reduced motion removes spatial choreography and long pinning;
  short viewports use a manually scrollable Work spectrum. No new library or API.

Verification for this revision:
- 8 routes at 320 / 390 / 768 / 1280 viewport widths (32 combinations): no document
  overflow or paired screenshot overlap; Services stacks at narrow breakpoints.
- Viewer placeholder initialization corrected, then project route retested at all
  four widths with no broken image reports. Mobile viewer controls fit at 320px.
- Work ribbon scroll reverses correctly; R&D returns 5 projects; rapid filter
  changes settle back to all 18. Menu Escape and viewer Escape/focus return pass.
- Contact draft count reaches 3/3 and clears without submitting a message.
- Short-screen Work fallback verified at 390x560. Reduced-motion implementation
  inspected, but the operating-system preference was not toggled during QA.
- Browser console: no captured errors. Static route/project/asset check passes.
- Backend, email environment, and deployment were not changed. Physical iOS and
  Android performance still requires real-device review.

## Highlight curation — 2026-10-14

- Lead with Magic Pin (international client, production mobile product), followed
  by SiCater (PDAM operational depth) and UBM Storage (distinctive interactive work).
  This is an editorial selection based on supplied project context, not a claim
  that these projects have independently verified commercial outcomes.
- Magic Pin preview uses the public web presentation and mobile map. The earlier
  marketplace capture contains visible test listings and is no longer highlighted.
- Supporting homepage grid: Flamboys, 2Watuju, CCED, JustSpeak. It complements the
  main three chapters rather than repeating them. World of Booth stays in the
  clearly labelled independent experiments section; no archive projects removed.
- Work spectrum follows Magic Pin / SiCater / UBM / Flamboys / 2Watuju.
- Verified all three chapter selections at 320px and 390px: copy stays inside the
  scene and no horizontal overflow. Desktop opening scene and mobile supporting
  grid visually reviewed; Work order checked; no captured console errors.

## Brand typography revision — 2026-10-14

- Replaced both former typefaces with Manrope across all eight HTML routes; loaded
  actual 400/500/600/700 weights. No wordmark or screenshot asset was modified.
- Recalibrated hero and page titles, section headings, scroll chapters, archive
  captions, process labels, About lead, founder details, case markers, next-project
  links, form labels, navigation/menu, legal content, recovery page and footer.
- Heading tracking is -0.04em with 1.12 line height; prose uses 1.65 line height.
  Controls use 600 weight. Input text stays at 16px. Next-project titles now wrap.
- Masked headings preserve authored BR elements and the complete accessible name.
- Verified 8 route templates at 320/390/768/1024/1440 widths (40 combinations):
  Manrope loaded, no heading-word clipping or document overflow, narrow Services
  remains single-column. Also checked all 18 project titles at 320 and 1440.
- Visual review: desktop home/Services/Contact/footer; mobile About/menu, Work
  spectrum, case hero/viewer, Privacy and 404. All three homepage chapter copies
  fit above their media at 390px; mobile menu and viewer still close via Escape.
- Existing project curation, motion concepts, content and contact backend retained.
  No deployment or email submission. Tests are browser-based, not physical devices.

## Editorial cleanup — 2026-10-15

- Removed the Magic Pin marketplace test-data capture and logo-only thumbnail
  from its public gallery; original assets remain on disk. Four product screens
  now form the gallery, without adding unverified outcome claims.
- Added separate gallery titles for all 18 projects. Numbered legacy captures
  without individually verified content use neutral screen labels, not invented
  descriptions. File names are no longer exposed as public captions.
- Workstream filters are explicitly mapped: 3 operational, 12 platforms, and
  3 immersive projects. Client/R&D group counts follow the active filter.
- Active filter hover retains white-on-ink contrast. Flamboys labels its external
  destination as a project file on Google Drive rather than a live product.
- Gallery links announce a dialog when the viewer is active, with descriptive
  image alt text, numbered captions, and the existing no-JS new-tab fallback.
- Browser checks: all 18 galleries at 320px and 1280px rendered captions without
  filename leaks or horizontal overflow. Visually checked mobile filters (320px),
  project CTA and image viewer (390px), and desktop gallery/filter states. Viewer
  next/Escape and focus return verified. These are browser viewport tests, not
  physical-device tests. No deployment or contact-form submission performed.

## Case-study substance — 2026-10-15

- Expanded eight client studies: Magic Pin, SiCater, Flamboys, DIGIVASS, UBM,
  CCED, JustSpeak, and 2Watuju. Each has a topic-specific introduction, bounded
  contribution statement, and three implementation notes linked to gallery frames.
- Sources are the owner's supplied client context and existing project records;
  no new interviews, external availability checks, or business measurements were
  performed. Screen references illustrate interfaces, not independently verified
  outcomes. Do not turn these notes into invented customer quotes or metrics.
- Preserve attribution: Magic Pin is collaborative, JustSpeak contribution is
  back-end, UBM and 2Watuju contributions are front-end. DIGIVASS remains described
  as field tooling without political affiliations. No founder photo added.
- Replaced the generic "Shipped outcome" heading with "What was built" for client
  work and "What the experiment demonstrates" for independent R&D. Delivery
  context distinguishes public websites, internal applications, and project files.
  Removed the unsupported claim that the Navara invitation reduced manual work.
- The implementation section uses the existing type, spacing, rules, and link
  system. Mobile uses a single column. Native screen anchors provide keyboard
  focus and a visible target outline; gallery viewing and existing motion remain.
- Browser checks: eight expanded cases plus an R&D fallback at 320/768/1280px
  (27 combinations), with valid anchors, four narrative chapters, and no horizontal
  overflow. Desktop Flamboys and mobile JustSpeak visually checked. Magic Pin
  anchor navigation and target focus verified. Tests cover 24 screen references.
- Local source only; no push, deployment, or contact submission.

## Services clarity — 2026-10-16

- Clarified the four engagement models with example deliverables, while keeping
  scope, exclusions, fees, and milestones project-specific rather than inventing
  fixed packages or promises. Added in-page navigation from the introduction.
- Expanded Frame / Shape / Build / Run with a practical checkpoint for each step
  and added an explicitly scoped handover checklist.
- Added six native, keyboard-operable FAQs covering enquiry preparation, pricing
  and timing, revisions, ownership/access, third-party costs, and post-launch work.
  No revision count, ownership transfer, support period, or SLA is promised.
- Styles are isolated in services.css. Existing capability artboards and motion
  remain. Process tracking now uses the actual positions of the four steps instead
  of equal portions of the container, accommodating longer text and mobile layout.
- Browser verification: 320/390/768/1280px, all six FAQs opened by keyboard, no
  horizontal overflow. Desktop engagement cards and FAQ, mobile FAQ and process
  reviewed visually. All four process indicators matched their steps at 390/1280px.
- Only this Services stage completed. No external-proof research, contact backend
  work, image/SEO optimization, push, or deployment included.

## Public project destinations — 2026-10-16

- Magic Pin now links to its product website and the matched Apple App Store and
  Google Play listings. Store identity was checked against product descriptions,
  publisher names, and the magicpinapp.com / magicpinapp.net domain family. No
  review quotes, ratings, download counts, or implied authorship verification added.
- Retained collaboration attribution. Added publisher/device-region context and
  explicit new-tab accessible names; links use noopener noreferrer and wrap on
  small screens with at least 44px-high tap targets.
- UBM's existing destination is labelled as a browser demo with WebGL requirements.
  JustSpeak and 2Watuju carry a client-managed/current-version note. Internal
  projects without URLs point to their documented screens; no login links invented.
- Verification details and limitations are in project-link-review.md. In particular,
  JustSpeak browser loading timed out and UBM rendered blank in the test browser;
  neither is described as fully tested. Other archive links were not all rechecked.
- UI checks covered seven representative cases at 320/390/1280px, no horizontal
  overflow; correct website/store/file/demo/fallback rendering and new-tab semantics.
  This stage does not include contact-form work, publication, or private access.

## Portable exports

Canonical complete CSS tokens: [tokens.css](tokens.css).

### Tailwind v4 mapping
```css
@theme inline {
  --color-background: var(--color-paper);
  --color-foreground: var(--color-ink);
  --color-primary: var(--color-accent);
  --font-heading: var(--font-display);
  --font-sans: var(--font-body);
  --spacing-page: var(--page-gutter);
}
```

### DTCG core tokens
```json
{"color":{"paper":{"$type":"color","$value":"#ffffff"},"ink":{"$type":"color","$value":"#111111"},"accent":{"$type":"color","$value":"#8BCF6A"}},"font":{"display":{"$type":"fontFamily","$value":"Manrope"},"body":{"$type":"fontFamily","$value":"Manrope"}}}
```

### shadcn semantic mapping
```css
:root {
  --background: var(--color-paper);
  --foreground: var(--color-ink);
  --primary: var(--color-accent);
  --primary-foreground: var(--color-ink);
  --muted: var(--color-paper-2);
  --muted-foreground: var(--color-muted);
  --border: var(--color-rule);
  --ring: var(--color-focus);
}
```
