// YEAR
document.getElementById("year").textContent = new Date().getFullYear();

// THEME TOGGLE
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

const saved = localStorage.getItem("miamve-theme");
if (saved) root.setAttribute("data-theme", saved);

themeToggle.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark" ||
    (!root.hasAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const next = isDark ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("miamve-theme", next);
});

// NAV SCROLL
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// REVEAL
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// MOCK WINDOW - delikatny tilt na myszce (tylko hero)
const mock = document.querySelector(".hero-mock .mock-window");
if (mock && window.matchMedia("(pointer: fine)").matches) {
  const wrap = document.querySelector(".hero-mock");
  wrap.addEventListener("mousemove", (e) => {
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    mock.style.transform = `rotateX(${6 - y * 8}deg) rotateY(${x * 8}deg)`;
    mock.style.transition = "transform .15s ease-out";
  });
  wrap.addEventListener("mouseleave", () => {
    mock.style.transform = "rotateX(6deg) rotateY(0)";
    mock.style.transition = "transform .6s cubic-bezier(.22,.61,.36,1)";
  });
}
