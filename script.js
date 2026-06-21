const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const header = document.querySelector("[data-header]");
const updateHeaderState = () => header?.classList.toggle("scrolled", window.scrollY > 10);
updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

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

const promoCountdown = document.querySelector("[data-promo-countdown]");
const promoCycleMs = 7 * 24 * 60 * 60 * 1000;
const promoStorageKey = "promo_start";

const getPromoStart = () => {
  const stored = Number(window.localStorage.getItem(promoStorageKey));
  const now = Date.now();
  if (!Number.isFinite(stored) || stored <= 0 || now - stored > promoCycleMs) {
    window.localStorage.setItem(promoStorageKey, String(now));
    return now;
  }
  return stored;
};

let promoStart = promoCountdown ? getPromoStart() : 0;
let previousPromoValues = [];
const updatePromoCountdown = () => {
  if (!promoCountdown) return;
  const now = Date.now();
  if (now - promoStart > promoCycleMs) {
    promoStart = now;
    window.localStorage.setItem(promoStorageKey, String(promoStart));
  }
  const remaining = Math.max(0, promoCycleMs - (now - promoStart));
  const values = [
    Math.floor(remaining / 86400000),
    Math.floor((remaining / 3600000) % 24),
    Math.floor((remaining / 60000) % 60),
    Math.floor((remaining / 1000) % 60),
  ];
  ["days", "hours", "minutes", "seconds"].forEach((unit, index) => {
    const item = promoCountdown.querySelector(`[data-${unit}]`);
    if (!item) return;
    const nextValue = String(values[index] ?? 0).padStart(2, "0");
    if (item.textContent !== nextValue) {
      item.textContent = nextValue;
      item.classList.toggle("tick", previousPromoValues[index] !== values[index]);
      window.setTimeout(() => item.classList.remove("tick"), 180);
    }
  });
  previousPromoValues = values;
};
updatePromoCountdown();
setInterval(updatePromoCountdown, 1000);

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
  .querySelectorAll(".benefit-card, .package-item, .testimonial-card")
  .forEach((item, index) => {
    item.style.setProperty("--stagger", String(index % 4));
  });

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
