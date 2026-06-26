/* ==========================================================================
   PRODUCTS PAGE — category chips, search, gradient-plate grid, detail modal
   ========================================================================== */

import { PRODUCTS, CATEGORIES, type Product } from "../data/products.ts";
import { esc } from "../utils/dom.ts";

const fillStyle = (p: Product) =>
  `position:absolute;inset:0;background:linear-gradient(152deg, ${p.g1}, ${p.g2})`;
const figureOf = (p: Product) => String(PRODUCTS.indexOf(p) + 1).padStart(2, "0");

/** Wire up the product catalog (only runs on the Products page). */
export function mountProducts(): void {
  const root = document.getElementById("products-app");
  if (!root) return;

  const grid = root.querySelector<HTMLElement>("#product-grid")!;
  const chipsWrap = root.querySelector<HTMLElement>("#product-chips")!;
  const search = root.querySelector<HTMLInputElement>("#product-search")!;
  const clearBtn = root.querySelector<HTMLButtonElement>("#search-clear")!;
  const countEl = root.querySelector<HTMLElement>("#result-count")!;
  const emptyEl = root.querySelector<HTMLElement>("#empty-state")!;
  const resetBtn = root.querySelector<HTMLButtonElement>("#reset-filters")!;

  const modal = document.getElementById("product-modal")!;

  let cat = "all";
  let q = "";

  const filtered = (): Product[] => {
    const query = q.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => cat === "all" || p.cat === cat);
    if (query) {
      list = list.filter((p) =>
        (p.name + " " + p.catLabel + " " + p.forms.join(" ") + " " + p.hs + " " + p.desc)
          .toLowerCase()
          .includes(query)
      );
    }
    return list;
  };

  const renderChips = () => {
    chipsWrap.innerHTML = CATEGORIES.map((c) => {
      const active = cat === c.id;
      const count = c.id === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.cat === c.id).length;
      const base =
        "display:inline-flex;align-items:center;gap:7px;font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;padding:10px 17px;border-radius:999px;cursor:pointer;transition:all .15s var(--ease-out);";
      const skin = active
        ? "background:var(--ocean-600);color:#fff;border:1px solid var(--ocean-600)"
        : "background:#fff;color:var(--text-body);border:1px solid var(--border-default)";
      return `<button data-cat="${c.id}" style="${base}${skin}">${esc(c.label)} <span style="opacity:.6">${count}</span></button>`;
    }).join("");
  };

  const renderGrid = () => {
    const list = filtered();
    countEl.textContent = `${list.length} products`;
    clearBtn.style.display = q ? "block" : "none";
    if (!list.length) {
      grid.innerHTML = "";
      emptyEl.style.display = "block";
      return;
    }
    emptyEl.style.display = "none";
    grid.innerHTML = list
      .map((p) => {
        const formsLine = p.forms.join("  ·  ");
        return `
        <button class="pcard" data-id="${p.id}" style="display:flex;flex-direction:column;text-align:left;padding:0;border:1px solid var(--border-default);border-radius:18px;overflow:hidden;background:#fff;cursor:pointer">
          <div style="position:relative;aspect-ratio:4/3;overflow:hidden">
            <div style="${fillStyle(p)}"></div>
            <div style="position:absolute;inset:0;background-image:radial-gradient(circle, rgba(255,255,255,.12) 1.1px, transparent 1.3px);background-size:13px 13px"></div>
            <div style="position:absolute;inset:0;background:linear-gradient(to bottom, rgba(5,20,31,.34), transparent 46%)"></div>
            <span style="position:absolute;right:12px;top:-12px;font-family:var(--font-display);font-weight:700;font-size:74px;line-height:1;color:rgba(255,255,255,.2);letter-spacing:-.04em">${figureOf(p)}</span>
            <span style="position:absolute;left:16px;top:14px;font-family:var(--font-mono);font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:rgba(255,255,255,.92)">${esc(p.catLabel)}</span>
          </div>
          <div style="padding:18px 20px 20px;display:flex;flex-direction:column;gap:9px;flex:1">
            <span style="font-family:var(--font-display);font-weight:700;font-size:18px;line-height:1.18;color:var(--text-strong)">${esc(p.name)}</span>
            <span style="font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-muted)">${esc(formsLine)}</span>
            <span style="margin-top:auto;padding-top:12px;border-top:1px solid var(--border-subtle);font-family:var(--font-mono);font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:var(--ocean-700)">HS ${esc(p.hs)} · ${esc(p.moisture)}</span>
          </div>
        </button>`;
      })
      .join("");
  };

  const closeModal = () => {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  };

  const openModal = (id: string) => {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    const formsBadges = p.forms
      .map((f) => `<span class="ve-badge ve-badge--sm ve-badge--info">${esc(f)}</span>`)
      .join("");
    const specIcon = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3l9 9l-9 9l-9-9z"/></svg>`;
    const specRows = Object.entries(p.specs)
      .map(
        ([k, v]) => `<tr><th><span class="k">${specIcon}${esc(k)}</span></th><td>${esc(v)}</td></tr>`
      )
      .join("");
    modal.querySelector(".pmodal__card")!.innerHTML = `
      <button class="pmodal__close" aria-label="Close">&times;</button>
      <div class="pmodal__grid">
        <div class="pmodal__art">
          <div style="${fillStyle(p)}"></div>
          <div style="position:absolute;inset:0;background-image:radial-gradient(circle, rgba(255,255,255,.12) 1.2px, transparent 1.4px);background-size:15px 15px"></div>
          <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(5,20,31,.45), transparent 55%)"></div>
          <span style="position:absolute;left:20px;top:16px;font-family:var(--font-mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.9)">Fig. ${figureOf(p)} — ${esc(p.catLabel)}</span>
          <span style="position:absolute;left:18px;bottom:-14px;font-family:var(--font-display);font-weight:700;font-size:120px;line-height:1;color:rgba(255,255,255,.2)">${figureOf(p)}</span>
        </div>
        <div style="padding:32px 34px 34px">
          <span style="font-family:var(--font-mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--ocean-600)">${esc(p.catLabel)}</span>
          <h3 style="font-family:var(--font-display);font-weight:700;font-size:28px;line-height:1.1;letter-spacing:-.01em;color:var(--text-strong);margin:8px 0 12px">${esc(p.name)}</h3>
          <p style="font-family:var(--font-body);font-size:15px;line-height:1.6;color:var(--text-body);margin:0 0 22px">${esc(p.desc)}</p>
          <div style="font-family:var(--font-mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--text-muted);margin-bottom:9px">Available forms</div>
          <div style="display:flex;flex-wrap:wrap;gap:7px;margin-bottom:24px">${formsBadges}</div>
          <div style="font-family:var(--font-mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--text-muted);margin-bottom:10px">Technical specification</div>
          <div class="spec-table"><table><tbody>${specRows}</tbody></table></div>
          <a class="ve-btn ve-btn--accent ve-btn--md ve-btn--block" href="contact.html">Request a quote for this product</a>
        </div>
      </div>`;
    modal
      .querySelector<HTMLButtonElement>(".pmodal__close")!
      .addEventListener("click", closeModal);
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  // events
  chipsWrap.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-cat]");
    if (!btn) return;
    cat = btn.dataset.cat!;
    renderChips();
    renderGrid();
  });
  grid.addEventListener("click", (e) => {
    const card = (e.target as HTMLElement).closest<HTMLButtonElement>(".pcard");
    if (card?.dataset.id) openModal(card.dataset.id);
  });
  search.addEventListener("input", () => {
    q = search.value;
    renderGrid();
  });
  clearBtn.addEventListener("click", () => {
    q = "";
    search.value = "";
    renderGrid();
  });
  resetBtn.addEventListener("click", () => {
    cat = "all";
    q = "";
    search.value = "";
    renderChips();
    renderGrid();
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  renderChips();
  renderGrid();
}
