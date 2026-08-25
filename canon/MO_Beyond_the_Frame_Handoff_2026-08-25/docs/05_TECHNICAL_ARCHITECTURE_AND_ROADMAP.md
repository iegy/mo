# Technical Architecture & Roadmap

## Recommended stack

- Next.js
- TypeScript
- GSAP
- ScrollTrigger
- HTML/CSS transforms for most scene motion
- Canvas/WebGL only when a scene genuinely benefits from it
- optimized WebP/AVIF assets

## Why not render everything as video?

The experience must respond to scroll, taps, pacing, mobile layout, reduced motion, and hidden interactions. Use video sparingly, if at all.

## Scene architecture

Chapter
→ Scenes
→ Layers
→ Timeline
→ Interactions
→ Audio
→ Localized text
→ Mobile variant

A scene manifest should support:
- id
- title
- duration estimate
- scroll length
- layers
- character state
- animation timeline
- sounds
- interactions
- easter eggs
- mobile variant

## Suggested engine names

- `MoStoryEngine`
- `MoScene`
- `MoTimeline`
- `MoCharacter`
- `PixEntity`
- `BlankEffect`
- `FrameBreakTransition`
- `MarginPortal`
- `IEgySignature`

Internal engine nickname: **MO Story Engine / MOSE**.

## Asset layering

Do not build critical scenes as one giant flat image.

Prefer:
- BG background;
- far/mid environment;
- Mo;
- PIX;
- interactive objects;
- foreground;
- FX/particles;
- UI/text overlays.

## Loading strategy

Do not preload the whole chapter.

Load:
- current scene;
- next scene;
- limited previous scene if needed for reverse scroll.

Preload intelligently while the user reads.

## Performance modes

### High
Full parallax, particles, richer lighting.

### Balanced
Reduced layer count/effects.

### Lite
Essential movement only.

Story content remains the same.

## First real prototype

Do not produce more infographic boards.

Build the hardest representative interactions first:

### Prototype A — Scene 02
Walking + parallax + sign reaction.

### Prototype B — Scene 07
Breaking the frame.

### Prototype C — Scene 08
Vertical fall through worlds.

### Prototype D — Scenes 11–12
The Blank + escape/action.

Prototype success criteria:
- smooth on a mid-range phone;
- no obvious scroll jank;
- Mo feels integrated into the scene rather than a sticker;
- scroll mechanic is understood naturally;
- frame break feels genuinely surprising;
- The Blank is mysterious, not horror-monster-like;
- mute control is immediate;
- mobile feels intentionally staged.

## Production roadmap

### Phase 1 — Canon cleanup
- lock source Mo references;
- lock exact approved visual reference;
- finalize PIX model without changing Mo.

### Phase 2 — Production art pipeline
- produce actual final scene assets;
- separate layers;
- create required Mo animation states;
- create PIX states;
- export desktop/mobile variants where needed.

### Phase 3 — Technical prototype
Build Scenes 02, 07, 08, 11–12.

### Phase 4 — MO Story Engine
Implement reusable chapter/scene/timeline system.

### Phase 5 — Chapter 01 full production
Implement all 12 scenes using the engine.

### Phase 6 — Audio
Add music/ambience/Mo/PIX/Blank sound behavior.

### Phase 7 — Site shell
- home;
- chapters;
- chapter player;
- characters;
- world/about;
- Arabic/English switch;
- settings/audio;
- continue reading.

### Phase 8 — Mobile & accessibility
- deliberate mobile layouts;
- reduced motion;
- keyboard behavior;
- touch targets;
- sound-off completeness.

### Phase 9 — Rights & release metadata
Apply IEgy Signature, copyright, hashes, build IDs, footer.

### Phase 10 — QA & launch
Test on desktop and mid-range mobile devices, then launch Chapter 01.

## Important correction from previous process

Do not count a new character sheet/summary board as “implementation.”

A production step counts only when it creates something directly usable by the site, such as:
- final layered artwork;
- animation sequence;
- production-ready asset;
- code prototype;
- working chapter scene.
