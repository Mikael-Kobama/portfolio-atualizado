document.addEventListener("DOMContentLoaded", () => {
  /*==================== TRANSLATIONS ====================*/
  const i18n = {
    pt: {
      "nav-home": "Home",
      "nav-about": "Sobre",
      "nav-skills": "Habilidades",
      "nav-portfolio": "Portfolio",
      "nav-certs": "Certificações",
      "nav-qualification": "Formação",
      "lang-label": "EN",
      "theme-label-dark": "Tema escuro",
      "theme-label-light": "Tema claro",
    },
    en: {
      "nav-home": "Home",
      "nav-about": "About",
      "nav-skills": "Skills",
      "nav-portfolio": "Portfolio",
      "nav-certs": "Certs",
      "nav-qualification": "Education",
      "lang-label": "PT",
      "theme-label-dark": "Dark theme",
      "theme-label-light": "Light theme",
    },
  };

  let currentLang = localStorage.getItem("selected-lang") || "pt";

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem("selected-lang", lang);

    // Update html lang attr
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

    // Update all [data-pt] / [data-en] elements
    document.querySelectorAll("[data-pt][data-en]").forEach((el) => {
      const val = lang === "pt" ? el.dataset.pt : el.dataset.en;
      if (val !== undefined) el.innerHTML = val;
    });

    // Update lang toggle label
    const langLabel = document.getElementById("lang-label");
    if (langLabel) langLabel.textContent = lang === "pt" ? "EN" : "PT";

    // Update page title
    document.title =
      lang === "pt"
        ? "Mikael Kobama — Dev Full Stack"
        : "Mikael Kobama — Full Stack Developer";

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content =
        lang === "pt"
          ? "Mikael Kobama — Desenvolvedor Full Stack Júnior | AWS | React | Node.js"
          : "Mikael Kobama — Junior Full Stack Developer | AWS | React | Node.js";
    }

    // Update skill names that have data-pt/en inside .skills__name
    document
      .querySelectorAll(".skills__name[data-pt][data-en]")
      .forEach((el) => {
        el.textContent = lang === "pt" ? el.dataset.pt : el.dataset.en;
      });
  }

  // Init language
  applyLang(currentLang);

  // Lang toggle button
  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      applyLang(currentLang === "pt" ? "en" : "pt");
    });
  }

  /*==================== THEME ====================*/
  const themeButton = document.getElementById("theme-button");
  const themeIcon = document.getElementById("theme-icon");
  const lightClass = "light-theme";

  function applyTheme(theme) {
    if (theme === "light") {
      document.body.classList.add(lightClass);
      if (themeIcon) {
        themeIcon.classList.remove("uil-moon");
        themeIcon.classList.add("uil-sun");
      }
      if (themeButton)
        themeButton.setAttribute(
          "aria-label",
          currentLang === "pt" ? "Ativar tema escuro" : "Enable dark theme",
        );
    } else {
      document.body.classList.remove(lightClass);
      if (themeIcon) {
        themeIcon.classList.remove("uil-sun");
        themeIcon.classList.add("uil-moon");
      }
      if (themeButton)
        themeButton.setAttribute(
          "aria-label",
          currentLang === "pt" ? "Ativar tema claro" : "Enable light theme",
        );
    }
    localStorage.setItem("selected-theme", theme);
  }

  const savedTheme = localStorage.getItem("selected-theme") || "dark";
  applyTheme(savedTheme);

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const isLight = document.body.classList.contains(lightClass);
      applyTheme(isLight ? "dark" : "light");
    });
  }

  /*==================== MOBILE MENU ====================*/
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");
  const navOverlay = document.getElementById("nav-overlay");

  function openMenu() {
    if (!navMenu) return;
    navMenu.classList.add("show-menu");
    if (navOverlay) navOverlay.classList.add("show-overlay");
    if (navToggle) navToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    if (!navMenu) return;
    navMenu.classList.remove("show-menu");
    if (navOverlay) navOverlay.classList.remove("show-overlay");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (navToggle) navToggle.addEventListener("click", openMenu);
  if (navClose) navClose.addEventListener("click", closeMenu);
  if (navOverlay) navOverlay.addEventListener("click", closeMenu);

  // Close on any nav link click (both desktop and mobile)
  document.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /*==================== ACTIVE LINK ON SCROLL ====================*/
  const sections = document.querySelectorAll("section[id]");

  function scrollActive() {
    const scrollY = window.pageYOffset;
    sections.forEach((section) => {
      const top = section.offsetTop - 90;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      // update both desktop and mobile links
      document.querySelectorAll(`.nav__link[href*="${id}"]`).forEach((link) => {
        link.classList.toggle(
          "active-link",
          scrollY >= top && scrollY < top + height,
        );
      });
    });
  }
  window.addEventListener("scroll", scrollActive, { passive: true });

  /*==================== SCROLL UP ====================*/
  const scrollUpBtn = document.getElementById("scroll-up");
  function handleScrollUp() {
    if (scrollUpBtn)
      scrollUpBtn.classList.toggle("show-scroll", window.scrollY >= 400);
  }
  window.addEventListener("scroll", handleScrollUp, { passive: true });

  /*==================== SKILLS ACCORDION ====================*/
  const skillsContents = document.querySelectorAll(".skills__content");
  const skillsHeaders = document.querySelectorAll(".skills__header");

  function animateBars(content) {
    if (content.classList.contains("animated")) return;
    content.classList.add("animated");
  }

  skillsHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const parent = this.closest(".skills__content");
      const isOpen = parent.classList.contains("skills__open");

      skillsContents.forEach((c) => {
        c.classList.remove("skills__open");
        c.classList.add("skills__close");
        this.setAttribute && this.setAttribute("aria-expanded", "false");
      });

      // Update aria-expanded on all headers
      skillsHeaders.forEach((h) => h.setAttribute("aria-expanded", "false"));

      if (!isOpen) {
        parent.classList.add("skills__open");
        parent.classList.remove("skills__close");
        this.setAttribute("aria-expanded", "true");
        // Animate bars when opened
        setTimeout(() => animateBars(parent), 50);
      }
    });

    // Keyboard support
    header.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        header.click();
      }
    });
  });

  // Animate first open accordion on load
  const firstOpen = document.querySelector(".skills__content.skills__open");
  if (firstOpen) setTimeout(() => animateBars(firstOpen), 300);

  /*==================== PORTFOLIO FILTER ====================*/
  const filterBtns = document.querySelectorAll(".portfolio__filter-btn");
  const portfolioCards = document.querySelectorAll(".portfolio__card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      let visibleCount = 0;

      portfolioCards.forEach((card) => {
        const matches = filter === "all" || card.dataset.type === filter;
        card.classList.toggle("hidden", !matches);
        if (matches) visibleCount++;
      });
    });
  });

  /*==================== FADE-UP ON SCROLL ====================*/
  const fadeEls = document.querySelectorAll(".fade-up");

  if ("IntersectionObserver" in window) {
    const fadeObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger siblings inside same parent
            const siblings =
              entry.target.parentElement.querySelectorAll(".fade-up");
            siblings.forEach((el, idx) => {
              if (el === entry.target) {
                setTimeout(() => el.classList.add("visible"), idx * 80);
              }
            });
            entry.target.classList.add("visible");
            fadeObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    fadeEls.forEach((el) => fadeObs.observe(el));
  } else {
    // Fallback
    fadeEls.forEach((el) => el.classList.add("visible"));
  }

  /*==================== SKILLS BARS ON SCROLL ====================*/
  if ("IntersectionObserver" in window) {
    const skillsObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const openContent = entry.target.querySelector(
              ".skills__content.skills__open",
            );
            if (openContent) animateBars(openContent);
            skillsObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    const skillsSection = document.getElementById("skills");
    if (skillsSection) skillsObs.observe(skillsSection);
  }

  /*==================== CERTS ANIMATION ====================*/
  if ("IntersectionObserver" in window) {
    const certsObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".certs__card").forEach((card, i) => {
              setTimeout(() => card.classList.add("visible"), i * 80);
            });
            certsObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    const certsGrid = document.querySelector(".certs__grid");
    if (certsGrid) certsObs.observe(certsGrid);
  }
}); // end DOMContentLoaded
