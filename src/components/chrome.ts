/* ==========================================================================
   SITE CHROME — shared nav + footer, injected into every page
   ========================================================================== */

// Tabler-style nav icons (outline, round joins)
const navIcons: Record<string, string> = {
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l-2 0l9 -9l9 9l-2 0"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"/><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"/></svg>`,
  products: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 4.5v9l-8 4.5l-8 -4.5v-9z"/><path d="M12 12l8 -4.5"/><path d="M12 12v9"/><path d="M12 12l-8 -4.5"/></svg>`,
  about: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"/><path d="M12 9h.01"/><path d="M11 12h1v4h1"/></svg>`,
  contact: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"/><path d="M3 7l9 6l9 -6"/></svg>`,
};

// Outline social / marketplace icon buttons (footer)
const socialRowHTML = `
<div class="icon-row">
  <a class="icon-btn icon-btn--linkedin" href="https://www.linkedin.com/company/valaki-exports" target="_blank" rel="noopener" aria-label="Valaki Exports on LinkedIn" title="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
  <a class="icon-btn icon-btn--instagram" href="https://www.instagram.com/valakiexports" target="_blank" rel="noopener" aria-label="Valaki Exports on Instagram" title="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg></a>
  <a class="icon-btn icon-btn--whatsapp" href="https://wa.me/919876543210" target="_blank" rel="noopener" aria-label="Chat with Valaki Exports on WhatsApp" title="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.488 1.449 5.421 1.451 5.441.002 9.869-4.417 9.872-9.861.002-2.638-1.023-5.118-2.883-6.98-1.859-1.861-4.336-2.885-6.977-2.885-5.45 0-9.879 4.417-9.882 9.864-.001 1.93.502 3.818 1.457 5.418l-.994 3.634 3.737-.981zm11.376-7.838c-.3-.15-1.772-.875-2.046-.975-.276-.102-.476-.151-.676.15-.2.3-.775.975-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.414-1.492-.893-.797-1.496-1.782-1.672-2.08-.175-.3-.019-.462.13-.611.135-.134.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.628-.926-2.228-.244-.589-.493-.51-.676-.519-.173-.009-.371-.01-.57-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.224 5.112 4.521.714.308 1.272.493 1.707.632.716.228 1.368.196 1.883.118.574-.087 1.772-.725 2.021-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/></svg></a>
  <a class="icon-btn icon-btn--indiamart" href="https://www.indiamart.com/valaki-exports/" target="_blank" rel="noopener" aria-label="Valaki Exports on IndiaMART" title="IndiaMART"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l1.6-5h14.8L21 9"/><path d="M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9"/><path d="M3 9h18"/><path d="M9.5 20v-6h5v6"/></svg></a>
</div>`;

const navHTML = `
<header class="site-header">
  <div class="navpill">
    <a class="navpill__logo" href="index.html" aria-label="Valaki Exports Co. home">
      <img src="/images/logo/logo-full.png" alt="Valaki Exports Co." />
    </a>
    <nav class="navpill__menu" aria-label="Primary">
      <a class="navlink" data-nav="home" href="index.html">${navIcons.home}<span>Home</span></a>
      <a class="navlink" data-nav="products" href="products.html">${navIcons.products}<span>Products</span></a>
      <a class="navlink" data-nav="about" href="about.html">${navIcons.about}<span>About</span></a>
      <a class="navlink" data-nav="contact" href="contact.html">${navIcons.contact}<span>Contact</span></a>
    </nav>
    <div class="navpill__right">
      <a class="ve-btn ve-btn--primary ve-btn--md navpill__cta" href="contact.html">Request a Quote</a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span class="bar"></span><span class="bar"></span><span class="bar"></span>
      </button>
    </div>
  </div>
</header>
<div class="drawer-backdrop" id="drawer-backdrop"></div>
<aside class="mobile-drawer" aria-label="Mobile">
  <a class="navlink" data-nav="home" href="index.html">${navIcons.home}<span>Home</span></a>
  <a class="navlink" data-nav="products" href="products.html">${navIcons.products}<span>Products</span></a>
  <a class="navlink" data-nav="about" href="about.html">${navIcons.about}<span>About</span></a>
  <a class="navlink" data-nav="contact" href="contact.html">${navIcons.contact}<span>Contact</span></a>
  <a class="ve-btn ve-btn--primary ve-btn--lg ve-btn--block" href="contact.html">Request a Quote</a>
</aside>`;

const footerHTML = `
<footer class="site-footer">
  <div class="footer-grid">
    <div>
      <span class="footer-logo"><img src="/images/logo/logo-full.png" alt="Valaki Exports Co." /></span>
      <p class="f-desc">Export-grade dehydrated onion, garlic, vegetables and spices. A Valaki Brothers company, manufacturing with Euro Foods Industries since 1987.</p>
      <div class="footer-social">${socialRowHTML}</div>
    </div>
    <div>
      <h4>Navigate</h4>
      <a class="flink" href="index.html">Home</a>
      <a class="flink" href="products.html">Products</a>
      <a class="flink" href="about.html">About</a>
      <a class="flink" href="contact.html">Contact</a>
    </div>
    <div>
      <h4>Range</h4>
      <span class="f-item">Dehydrated Onion</span>
      <span class="f-item">Dehydrated Garlic</span>
      <span class="f-item">Spices &amp; Chilli</span>
      <span class="f-item">Seeds &amp; Pastes</span>
    </div>
    <div>
      <h4>Contact</h4>
      <p class="f-contact">Valaki Exports Co.,<br/>Ahmedabad, Gujarat, India<br/>export@valakiexports.com<br/>+91 98765 43210</p>
    </div>
  </div>
  <div class="footer-bottom">
    <span>&copy; 2026 Valaki Exports Co.&trade; · All rights reserved · Made in India</span>
    <span class="footer-credit">Designed &amp; built by <a href="https://adityavalaki.vercel.app/" target="_blank" rel="noopener">Aditya Valaki</a></span>
  </div>
</footer>`;

/** Inject nav + footer, wire active link, mobile drawer, and sticky-header state. */
export function mountChrome(): void {
  const navSlot = document.getElementById("site-nav");
  const footSlot = document.getElementById("site-footer");
  if (navSlot) navSlot.innerHTML = navHTML;
  if (footSlot) footSlot.innerHTML = footerHTML;

  // active link
  const page = document.body.dataset.page;
  if (page) {
    document
      .querySelectorAll<HTMLAnchorElement>(`.navlink[data-nav="${page}"]`)
      .forEach((a) => a.classList.add("is-active"));
  }

  // mobile drawer
  const toggle = document.getElementById("nav-toggle");
  const backdrop = document.getElementById("drawer-backdrop");
  const close = () => {
    document.body.classList.remove("nav-open");
    toggle?.setAttribute("aria-expanded", "false");
  };
  toggle?.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  backdrop?.addEventListener("click", close);
  document.querySelectorAll(".mobile-drawer a").forEach((a) => a.addEventListener("click", close));

  // refined sticky header: subtle shadow once scrolled
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
}
