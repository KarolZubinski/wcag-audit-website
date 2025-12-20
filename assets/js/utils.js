/* =========================================================
   SHARED UTILS
========================================================= */

/* debounce */
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(null, args), delay);
  };
}

/* walidacja pola */
export function validateField(field) {
  const value = field.value.trim();

  /* wymagane */
  if (field.required && !value) {
    return "required";
  }

  /* imię / firma */
  if (field.name === "name" && value) {
    // tylko litery (PL), spacje, myślniki
    const nameRegex = /^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż\s-]{2,}$/;
    if (!nameRegex.test(value)) {
      return "name";
    }
  }

  /* email */
  if (field.type === "email" && value) {
    // lokalna@domena.tld (min. 2 znaki TLD)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(value)) {
      return "email";
    }
  }

  /* url */
  if (field.name === "website" && value) {
    try {
      const url = new URL(value);

      // tylko http / https
      if (!["http:", "https:"].includes(url.protocol)) {
        return "url";
      }
    } catch {
      return "url";
    }
  }
}