/* ==========================================================================
   VALAKI EXPORTS — app entry
   Imports global styles, then boots each feature. Every mount* is a no-op
   on pages that don't contain its target elements, so one bundle serves all
   four pages (Home / Products / About / Contact).
   ========================================================================== */

import "./styles/style.css";
import { mountChrome } from "./components/chrome.ts";
import { mountScrollTop, mountReveal } from "./features/scroll.ts";
import { mountProducts } from "./features/products.ts";
import { mountContactForm } from "./features/contact.ts";
import { mountCertFallbacks } from "./features/certs.ts";

const boot = () => {
  mountChrome();
  mountScrollTop();
  mountReveal();
  mountProducts();
  mountContactForm();
  mountCertFallbacks();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
