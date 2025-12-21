/* =========================================================
   DARK MODE — SIMPLE & RELIABLE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  // start: localStorage albo light
  const saved = localStorage.getItem("theme");
  const isDark = saved === "dark";

  document.body.classList.toggle("dark", isDark);

  toggle.addEventListener("click", () => {
    const enabled = document.body.classList.toggle("dark");
    localStorage.setItem("theme", enabled ? "dark" : "light");
  });
});
