/* =========================================================
   CONTACT FORM — FORMSPREE (WCAG + UX)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const status = form.querySelector(".form-status");
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async e => {
    e.preventDefault();

    // reset błędów
    form.querySelectorAll("[aria-invalid]").forEach(el => {
      el.removeAttribute("aria-invalid");
    });

    status.hidden = true;

    let hasError = false;

    form.querySelectorAll("input[required], textarea[required]").forEach(field => {
      if (!field.value.trim()) {
        field.setAttribute("aria-invalid", "true");
        hasError = true;
      }
    });

    if (hasError) {
      status.textContent = "Uzupełnij wymagane pola.";
      status.hidden = false;
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Wysyłanie…";

    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (!res.ok) throw new Error();

      form.reset();
      status.textContent = "Dziękuję! Wiadomość została wysłana.";
    } catch {
      status.textContent =
        "Coś poszło nie tak. Spróbuj ponownie lub napisz bezpośrednio.";
    }

    status.hidden = false;
    submitBtn.disabled = false;
    submitBtn.textContent = "Wyślij wiadomość";
  });
});
