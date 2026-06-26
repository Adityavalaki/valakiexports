/* ==========================================================================
   SCROLL BEHAVIOURS — scroll-to-top button + scroll-reveal entrances
   ========================================================================== */

/** Floating "back to top" button that appears after scrolling down. */
export function mountScrollTop(): void {
  const btn = document.createElement("button");
  btn.className = "scroll-top";
  btn.setAttribute("aria-label", "Scroll to top");
  btn.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>`;
  document.body.appendChild(btn);
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  const onScroll = () => btn.classList.toggle("show", window.scrollY > 600);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/** Reveal `.reveal` elements as they enter the viewport. */
export function mountReveal(): void {
  const els = document.querySelectorAll<HTMLElement>(".reveal");
  if (!els.length) return;
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  els.forEach((el) => io.observe(el));
}
