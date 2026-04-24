import React, { useEffect, useRef } from 'react';
import { continueRender, delayRender, staticFile } from 'remotion';

// Loads fonts from /public/localFonts.css (which points to /public/fonts/*.woff2).
// Uses delayRender so Remotion pauses frame rendering until all fonts are ready.
// Mount this once at the top of DebateIntro_Group2 — outside all Sequences.
export const LocalFontLoader: React.FC = () => {
  const handle = useRef(delayRender('Loading local fonts'));

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = staticFile('localFonts.css');
    document.head.appendChild(link);

    // Wait for the stylesheet to parse, then check font readiness
    link.onload = () => {
      Promise.all([
        document.fonts.load('700 1em "Playfair Display"'),
        document.fonts.load('900 1em "Playfair Display"'),
        document.fonts.load('400 1em "Inter"'),
        document.fonts.load('700 1em "Inter"'),
        document.fonts.load('400 1em "Caveat"'),
        document.fonts.load('700 1em "Caveat"'),
      ])
        .catch(() => {}) // graceful degradation — system fallback fonts still work
        .finally(() => {
          continueRender(handle.current);
        });
    };

    // Fallback: if link fails to load, continue anyway with system fonts
    link.onerror = () => {
      continueRender(handle.current);
    };
  }, []);

  return null;
};
