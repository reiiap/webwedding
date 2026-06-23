const navbar = document.querySelector("[data-navbar]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

const closeMobileMenu = () => {
  menuButton?.setAttribute("aria-expanded", "false");
  mobileMenu?.classList.remove("is-open");
};

const updateNavbar = () => {
  const hero = document.querySelector(".hero");
  const navbarHeight = navbar?.offsetHeight ?? 0;
  const heroBottom = hero
    ? hero.getBoundingClientRect().bottom + window.scrollY
    : 0;
  const shouldBlur = window.scrollY >= Math.max(heroBottom - navbarHeight, 10);
  navbar?.classList.toggle("is-scrolled", shouldBlur);
};

updateNavbar();
window.addEventListener("scroll", updateNavbar, { passive: true });
window.addEventListener("resize", updateNavbar);

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  mobileMenu?.classList.toggle("is-open", !isOpen);
});

mobileMenu?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    closeMobileMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMobileMenu();
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
