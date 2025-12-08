// ===================================
// STOPKA – aktualny rok
// ===================================
(function () {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();

// ===================================
// DARK MODE – TOGGLE + SYSTEM + MEMORY
// ===================================

// Uchwyt do przełącznika
const toggle = document.getElementById("themeToggle");

// Jeśli z jakiegoś powodu toggle nie istnieje – zatrzymujemy
if (!toggle) {
  console.warn("Brak elementu #themeToggle");
} else {

  // Odczyt z localStorage
  const userTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Ustawienie wstępne
  if (userTheme === "dark" || (!userTheme && systemPrefersDark)) {
    document.body.classList.add("dark");
  }

  // Kliknięcie przełącznika
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const newTheme = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
  });
}