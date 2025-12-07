// Aktualizacja roku w stopce
(function () {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();
// ==========================
// DARK MODE – TOGGLE + SYSTEM + MEMORY
// ==========================

const toggle = document.getElementById("theme-toggle");

/* Ustawienia początkowe:
   1. Jeśli użytkownik wybrał już motyw → używamy tego
   2. Jeśli nie → sprawdzamy system (prefers-color-scheme) */
const userTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (userTheme === "dark" || (!userTheme && systemPrefersDark)) {
  document.body.classList.add("dark");
}

// Przełączanie motywu
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const newTheme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", newTheme);
});
