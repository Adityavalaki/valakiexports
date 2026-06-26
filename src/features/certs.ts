/* ==========================================================================
   CERTIFICATES — image fallback (shows the name when a logo is missing).
   Replaces inline onerror handlers so a strict CSP can be used.
   ========================================================================== */

/** Swap a broken certificate logo for its text placeholder. */
export function mountCertFallbacks(): void {
  const imgs = document.querySelectorAll<HTMLImageElement>(".cert-frame__img img");
  imgs.forEach((img) => {
    const fail = () => {
      img.style.display = "none";
      const ph = img.nextElementSibling as HTMLElement | null;
      if (ph) ph.style.display = "flex";
    };
    img.addEventListener("error", fail);
    // handle images that already failed before this script ran
    if (img.complete && img.naturalWidth === 0) fail();
  });
}
