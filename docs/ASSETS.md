# Prototype imagery

Generated using the **built-in image-generation tool**. All people, hardware, and dashboard displays are conceptual. Generated PNGs were encoded as WebP without changing composition. Each image is 1536 × 1024. Total image payload: approximately 590 KiB.

| File under `public/assets/concept/` | Placement |
| --- | --- |
| `hero.webp` | Golfer hero; subject on right, negative space on left |
| `product.webp` | Black cap, sensor and tablet dashboard |
| `sunset.webp` | Results backdrop and sunset CTA |
| `golfer.webp` | Golfer audience card and CSS-framed portrait |
| `coach.webp` | Coach audience card and CSS-framed portrait |
| `team.webp` | College audience card and CSS-framed portrait |

## Prompts

### Hero
Use case: photorealistic-natural. Create a premium sports campaign website hero photograph, wide landscape 1536x1024. Athletic adult male golfer wearing a black performance polo and black cap with small white THRIVE wordmark and tiny neon lime sensor at temple, poised after a powerful golf swing on the RIGHT HALF of the composition. Beautiful realistic championship golf course, dark green trees, soft morning sun, cinematic editorial photography, authentic skin and fabric. Left half mostly softly blurred dark forest and fairway with generous negative space for white website headline. Black, white, electric lime sports tech mood. No overlaid text, no infographic, no UI, no watermark. This is conceptual prototype brand photography.

### Product
Use case: product-mockup. Premium photorealistic studio product photograph for Thrive golf mental performance concept website. Landscape composition: a real black fabric golf cap with small white THRIVE embroidery and a small black sensor with electric lime indicator clipped beside the temple, on left foreground; a thin black tablet angled naturally on right showing a sophisticated dark dashboard with lime waveform, circular focus score and small charts, no unreadable paragraphs. Pale warm gray seamless background, soft realistic shadows, luxury sport technology advertising, crisp fabric detail, refined restrained green accents. Cap and tablet both fully within frame, generous white surrounding space. No floating decorative objects, no extra text outside devices. Conceptual hardware illustration.

### Sunset
Use case: photorealistic-natural. Wide cinematic golf course photograph at golden sunset, 1536x1024 landscape. Rolling immaculate fairways, dramatic amber sun low at far right horizon, dark trees, golfer small in right third seen from behind holding club looking out over course. Atmospheric warm light, deep olive shadows, subtle mist, premium editorial golf campaign. Left and center open landscape for website headline overlay. No text, no logos, no watermarks.

### Golfer
Use case: photorealistic-natural. Premium editorial golf photograph, landscape. Female adult golfer black performance polo and black cap lining up a putt, crouched on a pristine putting green, thoughtful focus, club in hand. Beautiful natural course and soft trees behind, sunlight, realistic textured photography, quiet confidence, dark green and black palette. Waist up portrait included clearly, enough room for landscape card crop, no text no watermark. Fictional model for concept sports brand.

### Coach
Use case: photorealistic-natural. Premium sports editorial photograph landscape. Experienced adult male golf coach in black polo showing a tablet to an adult golfer in white polo on a driving range. Candid genuine interaction, coaching mental routine, green golf course, natural soft sunlight, excellent realistic faces and hands. Waist up composition, subjects middle and right, black white green color palette. No brands no text no watermarks. Fictional people for conceptual golf website.

### Team
Use case: photorealistic-natural. Landscape premium editorial golf team photograph, four diverse young adult college golfers men and women standing together with golf bags on sunny course, coordinated white and dark forest green polo shirts and caps, relaxed confident team spirit. Faces clear, waist up or three quarter view, beautiful green trees softly blurred background, authentic realistic sports photography. No logos, no text, no watermarks. Fictional adult models for conceptual website.

## Replace approved content

Place approved images in `assets/approved/` and update paths in HTML and `content.js` / `script.js`. Adjust CSS image positions as needed. Retain concept disclosures until replacement is approved.

- Testimonials and identities: `prototypeContent.quotes` in `public/content.js`.
- Performance figures and methodology: `.stats` and associated disclosure in `public/index.html`.
- Partner logos: `.trust-logos` in `public/index.html`; use approved artwork and alt text.
- Booking scheduler: `#booking-link` in `public/index.html`.
- Video: replace `#story-dialog` walkthrough with an approved captioned video; update callout labels.
- Brand mark: header SVG and favicon are prototype artwork.

Portraits currently reuse the audience photographs with CSS framing. Dedicated approved portraits can replace these later.
