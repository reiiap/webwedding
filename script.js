const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const burger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileNav");
const menuClose = document.querySelector("[data-menu-close]");
const mq = window.matchMedia("(max-width: 980px)");

const setMenuState = (isOpen) => {
  burger?.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) {
    mobileMenu?.classList.remove("closing");
    mobileMenu?.classList.add("open");
  } else if (mobileMenu?.classList.contains("open")) {
    mobileMenu.classList.add("closing");
    window.setTimeout(() => mobileMenu.classList.remove("closing"), 430);
    mobileMenu.classList.remove("open");
  }
  mobileMenu?.setAttribute("aria-hidden", String(!isOpen));
  document.body.classList.toggle("menu-open", isOpen);
};

if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    const shouldOpen = burger.getAttribute("aria-expanded") !== "true";
    requestAnimationFrame(() => setMenuState(shouldOpen));
  });

  mobileMenu.addEventListener("click", (event) => {
    if (
      event.target === mobileMenu ||
      event.target instanceof HTMLAnchorElement
    ) {
      requestAnimationFrame(() => setMenuState(false));
    }
  });

  menuClose?.addEventListener("click", () => {
    requestAnimationFrame(() => setMenuState(false));
  });

  mq.addEventListener("change", (event) => {
    if (!event.matches) setMenuState(false);
  });
}

const slides = [...document.querySelectorAll("[data-slide]")];
const dotsWrap = document.querySelector("[data-slider-dots]");
let activeSlide = 0;
let sliderTimer;

const renderSlide = (index) => {
  if (!slides.length) return;
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) =>
    slide.classList.toggle("active", slideIndex === activeSlide),
  );
  dotsWrap
    ?.querySelectorAll("button")
    .forEach((dot, dotIndex) =>
      dot.classList.toggle("active", dotIndex === activeSlide),
    );
};

const startSlider = () => {
  if (slides.length < 2) return;
  clearInterval(sliderTimer);
  sliderTimer = setInterval(() => renderSlide(activeSlide + 1), 5000);
};

if (slides.length && dotsWrap) {
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Lihat slide ${index + 1}`);
    dot.addEventListener("click", () => {
      renderSlide(index);
      startSlider();
    });
    dotsWrap.appendChild(dot);
  });
  document
    .querySelector("[data-slider-prev]")
    ?.addEventListener("click", () => {
      renderSlide(activeSlide - 1);
      startSlider();
    });
  document
    .querySelector("[data-slider-next]")
    ?.addEventListener("click", () => {
      renderSlide(activeSlide + 1);
      startSlider();
    });
  renderSlide(0);
  startSlider();
}

const discountCountdown = document.querySelector("[data-discount-countdown]");
const promoCycleMs = 7 * 24 * 60 * 60 * 1000;
const promoEpoch = Date.UTC(2026, 0, 1, 0, 0, 0);
const updateDiscountCountdown = () => {
  if (!discountCountdown) return;
  const now = Date.now();
  const elapsed =
    (((now - promoEpoch) % promoCycleMs) + promoCycleMs) % promoCycleMs;
  const remaining = promoCycleMs - elapsed;
  const values = [
    Math.floor(remaining / 86400000),
    Math.floor((remaining / 3600000) % 24),
    Math.floor((remaining / 60000) % 60),
    Math.floor((remaining / 1000) % 60),
  ];
  discountCountdown.querySelectorAll("strong").forEach((item, index) => {
    item.textContent = String(values[index] ?? 0).padStart(2, "0");
  });
};
updateDiscountCountdown();
setInterval(updateDiscountCountdown, 1000);

const categoryTabs = document.querySelectorAll("[data-category-tab]");
const categoryPanels = document.querySelectorAll("[data-category-panel]");
categoryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const category = tab.dataset.categoryTab;
    categoryTabs.forEach((item) =>
      item.classList.toggle("active", item === tab),
    );
    categoryPanels.forEach((panel) =>
      panel.classList.toggle(
        "active",
        panel.dataset.categoryPanel === category,
      ),
    );
  });
});

const accordionButtons = document.querySelectorAll("[data-accordion]");
accordionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".accordion-item");
    if (!item) return;
    const isActive = item.classList.contains("active");
    document
      .querySelectorAll(".accordion-item")
      .forEach((entry) => entry.classList.remove("active"));
    if (!isActive) item.classList.add("active");
  });
});

document
  .querySelectorAll(
    ".benefit-card, .package-item, .testimonial-card, .portfolio-card, .trust-item",
  )
  .forEach((item, index) => {
    item.style.setProperty("--stagger", String(index % 4));
  });

const parallaxItem = document.querySelector("[data-parallax]");
if (
  parallaxItem &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  let ticking = false;
  const updateParallax = () => {
    const offset = Math.min(window.scrollY * 0.035, 18);
    parallaxItem.style.transform = `translate3d(0, ${offset}px, 0)`;
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    },
    { passive: true },
  );
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealItems.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  revealItems.forEach((item) => io.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}
