# Storyboard imagery

Reference: user-supplied `golf websiite.png`, a 1536 × 1024 twelve-screen composite. The built-in image-generation tool recreated six background photographs using this visual reference. These conceptual photos contain fictional people and are not approved Thrive photography.

Generated PNGs were encoded as WebP at their original 1536 × 1024 dimensions. The six new WebP files total approximately 705 KiB. HTML/CSS provides all text, icons, and controls; no screenshot is used as a non-interactive page.

| File under public/assets/reference/ | Placement |
| --- | --- |
| hero-video-finish.webp | Home, golf learning, golf program summary, payment, welcome |
| sports.webp | Sports entry and path card |
| life.webp | Personal Life, Calm choice, personal program summary |
| recognition-putter.webp | Golf recognition |
| ball.webp | Unfair Advantage, golf path and stress choice |
| mountains.webp | About, Reset & Recovery, unavailable Level 3 |

Previous `assets/concept/sunset.webp` and `coach.webp` are reused for How it works and training choices. Other earlier concept assets remain available but are not referenced by this interface.

## Exact generation prompts

### Approved crouching golfer replacement — 2026-10-22

`recognition-putter.webp` replaces the short putter and awkward hand position in `recognition.webp`. The user approved the revised preview: a natural crouch, one hand on top of a full-length upright putter and the other on the knee. The supplied real golfer photograph was used only for posture and club proportions; the existing conceptual image supplied the fictional golfer's appearance, navy outfit, pale right-side background, and composition. This remains conceptual prototype artwork.

The approved 1536 × 1024 PNG was encoded as WebP at quality 90. The distinct filename avoids cached old imagery. Source reference and rejected previews remain outside the published directory. The old asset is retained for historical comparison but is no longer referenced by the interface. Exact prompt: [RECOGNITION-PROMPT.md](RECOGNITION-PROMPT.md).

### Approved golf finish replacement — 2026-10-22

`hero-video-finish.webp` replaces the defective grip in the original `hero.webp`. The user approved the new full-body sunset preview after supplying a golf-swing video. The pose follows the finish at 00:37: joined hands above the left shoulder and one straight club extending to the right. The built-in image editor used that video frame for the pose and the original hero only for scenery, clothing palette, and composition. The image remains conceptual artwork, approved for this prototype rather than official Thrive product photography.

The approved 1536 × 1024 PNG was encoded as WebP at quality 90. The new filename prevents stale image caching. Original video, extracted reference frames, and rejected previews are kept out of the published assets. The original `hero.webp` is retained for historical comparison but no longer referenced by the interface. Exact replacement prompt: [HERO-FINISH-PROMPT.md](HERO-FINISH-PROMPT.md).

### hero

Use case: photorealistic-natural. Reference image: supplied 12-screen Thrive website storyboard. Recreate ONLY the background photo of panel 1 HOME PAGE, not a website. Clean high resolution 1536x1024 landscape photograph. Full body male golfer seen from behind on right third, navy polo, light grey trousers, white cap, finishing a golf swing, club lifted over shoulders toward upper left. Golden late afternoon golf course, green fairway, low dark treeline, dramatic blue sky with peach sunset clouds. Match subject placement and scene to panel 1; generous open negative space on left for text. Preserve full golfer from cap to shoes within frame, leave 8% top and bottom margin. Remove ALL text, UI, logos, buttons, borders, arrows and collage elements. Single photo only.

### sports

Use case: photorealistic-natural. Reference image: supplied Thrive storyboard. Recreate ONLY panel 3 SPORTS PERFORMANCE background as a clean landscape 1536x1024 photo, NOT a website. A muscular adult Black male sprinter in fitted dark navy athletic clothes, poised running from left to right in profile in a professional stadium at night. Athlete centered right, full body, dramatic white stadium floodlights, deep blue-black cinematic scene. Match panel 3 athlete mood and dark blue composition closely. Empty track foreground and negative space at left and lower left for UI copy. No text, logos, collage, buttons, borders, or watermarks.

### life

Use case: photorealistic-natural. Reference image supplied Thrive storyboard. Recreate ONLY photograph in panel 4 PERSONAL LIFE ADVANTAGE as clean 1536x1024 landscape photo. Adult woman with brown hair in a loose bun, soft beige knit sweater, seen from behind sitting cross-legged at the RIGHT side on a wooden terrace overlooking a calm blue lake and layered mountain ridges at peach-gold sunset. Reflective tranquil atmosphere, natural editorial photography. Match panel 4 composition and colors; open scenic left half for page copy. No text, logos, UI, borders, arrows or collage. One single photographic image.

### recognition

Use case: photorealistic-natural. Reference image is supplied Thrive storyboard. Recreate photo from panel 5 GOLF PAGE RECOGNITION, not its text or interface. Landscape 1536x1024 clean editorial photograph, thoughtful adult male golfer in navy polo light grey trousers light grey cap crouching on LEFT half of image on green, elbow resting on knee, his hand touching chin, golf club upright beside him. Downcast reflective expression. Trees and green fairway soft background. Fade naturally through pale sky and bright out-of-focus background to very light off-white on RIGHT half for dark website text. Match the pose and clothes in panel 5 closely. No letters, logo, icons, borders, collage or watermark.

### ball

Use case: photorealistic-natural. Reference supplied Thrive storyboard. Recreate ONLY photograph behind panel 6 GOLF THE UNFAIR ADVANTAGE. Single clean 1536x1024 landscape cinematic golf photograph. Close low ground-level camera on sunlit putting green, a large sharply detailed white dimpled golf ball near lower-right third, soft golden light from upper right, defocused golf fairway and dark tree line behind. Left side is mostly open shaded dark olive green grass and softly blurred trees to support white text. Match the reference ball and setting and warm gold palette. No people, no text, no logos, no UI, no borders, no collage.

### mountains

Use case: photorealistic-natural. Reference supplied Thrive storyboard panel 2 WHAT IS THRIVE and selection tiles. Create clean landscape background, 1536x1024. Airy pale white and soft blue sky with subtle wisps of clouds occupying upper 70%, layered distant pale blue mountain ridges at bottom, low forested blue-green hills in foreground bottom edge. Very light desaturated blue-white spacious calming photographic scene matching the background of panel 2. No people, text, icons, logos, UI, borders, arrows or collage. Top and center nearly white for dark navy text legibility.

## Reused prompts

### sunset

Use case: photorealistic-natural. Wide cinematic golf course photograph at golden sunset, 1536x1024 landscape. Rolling immaculate fairways, dramatic amber sun low at far right horizon, dark trees, golfer small in right third seen from behind holding club looking out over course. Atmospheric warm light, deep olive shadows, subtle mist, premium editorial golf campaign. Left and center open landscape for website headline overlay. No text, no logos, no watermarks.

### coach

Use case: photorealistic-natural. Premium sports editorial photograph landscape. Experienced adult male golf coach in black polo showing a tablet to an adult golfer in white polo on a driving range. Candid genuine interaction, coaching mental routine, green golf course, natural soft sunlight, excellent realistic faces and hands. Waist up composition, subjects middle and right, black white green color palette. No brands no text no watermarks. Fictional people for conceptual golf website.

## Replacement guide

Put approved photos in `public/assets/approved/`, then replace paths in `public/index.html`, `public/styles.css`, and the summary-image choice in `public/script.js`. Preserve landscape proportions and right-side subjects where copy is on the left. Review wide and narrow crops.

The THRIVE wordmark is live text. Five capability icons are SVG symbols in HTML; the navy T favicon is separate SVG artwork. There are no external icon/font dependencies.

Keep training descriptions in HTML and labels in `state.mjs` synchronized with approved offerings. Sports and Level 3 remain unavailable until confirmed.
