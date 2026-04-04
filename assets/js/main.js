document.addEventListener("DOMContentLoaded", () => {
  /*==================== MENU SHOW & HIDDEN ====================*/
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.add("show-menu");
    });
  }

  if (navClose) {
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
    });
  }

  /*==================== REMOVE MENU ON LINK CLICK ====================*/
  document.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu) navMenu.classList.remove("show-menu");
    });
  });

  /*==================== SCROLL ACTIVE LINK ====================*/
  const sections = document.querySelectorAll("section[id]");

  function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 80;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(
        `.nav__menu a[href*="${sectionId}"]`,
      );

      if (!navLink) return;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLink.classList.add("active-link");
      } else {
        navLink.classList.remove("active-link");
      }
    });
  }
  window.addEventListener("scroll", scrollActive);

  /*==================== SCROLL UP BUTTON ====================*/
  const scrollUpBtn = document.getElementById("scroll-up");

  function handleScrollUp() {
    if (!scrollUpBtn) return;
    scrollUpBtn.classList.toggle("show-scroll", window.scrollY >= 400);
  }
  window.addEventListener("scroll", handleScrollUp);

  /*==================== SKILLS ACCORDION ====================*/
  const skillsContents = document.querySelectorAll(".skills__content");
  const skillsHeaders = document.querySelectorAll(".skills__header");

  skillsHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const parent = this.closest(".skills__content");
      const isOpen = parent.classList.contains("skills__open");

      skillsContents.forEach((content) => {
        content.classList.remove("skills__open");
        content.classList.add("skills__close");
      });

      if (!isOpen) {
        parent.classList.add("skills__open");
        parent.classList.remove("skills__close");
      }
    });
  });

  /*==================== PORTFOLIO FILTER ====================*/
  const filterBtns = document.querySelectorAll(".portfolio__filter-btn");
  const portfolioCards = document.querySelectorAll(".portfolio__card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      portfolioCards.forEach((card) => {
        if (filter === "all" || card.dataset.type === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  /*==================== FADE-UP ANIMATION ON SCROLL ====================*/
  const fadeElements = document.querySelectorAll(".fade-up");

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  fadeElements.forEach((el) => fadeObserver.observe(el));

  /*==================== DARK / LIGHT THEME ====================*/
  const themeButton = document.getElementById("theme-button");
  const lightTheme = "light-theme";
  const iconLight = "uil-sun";
  const iconDark = "uil-moon";

  const savedTheme = localStorage.getItem("selected-theme");

  if (savedTheme === "light") {
    document.body.classList.add(lightTheme);
    if (themeButton) {
      themeButton.classList.remove(iconDark);
      themeButton.classList.add(iconLight);
    }
  }

  function getCurrentTheme() {
    return document.body.classList.contains(lightTheme) ? "light" : "dark";
  }

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      document.body.classList.toggle(lightTheme);

      const isLight = document.body.classList.contains(lightTheme);
      themeButton.classList.toggle(iconLight, isLight);
      themeButton.classList.toggle(iconDark, !isLight);

      localStorage.setItem("selected-theme", getCurrentTheme());
      localStorage.setItem("selected-icon", isLight ? iconLight : iconDark);
    });
  }
}); // end DOMContentLoaded
