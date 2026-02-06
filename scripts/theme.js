const button = document.getElementById("theme-toggle");
const html = document.documentElement;

// Initialize from system preference or localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  html.dataset.colorMode = savedTheme;
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  html.dataset.colorMode = prefersDark ? "dark" : "light";
}

// Toggle theme on button click
button.addEventListener("click", () => {
  const current = html.dataset.colorMode;
  const next = current === "light" ? "dark" : "light";
  html.dataset.colorMode = next;
  localStorage.setItem("theme", next);
});
