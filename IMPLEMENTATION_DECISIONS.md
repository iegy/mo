# Implementation Decisions — Chapter 01 v1.0

Only production decisions needed to complete the locked chapter are listed here. No character, story, scene-order or identity changes were made.

## 1. Static Next.js export

The package recommended Next.js. It was retained and configured with `output: "export"`, portable public assets and an optional `NEXT_PUBLIC_BASE_PATH`. This satisfies GitHub Pages and keeps the output transferable to any static host.

## 2. Lightweight MO Story Engine

The scroll engine uses one passive scroll listener, one `requestAnimationFrame` update for the active scene and `IntersectionObserver` for scene activation/loading. GSAP was not added because the required chapter timelines can be delivered with a materially smaller dependency/runtime cost using native browser APIs.

## 3. Production art consolidation

The handoff contained Canon boards but no separated scene assets. Six directly usable versioned assets were produced:

- Mo production atlas.
- PIX production atlas.
- Four panoramic scene environments.

Scenes reuse crop-safe panoramas with different object positions, parallax, panel geometry and overlays. This reduces initial and total transfer weight without changing any scene or story beat.

## 4. Procedural static audio

Because the handoff contained no audio files, nonverbal cues and ambience were implemented with Web Audio. This avoids external services, licensing ambiguity and large audio downloads. Sound is optional, immediately muteable and silent until a user gesture.

## 5. The Blank

The Blank is implemented as progressive subtraction: saturation/texture/sound/effect density falls toward white. It has no body, face or monster sound, matching the Visual Bible.

## 6. Client-side persistence

Reading progress, Arabic/English choice, mute/volume, performance mode and motion preference are saved under versioned `localStorage` keys. Writes are delayed after scrolling to prevent storage work in the hot path.

## 7. Performance modes

Auto chooses Lite on devices reporting four or fewer logical cores, otherwise Balanced. Lite removes secondary overlays and expensive visual filtering while preserving every scene and story beat. Reduced Motion replaces large movement with stable poses/cuts.

## 8. Arabic title adaptation

Narration uses natural light Egyptian Arabic. English copy is adapted independently. Mo and PIX have no spoken or written dialogue; their communication is exclusively visual/nonverbal.
