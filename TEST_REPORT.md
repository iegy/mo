# Chapter 01 — Final Test Report

Build: `MO-1.0.0-IEGY`  
Date: 2026-08-25  
Target: static GitHub Pages / portable static hosting

## Automated gates

- Clean dependency install from `package-lock.json`: **PASS**.
- TypeScript strict check: **PASS**.
- Next.js production static export: **PASS**.
- GitHub Pages subpath export (`/mo-chapter`): **PASS**, including runtime art, Next chunks, favicon and social metadata URLs.
- ESLint: **PASS**.
- Chapter/data/static tests: **6/6 PASS**.
- Exported routes: `/` and static `/_not-found`.
- Runtime backend/API/Firebase dependency scan in player: **PASS — none**.

## Story coverage

- 12/12 locked scene IDs present exactly once.
- Epilogue present.
- Chapter 02 teaser present.
- Frame Break, Falling Between Worlds, The Margin, The Blank and Final Escape present.
- All five approved hidden items present: sign 3-tap response, `MH-4047`, alternate-Mo silhouette, door `01`, Broken Corner Mark.

## Desktop browser QA

Chrome viewport: 1363×936.

- Production title/metadata loaded.
- Arabic default with RTL loaded.
- 12 scene sections detected.
- Hero AVIF and character atlas rendered correctly.
- Desktop scene rail and toolbar rendered.
- No desktop horizontal overflow measured.
- Lazy state showed current/nearby art only; remaining scenes stayed placeholders until approached.

## Mobile responsive QA

Contained Chrome mobile frame: approximately 374×828 CSS pixels.

- Mobile breakpoint engaged.
- Scene layout changed to one column.
- Desktop scene rail hidden.
- Toolbar height reduced to 58px.
- Primary touch target measured at 52px.
- English switch rendered correctly in the mobile frame.
- Vertical artwork crop kept Mo and the scene readable.
- A measured 8px scroll-width discrepancy from the framed test environment was followed by a final `overflow-x: clip` guard on the app root.

## Accessibility and settings

- Native `prefers-reduced-motion` respected.
- Manual Reduced Motion setting persisted client-side.
- Keyboard-focusable semantic buttons used for all optional interactions.
- Story remains complete with sound off and interactions ignored.
- Sound requires an explicit user gesture and is immediately muteable.
- No required Hover-only control.

## Performance checks

- Background AVIF files: ~59–104 KiB each.
- Background WebP fallbacks: ~106–201 KiB each.
- Only active/current + next scene environment is requested by the smart loader.
- One RAF loop updates only the active scene.
- Progress UI render updates capped to approximately 10 per second.
- `localStorage` progress writes delayed until 350ms after scrolling settles.
- Auto/Balanced/Lite performance modes available.
- Final root-hosted `out/`: 45 files, approximately 4.5 MiB total.

## Final limitation

Browser QA used a desktop Chrome session plus a contained mobile-width Chrome frame. Physical Android/iOS device hardware and Safari were not available in this build environment; a post-deploy smoke check on one mid-range Android phone and one iPhone remains recommended, but no release-blocking issue was found.
