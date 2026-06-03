# Image Curation Guide — All-in-One Digital Studio (`thedesigns.org/weby`)

**Art direction:** Dark, cinematic, minimal. Premium B2B studio — not a generic agency.  
**Palette:** Deep navy/charcoal bases · clean whites for UI/code highlights · neon blue/cyan accents · subtle warm tungsten or amber rim light (never full orange wash).  
**Mood:** Quiet confidence, craft, and control — like a late-night session in a real studio, not a stock “team high-five.”

---

## Global rules (all assets)

| Do | Don't |
|----|--------|
| Low-key lighting, shallow depth of field, visible grain optional | Bright open-plan offices, handshake shots, “diverse team at whiteboard” |
| Real tools: mirrorless bodies, gimbals, tablets, code on screen | Clip-art icons, fake UI mockups with lorem in Comic Sans |
| One hero accent color per frame (blue **or** warm rim, not rainbow) | Oversaturated cyberpunk, lens flare spam, purple-pink AI slop |
| Negative space for headline overlay (left 40–50% often clear) | Busy center-weighted clutter where H1 will sit |
| 16:9 hero / section heroes; 4:3 or 1:1 for cards if cropped | Watermarks, obvious stock logos, dated MacBook bezels |

**Export targets (web):** WebP/AVIF, 1920×1080 (hero), 1200×800 (sections), quality ~80–85. Darken 5–10% in post so white UI text on site still passes contrast.

**Color grade reference:** Lift shadows slightly (not crushed blacks), cool shadows (#0a0e18), warm highlights on skin/metal only (+3–5% amber in curves), accent glow in blues (#4f8cff – #7dd3fc range).

---

## 1. Hero background / main image

**Placement:** Full-width hero right column or background under gradient (`weby` split-grid can be replaced by single 16:9 asset).

### Visual description (shot list)

- **Scene:** Ultra-modern creative desk, ¾ angle or straight-on at 35–50mm equivalent. Dark wood or matte black surface.
- **Foreground left:** Premium mirrorless (Sony α7/α9 class or similar) with metal lens, subtle **lens reflection / faint blue glow** on front element — not sci-fi laser.
- **Foreground right:** Slim laptop (MacBook Pro aesthetic) showing a **real** code editor: dark theme, syntax-highlighted HTML/CSS or Tailwind utility classes, readable but not legible at thumbnail size.
- **Background:** Soft bokeh of softboxes or LED panels; 2–3 circular highlights. No people required; optional blurred hand on camera acceptable.
- **Light:** Key from camera-left cool (blue gel or daylight balance), rim from rear-right warm (tungsten). Overall exposure **0.5–1 stop under** “correct” for cinematic feel.
- **Composition:** Leave **left third** relatively dark/empty for headline overlay; visual weight camera + laptop on right two-thirds.

### Midjourney prompt (primary)

```
/imagine premium creative workspace, mirrorless camera with subtle glowing lens beside sleek laptop showing clean dark-theme frontend code editor HTML Tailwind CSS, dark minimalist studio desk dark wood, professional softbox lights bokeh background, neon blue accent light subtle warm rim light, cinematic depth of field, low key, photorealistic, 8k, shot on 35mm --ar 16:9 --style raw --v 6
```

**Variations to run:**

```
... same scene, wider angle more negative space left for text overlay --ar 16:9
... same scene, top-down 45 degree desk flatlay hybrid, moody --ar 16:9
... extreme close-up lens reflection and keyboard edge, abstract hero crop --ar 21:9
```

**Negative prompt (append):** `office team, corporate meeting, handshake, bright white office, cartoon, illustration, text watermark, logo, cluttered desk, pizza, energy drink cans, RGB gamer setup`

### Stock search keywords

**Primary (English):**  
`creative digital studio`, `modern tech workspace dark`, `camera and laptop developer desk`, `multimedia production desk`, `mirrorless camera laptop coding`, `film production workspace night`

**Secondary / long-tail:**  
`web developer desk cinematic`, `content creator workspace moody`, `photo video studio desk setup`, `frontend developer dark office`, `Sony camera laptop desk` (brand-agnostic alternatives: `mirrorless camera workstation`)

**Adobe Stock / Shutterstock style:**  
`dark minimalist workspace`, `creative agency desk night`, `camera computer desk low key`

**Unsplash / Pexels style:**  
`dark desk setup`, `camera laptop`, `moody workspace`, `developer desk night`

**Avoid in results:** `startup team`, `business people smiling`, `open plan office daylight`

---

## 2. Section — Commercial photo & video

**Placement:** Ecosystem card B, work strip “hospitality/product,” or dedicated section banner.

### Visual description (shot list)

- **Scene:** Tight **behind-the-camera** or 45° side angle in a **black cyclorama or dark grey seamless** studio.
- **Subject:** Camera on tripod or compact gimbal (DJI RS class silhouette OK); lens pointing at a **single hero product** — premium coffee bag, glass bottle, or hospitality object (ceramic cup, menu stack). One product only.
- **Light:** Strong **back/rim light** (edge definition on product + camera silhouette), soft fill from front-left at low power. Optional **haze/smoke** at 10–20% opacity for beam visibility — must not obscure product label area.
- **Focus:** Sharp on product plane or front lens element; camera body slightly softer acceptable.
- **Mood:** Commercial BTS, not wedding/documentary. No models unless hands only (styling product), cropped at wrist.

### Midjourney prompt (primary)

```
/imagine close-up professional mirrorless camera on tripod filming luxury product in dark photography studio, premium coffee packaging or sleek bottle on pedestal, cinematic backlight rim lighting, atmospheric haze smoke, sharp focus on product, commercial videography behind the scenes, low key, photorealistic, 8k --ar 16:9 --style raw --v 6
```

**Variations:**

```
... gimbal operator silhouette out of focus, product hero sharp, blue rim light --ar 16:9
... macro product with camera blur foreground, festival hospitality vibe ceramic and menu --ar 4:3
... video monitor showing waveform false color in background blur, studio BTS --ar 16:9
```

**Negative prompt:** `wedding, family portrait, outdoor golden hour, studio white background ecommerce packshot only, amateur smartphone, on-camera flash harsh`

### Stock search keywords

**Primary:**  
`commercial photography studio dark`, `behind the scenes product video`, `camera gimbal studio`, `product video shoot studio`, `backlit product photography studio`

**Secondary:**  
`BTS commercial shoot`, `food photography studio dark`, `beverage packshot cinematic`, `video production studio product`, `smoke machine studio photography`

**Hospitality crossover (café/hotel brief):**  
`restaurant food photography studio`, `hotel amenity product shot dark`, `coffee brand photography studio`

**Avoid:** `wedding videography`, `youtube vlogger bedroom`, `green screen`

---

## 3. Section — Graphic design & posters (festivals / events)

**Placement:** Ecosystem card C, festival/culture work tile, or print/branding subsection.

### Visual description (shot list)

- **Angle:** **Top-down flatlay** (90°) or controlled **isometric ~30°** — isometric reads more “design studio,” flatlay more “print craft.”
- **Surface:** Dark matte desk (black linoleum, dark felt, or charcoal paper) — not white marble (too lifestyle).
- **Elements (arranged with grid, not messy):**
  - 2–4 **festival/event poster mockups** — modern typography, abstract geometry or duotone photos; suggest music/culture without trademarked acts (no real band names).
  - **Drawing tablet** (Wacom/iPad Pro aesthetic) with **subtle screen glow** showing vector paths or poster art.
  - **Stylus** placed deliberately; optional pantone-style **swatch chips** or printed color strips.
  - Optional: metal ruler, X-Acto, crop marks on proof sheet — reinforces print-ready positioning.
- **Light:** Single soft source top-left; faint **cyan or blue bounce** on tablet edge; tiny warm accent on paper edge optional.
- **Composition:** Center-weighted OK for card crop; keep 15% margin for UI padding when used as background.

### Midjourney prompt (primary)

```
/imagine flatlay graphic designer desk dark aesthetic, modern music festival poster mockups spread out, digital drawing tablet with glowing screen and stylus, color palette swatches, moody studio lighting soft top light subtle blue accent, minimalist artistic layout, print design branding, photorealistic, 8k --ar 16:9 --style raw --v 6
```

**Variations:**

```
... isometric view designer desk posters tablet, dark cinematic --ar 16:9
... close-up hands with stylus on tablet poster artwork visible, shallow depth --ar 4:3
... stack of event flyers edge-on with depth, neon edge light, dark background --ar 21:9
```

**Negative prompt:** `bright white desk, canva template collage, childish clipart, christmas craft, messy hoarder desk, office cubicle`

### Stock search keywords

**Primary:**  
`graphic design mockup dark`, `festival poster design desk`, `branding identity print flatlay`, `designer desk top view tablet`, `event poster mockup flat lay`

**Secondary:**  
`creative director desk`, `wacom tablet desk dark`, `print design proof sheets`, `music festival poster design`, `brand guidelines flatlay`

**Print/offline angle:**  
`flyer mockup desk`, `poster printing design studio`, `offline marketing materials design`

**Avoid:** `scrapbook`, `school project`, `scrapbooking`, generic `business card mockup` on white wood

---

## Platform-specific search tips

| Platform | Tip |
|----------|-----|
| **Adobe Stock** | Filter: Horizontal, People=No (hero), Color=Blue/Dark. Use “similar” from one strong BTS camera shot. |
| **Shutterstock** | Search `low key` + `studio`; exclude Editorial unless real events needed. |
| **Unsplash** | Often too bright — add `dark` `moody` `night`; may need heavy grade in post. |
| **Pexels** | Good for BTS video loops; pair stills with subtle loop for hero (optional). |
| **Midjourney** | Use `--style raw` and reference sheet: lock desk + camera model across 3 prompts for visual consistency. |

---

## Consistency pass (before upload)

1. **Match black point** across all three (sample #08060f from site CSS).
2. **Unify accent hue** — same blue gel on all neon accents (±5° hue).
3. **Same wood/desk tone** if hero and design desk both show wood — or make design desk black to differentiate sections.
4. **Crop safe zones** — test with 50% dark gradient overlay + white H1 mockup.
5. **Rights** — commercial license, no recognizable brands (Apple logo, Sony logo) unless licensed; blur or angle away.

---

## Site mapping (`weby/index.html`)

| Asset | Suggested file | Current placeholder |
|-------|----------------|---------------------|
| Hero (single or split) | `img/weby/hero-studio-desk.webp` | `srv2.png` + `team1.png` split |
| Photo & video | `img/weby/section-commercial-bts.webp` | `mountain.png` on card B |
| Graphic & posters | `img/weby/section-design-flatlay.webp` | `prismatic.png` on card C |

After sourcing, update `src` paths in `weby/index.html` and add descriptive `alt` text per active language (EN/SK/DE) in the i18n dictionary if needed.

---

*Document version: 2026-06-03 · Signal House / thedesigns.org/weby*
