/* =========================================================
   FOOTER — CURRENT YEAR (LIGHTWEIGHT + SAFE)
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
const openButtons = document.querySelectorAll(".details-btn");
const closeButtons = document.querySelectorAll(".modal-close");

openButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const modal = document.getElementById(btn.dataset.modal);
    modal.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    modal.querySelector(".modal-close").focus();
  });
});

closeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".service-modal");
    modal.hidden = true;

    const opener = document.querySelector(
      `[data-modal="${modal.id}"]`
    );
    opener.setAttribute("aria-expanded", "false");
    opener.focus();
  });
});

/* ESC = zamknij */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    document.querySelectorAll(".service-modal:not([hidden])").forEach(modal => {
      modal.hidden = true;
    });
  }
});

/* =========================================================
   DARK MODE — SMART, FAST, SEO & A11Y OPTIMIZED
========================================================= */

(function () {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  /* ---------------------------------------------------------
     1) USTALENIE TRYBU STARTOWEGO
     – najpierw localStorage
     – jeśli brak → preferencje systemowe
     – 0 DOM reflowów, szybki start
  --------------------------------------------------------- */
  const savedTheme = localStorage.getItem("theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const initialTheme =
    savedTheme || (systemDark ? "dark" : "light");

  document.body.classList.toggle("dark", initialTheme === "dark");

  /* ---------------------------------------------------------
     2) CLICK → zmiana motywu
     – minimalna operacja
     – natychmiastowa reakcja
     – zapis w localStorage
     – dobry wpływ na performance + SEO
  --------------------------------------------------------- */
  toggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // SEO + dostępność: aktualizujemy aria-label
    toggle.setAttribute(
      "aria-label",
      isDark ? "Włącz jasny motyw" : "Włącz tryb ciemny"
    );
  });

  /* ---------------------------------------------------------
     3) LISTENER preferencji systemowych
     – Lighthouse lubi to
     – strona reaguje dynamicznie
     – NIE zmieniamy localStorage (nie nadpisujemy wyboru użytkownika)
  --------------------------------------------------------- */
  window.matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      // zmieniamy tylko jeśli user nie wymusił motywu
      if (!localStorage.getItem("theme")) {
        document.body.classList.toggle("dark", e.matches);
      }
    });
})();
