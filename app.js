// rok w stopce
document.getElementById("year").textContent = new Date().getFullYear();

// motyw
const themeBtn = document.getElementById("themeToggle");
const root = document.documentElement;

const zapisany = localStorage.getItem("miamve-theme");
if (zapisany) root.setAttribute("data-theme", zapisany);

themeBtn.addEventListener("click", () => {
  const ciemny = root.getAttribute("data-theme") === "dark" ||
    (!root.hasAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const nastepny = ciemny ? "light" : "dark";
  root.setAttribute("data-theme", nastepny);
  localStorage.setItem("miamve-theme", nastepny);
});

// nav — border przy scrollu
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

// animacja wejścia
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".anim").forEach((el) => observer.observe(el));
