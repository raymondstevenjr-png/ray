# Required Assets — Drop these into /public/

## Map Images (Beat 1)

| File | Description | Recommended source |
|------|-------------|-------------------|
| `world-map.jpg` | Full equirectangular world map, dark/satellite or antique paper style. 3840×2160 or larger. | Natural Earth, MapTiler, or a clean Mercator PNG. For a documentary look, use a muted-color physical map. |
| `west-africa-map.jpg` | West Africa region map showing Guinea, Liberia, Sierra Leone, Ghana, Nigeria etc. Same style as world map. 2560×1440+. | Crop from the world map, or use a region-specific export from MapTiler/Google Maps static API. |
| `sierra-leone-map.jpg` | Sierra Leone close-up with Freetown clearly visible in the west. The red circle SVG is drawn at approximately 38% x, 54% y of this image. Adjust `Beat1Map.tsx` if your image centers Freetown differently. 1920×1080+. | OpenStreetMap export, Felt.com, or Google Maps screenshot. |

## Optional Logo (Beat 6)

| File | Description |
|------|-------------|
| `slppna-logo.png` | SLPPNA logo with transparent background. If omitted, the fallback monogram "SL" circle renders. |

## Fonts (loaded via Google Fonts CDN in Remotion Studio)

Remotion loads web fonts automatically if you call `loadFont()` or add a `<style>` tag.
The components reference:
- `'Playfair Display'` — serif display — https://fonts.google.com/specimen/Playfair+Display
- `'Inter'` — clean sans-serif — https://fonts.google.com/specimen/Inter

To embed fonts locally (for offline render), download the .woff2 files and add:

```
public/
  fonts/
    PlayfairDisplay-Bold.woff2
    PlayfairDisplay-Black.woff2
    Inter-Regular.woff2
    Inter-SemiBold.woff2
    Inter-Bold.woff2
```

Then import `./fonts.css` from `src/index.tsx`.

## Audio Cues Reference

The following timestamps are marked with `// AUDIO CUE` comments throughout the code.
Map these to your sound effects in your DAW or video editor after export.

| Absolute time | Component | Suggested SFX |
|--------------|-----------|---------------|
| ~3.5 s (frame 105) | Beat1Map | Marker/pen scratch as red circle draws |
| ~6 s (frame 180) | DebateIntro FilmBurn | Whoosh + film cut |
| ~6 s (frame 180+) | Beat2TitleCard | Stamp/typewriter hit per word (×3) |
| ~15 s (frame 450) | DebateIntro FilmBurn | Whoosh + film cut |
| ~21.7 s (frame 650) | Beat3Motion | Red marker squeak |
| ~24.3 s (frame 730) | Beat3Motion | Blue marker squeak |
| ~28 s (frame 840) | DebateIntro FilmBurn | Hard cut thud |
| ~28 s (frame 840) | Beat4Split | Film projector flicker |
| ~28.5 s | Beat4Split | Slam as left panel enters |
| ~29 s | Beat4Split | Slam as right panel enters |
| ~38 s (frame 1140) | DebateIntro FilmBurn | Hard cut thud |
| ~39.7 s (localFrame 20) | Beat5Polaroids Card 1 | Heavy thud |
| ~43 s (localFrame 65) | Beat5Polaroids Card 2 | Heavy thud |
| ~46.3 s (localFrame 110) | Beat5Polaroids Card 3 | Heavy thud |
| ~50 s (frame 1500) | DebateIntro FilmBurn | Soft whoosh |
| ~51.5 s | Beat6EndCard | Deep bass hit as "DEBATE" letters lock in |
| ~58 s | Beat6EndCard | Music/SFX fades to silence with black |
