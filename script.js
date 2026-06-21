const burger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

const header = document.querySelector(".site-header");
const syncHeaderState = () => {
  header?.classList.toggle("scrolled", window.scrollY > 12);
};
syncHeaderState();
window.addEventListener("scroll", syncHeaderState, { passive: true });


const closeMenu = () => {
  burger?.setAttribute("aria-expanded", "false");
  mobileNav?.setAttribute("aria-hidden", "true");
  mobileNav?.classList.remove("open");
};

burger?.addEventListener("click", () => {
  const isOpen = burger.getAttribute("aria-expanded") === "true";
  burger.setAttribute("aria-expanded", String(!isOpen));
  mobileNav?.setAttribute("aria-hidden", String(isOpen));
  mobileNav?.classList.toggle("open", !isOpen);
});

mobileNav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) closeMenu();
});

const revealItems = document.querySelectorAll(".reveal");
revealItems.forEach((item, index) => item.style.setProperty("--stagger", index % 4));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -32px 0px" },
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}
