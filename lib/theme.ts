export function toggleTheme() {
  const el = document.documentElement;
  let cur = el.getAttribute("data-theme");
  if (!cur) cur = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const next = cur === "dark" ? "light" : "dark";
  el.setAttribute("data-theme", next);
  try { localStorage.setItem("th", next); } catch (e) {}
}
