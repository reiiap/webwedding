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

const testimonialSlider = document.querySelector("[data-testimonial-slider]");
const testimonialTrack = document.querySelector("[data-testimonial-track]");
const testimonialPrev = document.querySelector("[data-testimonial-prev]");
const testimonialNext = document.querySelector("[data-testimonial-next]");

if (testimonialSlider && testimonialTrack) {
  const cards = Array.from(testimonialTrack.children);
  let activeIndex = 0;
  let autoSlideTimer;

  const getVisibleCards = () => (window.matchMedia("(max-width: 920px)").matches ? 1 : 3);
  const getMaxIndex = () => Math.max(cards.length - getVisibleCards(), 0);

  const updateTestimonials = () => {
    activeIndex = Math.min(activeIndex, getMaxIndex());
    const firstCard = cards[0];
    const gap = Number.parseFloat(getComputedStyle(testimonialTrack).gap) || 0;
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width + gap : 0;
    testimonialTrack.style.transform = `translateX(-${activeIndex * cardWidth}px)`;
  };

  const goToTestimonial = (direction) => {
    const maxIndex = getMaxIndex();
    activeIndex = activeIndex + direction;
    if (activeIndex > maxIndex) activeIndex = 0;
    if (activeIndex < 0) activeIndex = maxIndex;
    updateTestimonials();
  };

  const startAutoSlide = () => {
    window.clearInterval(autoSlideTimer);
    autoSlideTimer = window.setInterval(() => goToTestimonial(1), 4200);
  };

  testimonialPrev?.addEventListener("click", () => {
    goToTestimonial(-1);
    startAutoSlide();
  });

  testimonialNext?.addEventListener("click", () => {
    goToTestimonial(1);
    startAutoSlide();
  });

  testimonialSlider.addEventListener("mouseenter", () => window.clearInterval(autoSlideTimer));
  testimonialSlider.addEventListener("mouseleave", startAutoSlide);
  window.addEventListener("resize", updateTestimonials);
  updateTestimonials();
  startAutoSlide();
}

const countdown = document.querySelector("[data-discount-countdown]");
if (countdown) {
  const cycleMs = 7 * 24 * 60 * 60 * 1000;
  const baseTime = Date.UTC(2026, 0, 1, 0, 0, 0);
  const daysEl = countdown.querySelector("[data-countdown-days]");
  const hoursEl = countdown.querySelector("[data-countdown-hours]");
  const minutesEl = countdown.querySelector("[data-countdown-minutes]");
  const secondsEl = countdown.querySelector("[data-countdown-seconds]");
  const pad = (value) => String(value).padStart(2, "0");

  const updateCountdown = () => {
    const elapsed = Date.now() - baseTime;
    const remaining = cycleMs - (elapsed % cycleMs || cycleMs);
    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (daysEl) daysEl.textContent = pad(days);
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minutesEl) minutesEl.textContent = pad(minutes);
    if (secondsEl) secondsEl.textContent = pad(seconds);
  };

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
}
