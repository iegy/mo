# Chapter 01 Asset Inventory

Release: `MO-1.0.0-IEGY`  
Project ID: `MO-IEGY-01`  
Signature: `MH-4047`

## Runtime character assets

| File | Role | Format / size | Loading |
| --- | --- | --- | --- |
| `public/assets/characters/mo-action-sprite-v1.webp` | Final-canon Mo: idle, walk, push, fall, land, panic run | Lossless WebP, ~496 KiB | Loaded once when CSS first needs Mo |
| `public/assets/characters/pix-state-sprite-v1.webp` | Final-canon PIX: hover, curious, play, alarm, guide, protect | Lossless WebP, ~494 KiB | Loaded when PIX first appears |
| `source_assets/characters/*-v1.png` | Optimized transparent source atlases | Indexed PNG source assets | Included with the source, outside the deployable runtime |

Atlas order is 3×2, left-to-right then top-to-bottom. Both are versioned production assets generated directly from the locked final-canon references.

## Runtime environment art

Each environment ships as AVIF → WebP → JPEG fallback. The player initially loads only the hero/current environment and preloads the next scene environment.

| Base filename | Scenes | AVIF | WebP | JPEG |
| --- | --- | ---: | ---: | ---: |
| `city-workshop` | 01–05 | ~104 KiB | ~201 KiB | ~397 KiB |
| `frame-fall` | 06–08 | ~90 KiB | ~169 KiB | ~365 KiB |
| `margin-blank` | 09–11 | ~59 KiB | ~106 KiB | ~270 KiB |
| `escape-finale` | 12, epilogue | ~75 KiB | ~138 KiB | ~298 KiB |

## Uncompressed scene masters

The original production PNG panoramas are included outside the deployable runtime under `source_assets/scenes/`:

| File | Dimensions | Runtime derivatives |
| --- | ---: | --- |
| `city-workshop-panorama-v1.png` | 1933×814 | `city-workshop.{avif,webp,jpg}` |
| `frame-fall-panorama-v1.png` | 1774×887 | `frame-fall.{avif,webp,jpg}` |
| `margin-blank-panorama-v1.png` | 1672×941 | `margin-blank.{avif,webp,jpg}` |
| `escape-finale-panorama-v1.png` | 1536×864 | `escape-finale.{avif,webp,jpg}` |

These PNG masters are not copied into `out/`, so they do not affect page-load performance.

## Social and brand assets

| File | Role |
| --- | --- |
| `public/og.png` | 1200×630 Open Graph / social card with final-canon Mo and PIX |
| `public/favicon.svg` | Browser icon |

## Audio

No downloaded audio file is required. `app/lib/audio-engine.ts` synthesizes lightweight ambient tones and nonverbal cues for Mo, PIX, errors, impacts, doors and success through the Web Audio API. The Blank lowers ambience toward silence rather than playing a monster sound.

## Canon source package

The complete authoritative handoff is preserved under:

`canon/MO_Beyond_the_Frame_Handoff_2026-08-25/`

Primary locked references used during production:

- `media/00_CANON_CHARACTER_DESIGNS/01_MO_FINAL_CANON_MASTER.png`
- `media/00_CANON_CHARACTER_DESIGNS/02_MO_FINAL_CANON_SUPPORTING.png`
- `media/00_CANON_CHARACTER_DESIGNS/03_PIX_FINAL_CANON_MASTER.png`
- `media/00_CANON_CHARACTER_DESIGNS/04_PIX_FINAL_CANON_SUPPORTING.png`
- `media/02_approved_visual_mockup/01_approved_interactive_comic_mockup.png`

The original Mo folder remains Early Reference / Inspiration only and never overrides the final model.
