

/* =========================================================
   SINGLE STATIC POPUP
========================================================= */

const modal = document.getElementById("service-modal");
const closeBtn = modal.querySelector(".modal-close");
let lastOpener = null;

document.querySelectorAll(".card-link").forEach(btn => {
  btn.addEventListener("click", () => {
    lastOpener = btn;
    modal.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    closeBtn.focus();
  });
});

closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !modal.hidden) {
    closeModal();
  }
});

function closeModal() {
  modal.hidden = true;
  if (lastOpener) {
    lastOpener.setAttribute("aria-expanded", "false");
    lastOpener.focus();
  }
}

/* =========================================================
   FOCUS TRAP — WCAG
========================================================= */

function trapFocus(modal) {
  const focusable = modal.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  modal.addEventListener("keydown", e => {
    if (e.key !== "Tab") return;

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

/* podpinamy po otwarciu */
document.querySelectorAll(".card-link").forEach(btn => {
  btn.addEventListener("click", () => {
    trapFocus(document.getElementById("service-modal"));
  });
});




