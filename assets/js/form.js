import { debounce, validateField } from "./utils.js";

/* =========================================================
   I18N
========================================================= */

const messages = {
  pl: {
    required: "To pole jest wymagane.",
    email: "Podaj poprawny adres e-mail.",
    sending: "Wysyłanie…",
    success: "Dziękuję! Wiadomość została wysłana.",
    error: "Coś poszło nie tak. Spróbuj ponownie.",
    name: "Pole nie może zawierać cyfr ani znaków specjalnych.",
    email: "Podaj poprawny adres e-mail (np. jan@firma.pl).",
    url: "Podaj poprawny adres URL (np. https://example.com).",
  

  },
  en: {
    name: "This field cannot contain numbers or special characters.",
    email: "Please enter a valid email address (e.g. john@company.com).",
    url: "Please enter a valid URL (e.g. https://example.com).",
    required: "This field is required.",
    email: "Please enter a valid email address.",
    sending: "Sending…",
    success: "Thank you! Your message has been sent.",
    error: "Something went wrong. Please try again.",
  },
};

const lang = document.documentElement.lang || "pl";
const t = messages[lang] || messages.pl;

/* =========================================================
   FORM LOGIC
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const status = form.querySelector(".form-status");
  const submitBtn = form.querySelector('button[type="submit"]');

  /* ===== AUTOSAVE ===== */
  const saveDraft = debounce(() => {
    const data = {};
    form.querySelectorAll("input, textarea").forEach((el) => {
      if (el.name) data[el.name] = el.value;
    });
    localStorage.setItem("contactDraft", JSON.stringify(data));
  }, 400);

  form.querySelectorAll("input, textarea").forEach((el) => {
    el.addEventListener("input", saveDraft);
  });

  /* restore */
  const draft = localStorage.getItem("contactDraft");
  if (draft) {
    const data = JSON.parse(draft);
    Object.entries(data).forEach(([name, value]) => {
      const field = form.querySelector(`[name="${name}"]`);
      if (field) field.value = value;
    });
  }

  /* ===== WALIDACJA POLA ===== */
  const showError = (field, code) => {
    field.setAttribute("aria-invalid", "true");

    let error = field.parentElement.querySelector(".field-error");
    if (!error) {
      error = document.createElement("p");
      error.className = "field-error";
      error.id = `${field.id}-error`;
      field.after(error);
      field.setAttribute("aria-describedby", error.id);
    }

    error.textContent = t[code];
  };

  const clearError = (field) => {
    field.removeAttribute("aria-invalid");
    const error = field.parentElement.querySelector(".field-error");
    if (error) error.remove();
  };

  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("blur", () => {
      clearError(field);
      const errorCode = validateField(field);
      if (errorCode) showError(field, errorCode);
    });
  });

  /* ===== SUBMIT ===== */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.hidden = true;

    let hasError = false;

    form.querySelectorAll("input, textarea").forEach((field) => {
      clearError(field);
      const errorCode = validateField(field);
      if (errorCode) {
        showError(field, errorCode);
        hasError = true;
      }
    });

    if (hasError) return;

    submitBtn.disabled = true;
    submitBtn.textContent = t.sending;

    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error();

      localStorage.removeItem("contactDraft");
      form.reset();
      status.textContent = t.success;
    } catch {
      status.textContent = t.error;
    }

    status.hidden = false;
    submitBtn.disabled = false;
    submitBtn.textContent = "Wyślij wiadomość";
  });
});
