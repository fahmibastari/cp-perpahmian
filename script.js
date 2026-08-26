const SITE_LINKS = [
  ["home", "Home", "index.html"],
  ["work", "Work", "work.html"],
  ["services", "Services", "services.html"],
  ["about", "About", "about.html"],
  ["contact", "Contact", "contact.html"]
];

function headerMarkup(currentPage) {
  const navLinks = SITE_LINKS.map(([id, label, href], index) => {
    const current = id === currentPage ? ' aria-current="page"' : "";
    return `<a href="${href}"${current}><span>0${index + 1}</span>${label}</a>`;
  }).join("");

  return `
    <header class="site-header">
      <div class="site-header__inner">
        <a class="site-logo" href="index.html" aria-label="perpahmian.tech home">
          <img src="image/profile/Logo Icon Text Horizontal.png" width="998" height="146" alt="perpahmian.tech — Build What Matters.">
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu">
          <span>Menu</span><span class="menu-toggle__mark" aria-hidden="true"></span>
        </button>
      </div>
      <div class="site-menu" id="site-menu" aria-hidden="true">
        <div class="site-menu__top">
          <span class="site-menu__brand">perpahmian.tech</span>
          <button class="site-menu__close" type="button" aria-label="Close menu">Close</button>
        </div>
        <nav class="site-menu__nav" aria-label="Main navigation">${navLinks}</nav>
        <div class="site-menu__bottom">
          <span>Build What Matters.</span>
          <a href="mailto:perpahmian.tech@gmail.com">Email us ↗</a>
        </div>
      </div>
    </header>`;
}

function footerMarkup() {
  return `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <p class="site-footer__statement">Have a difficult product problem? <span>Let’s make it workable.</span></p>
        <a class="text-link site-footer__action" href="contact.html">Start a conversation <span aria-hidden="true">→</span></a>
        <div class="site-footer__meta">
          <span>© 2026 perpahmian.tech · Indonesia</span>
          <div class="site-footer__links">
            <a href="https://www.linkedin.com/company/perpahmian-tech/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="https://github.com/fahmibastari" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="mailto:perpahmian.tech@gmail.com">Email ↗</a>
          </div>
        </div>
      </div>
    </footer>`;
}

function mountSiteChrome() {
  const currentPage = document.body.dataset.page || "home";
  const headerTarget = document.querySelector("[data-site-header]");
  const footerTarget = document.querySelector("[data-site-footer]");
  if (headerTarget) headerTarget.innerHTML = headerMarkup(currentPage);
  if (footerTarget) footerTarget.innerHTML = footerMarkup();
}

function setupMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".site-menu");
  const close = document.querySelector(".site-menu__close");
  const main = document.querySelector("main");
  const footer = document.querySelector("[data-site-footer]");
  if (!toggle || !menu || !close) return;

  let lastFocus = null;

  function focusableItems() {
    return [...menu.querySelectorAll('a[href], button:not([disabled])')];
  }

  function openMenu() {
    lastFocus = document.activeElement;
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    if (main) main.inert = true;
    if (footer) footer.inert = true;
    close.focus({ preventScroll: true });
  }

  function closeMenu() {
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    if (main) main.inert = false;
    if (footer) footer.inert = false;
    if (lastFocus instanceof HTMLElement) lastFocus.focus({ preventScroll: true });
  }

  toggle.addEventListener("click", openMenu);
  close.addEventListener("click", closeMenu);

  menu.addEventListener("click", (event) => {
    if (event.target === menu) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (!menu.classList.contains("is-open")) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key === "Tab") {
      const items = focusableItems();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}

function projectCard(project, featured = false) {
  if (featured) {
    return `
      <article class="feature-project">
        <a class="feature-project__media" href="project.html?id=${project.id}" aria-label="View ${project.name} case study">
          <img src="${project.cover}" width="1600" height="1200" loading="lazy" alt="${project.name} product interface">
        </a>
        <div class="feature-project__body">
          <p class="feature-project__meta">${project.year} · ${project.category}</p>
          <h3>${project.name}</h3>
          <p>${project.summary}</p>
          <a class="text-link" href="project.html?id=${project.id}">View case study <span aria-hidden="true">→</span></a>
        </div>
      </article>`;
  }

  return `
    <article class="project-card" data-project-filters="${project.filters.join(" ")}">
      <a class="project-card__link" href="project.html?id=${project.id}" aria-label="View ${project.name} case study">
        <div class="project-card__media">
          <img src="${project.cover}" width="1600" height="1200" loading="lazy" alt="${project.name} product interface">
        </div>
        <div class="project-card__body">
          <div>
            <p class="project-card__meta">${project.year} · ${project.category}</p>
            <h3>${project.name}</h3>
          </div>
          <span class="project-card__arrow" aria-hidden="true">↗</span>
          <p>${project.summary}</p>
        </div>
      </a>
    </article>`;
}

function renderFeaturedProjects() {
  const target = document.querySelector("[data-featured-projects]");
  if (!target || typeof PROJECTS === "undefined") return;
  const featured = FEATURED_PROJECT_IDS.map(getProject).filter(Boolean);
  target.innerHTML = featured.map((project) => projectCard(project, true)).join("");
}

function setupHeroShowcase() {
  const link = document.querySelector("[data-hero-showcase]");
  if (!link || typeof PROJECTS === "undefined") return;

  const showcaseIds = ["worldofbooth", "flamboys", "digivass", "navaraprofile"];
  const showcase = showcaseIds.map(getProject).filter(Boolean);
  if (!showcase.length) return;

  const image = link.querySelector("[data-hero-image]");
  const title = link.querySelector("[data-hero-title]");
  const meta = link.querySelector("[data-hero-meta]");
  const count = link.querySelector("[data-hero-count]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let current = 0;
  let rotation = null;
  let isHovered = false;
  let isFocused = false;

  showcase.slice(1).forEach((project) => {
    const preload = new Image();
    preload.src = project.cover;
  });

  function showProject(index) {
    const project = showcase[index];
    link.href = `project.html?id=${project.id}`;
    link.setAttribute("aria-label", `View ${project.name} case study`);
    image.src = project.cover;
    image.alt = `${project.name} product interface`;
    title.textContent = project.name;
    meta.textContent = project.category;
    count.textContent = `${String(index + 1).padStart(2, "0")} / ${String(showcase.length).padStart(2, "0")}`;
  }

  function stopRotation() {
    window.clearInterval(rotation);
    rotation = null;
  }

  function startRotation() {
    stopRotation();
    if (reduceMotion.matches || document.hidden || isHovered || isFocused) return;
    rotation = window.setInterval(() => {
      current = (current + 1) % showcase.length;
      showProject(current);
    }, 8000);
  }

  link.addEventListener("mouseenter", () => {
    isHovered = true;
    startRotation();
  });
  link.addEventListener("mouseleave", () => {
    isHovered = false;
    startRotation();
  });
  link.addEventListener("focus", () => {
    isFocused = true;
    startRotation();
  });
  link.addEventListener("blur", () => {
    isFocused = false;
    startRotation();
  });
  reduceMotion.addEventListener("change", startRotation);
  document.addEventListener("visibilitychange", startRotation);

  showProject(current);
  startRotation();
}

function renderProjectGrid() {
  const grid = document.querySelector("[data-project-grid]");
  const status = document.querySelector("[data-filter-status]");
  if (!grid || typeof PROJECTS === "undefined") return;

  grid.innerHTML = PROJECTS.map((project) => projectCard(project)).join("");
  if (status) status.textContent = `${PROJECTS.length} projects shown`;

  const buttons = [...document.querySelectorAll("[data-filter]")];
  const cards = [...grid.querySelectorAll(".project-card")];

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      let visible = 0;
      cards.forEach((card) => {
        const matches = filter === "all" || card.dataset.projectFilters.split(" ").includes(filter);
        card.classList.toggle("is-hidden", !matches);
        if (matches) visible += 1;
      });

      if (status) status.textContent = `${visible} ${visible === 1 ? "project" : "projects"} shown`;
    });
  });
}

function renderProjectDetail() {
  const target = document.querySelector("[data-project-detail]");
  if (!target || typeof PROJECTS === "undefined") return;

  const id = new URLSearchParams(window.location.search).get("id");
  const project = getProject(id);

  if (!project) {
    target.innerHTML = `
      <section class="not-found page-shell">
        <h1>Project not found.</h1>
        <p>The requested case study is not in the current archive.</p>
        <a class="button button--ink" href="work.html">Return to work <span aria-hidden="true">→</span></a>
      </section>`;
    document.title = "Project not found — perpahmian.tech";
    return;
  }

  document.title = `${project.name} — perpahmian.tech`;
  const projectIndex = PROJECTS.findIndex((item) => item.id === project.id);
  const next = PROJECTS[(projectIndex + 1) % PROJECTS.length];
  const externalLink = project.url
    ? `<a class="button button--ink" href="${project.url}" target="_blank" rel="noreferrer">Visit live project <span aria-hidden="true">↗</span></a>`
    : "";

  const gallery = project.images.map((image, index) => `
    <figure>
      <img src="${image}" width="1600" height="1200" loading="lazy" alt="${project.name} interface view ${index + 1}">
      <figcaption>View ${String(index + 1).padStart(2, "0")} · ${project.name}</figcaption>
    </figure>`).join("");

  target.innerHTML = `
    <section class="case-hero page-shell">
      <div class="case-hero__copy reveal" style="--i: 0">
        <a class="case-back" href="work.html">← Back to work</a>
        <p class="project-meta">${project.year} · ${project.category}</p>
        <h1>${project.name}</h1>
        <p class="case-hero__summary">${project.summary}</p>
        ${externalLink}
      </div>
      <figure class="case-hero__media reveal" style="--i: 1">
        <img src="${project.cover}" width="1600" height="1200" fetchpriority="high" alt="${project.name} project cover">
      </figure>
    </section>
    <section class="case-facts page-shell" aria-label="Project facts">
      <dl>
        <div><dt>Role</dt><dd>${project.role}</dd></div>
        <div><dt>Engagement</dt><dd>${project.type}</dd></div>
        <div><dt>Timeline</dt><dd>${project.timeline}</dd></div>
        <div><dt>Year</dt><dd>${project.year}</dd></div>
      </dl>
    </section>
    <section class="case-story page-shell">
      <h2>The build</h2>
      <div class="case-story__body">
        <p>${project.description}</p>
        <ul class="tech-list" aria-label="Technology used">${project.tech.map((tech) => `<li>${tech}</li>`).join("")}</ul>
      </div>
    </section>
    <section class="project-gallery page-shell" aria-label="Project gallery">${gallery}</section>
    <section class="next-project page-shell">
      <span>Next project</span>
      <a href="project.html?id=${next.id}"><span class="next-project__name">${next.name}</span><b aria-hidden="true">→</b></a>
    </section>`;
}

function setupContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const submit = form.querySelector("button[type='submit']");
  const requiredFields = [...form.querySelectorAll("[aria-required='true']")];

  function validateField(field) {
    const wrapper = field.closest(".field");
    const helper = wrapper.querySelector(".field__help");
    const original = helper.dataset.original || helper.textContent;
    helper.dataset.original = original;
    let error = "";

    if (!field.value.trim()) {
      error = `${field.labels[0].textContent.replace("*", "").trim()} is missing. Add it before preparing the email.`;
    } else if (field.type === "email" && !/^\S+@\S+\.\S+$/.test(field.value.trim())) {
      error = "That email address is incomplete. Use a format like name@company.com.";
    }

    const invalid = Boolean(error);
    field.setAttribute("aria-invalid", String(invalid));
    wrapper.dataset.state = invalid ? "error" : "success";
    helper.textContent = invalid ? error : original;
    return !invalid;
  }

  requiredFields.forEach((field) => {
    field.addEventListener("blur", () => {
      field.dataset.touched = "true";
      validateField(field);
    });

    field.addEventListener("input", () => {
      if (field.dataset.touched === "true") validateField(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const valid = requiredFields.map((field) => {
      field.dataset.touched = "true";
      return validateField(field);
    }).every(Boolean);

    if (!valid) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      firstInvalid?.focus();
      submit.dataset.state = "error";
      submit.querySelector("span:first-child").textContent = "Review required fields";
      return;
    }

    const data = new FormData(form);
    const subject = `Project enquiry from ${data.get("name")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Company: ${data.get("company") || "Not provided"}`,
      "",
      "Project context:",
      data.get("brief")
    ].join("\n");

    submit.dataset.state = "loading";
    submit.querySelector("span:first-child").textContent = "Opening mail app";
    window.location.href = `mailto:perpahmian.tech@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.setTimeout(() => {
      submit.dataset.state = "success";
      submit.querySelector("span:first-child").textContent = "Email prepared";
    }, 500);
  });
}

mountSiteChrome();
setupMenu();
setupHeroShowcase();
renderFeaturedProjects();
renderProjectGrid();
renderProjectDetail();
setupContactForm();
