/* ==========================================================================
   CONTACT — RFQ form submit / success toggle (client-side only)
   ========================================================================== */

/** Wire the Request-for-Quote form (only runs on the Contact page). */
export function mountContactForm(): void {
  const form = document.getElementById("rfq-form") as HTMLFormElement | null;
  if (!form) return;
  const success = document.getElementById("rfq-success")!;
  const again = document.getElementById("rfq-again");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    form.style.display = "none";
    success.style.display = "flex";
    success.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  again?.addEventListener("click", () => {
    form.reset();
    success.style.display = "none";
    form.style.display = "flex";
  });
}
