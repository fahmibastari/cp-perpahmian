const ICON_ARROW_UP_RIGHT = `<svg class="ui-arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 12 12 4M6 4h6v6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICON_ARROW_RIGHT = `<svg class="ui-arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICON_ARROW_LEFT = `<svg class="ui-arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M13 8H3M7 4 3 8l4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

document.documentElement.classList.add("has-js");

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
          <a href="mailto:perpahmian.tech@gmail.com">Email us ${ICON_ARROW_UP_RIGHT}</a>
        </div>
      </div>
    </header>`;
}

function footerMarkup() {
  return `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <p class="site-footer__statement">Have a difficult product problem? <span>Let’s make it workable.</span></p>
        <a class="text-link site-footer__action" href="contact.html">Start a conversation ${ICON_ARROW_RIGHT}</a>
        <div class="site-footer__meta">
          <span>© 2026 perpahmian.tech · Indonesia</span>
          <div class="site-footer__links">
            <a href="https://www.linkedin.com/company/perpahmian-tech/" target="_blank" rel="noreferrer">LinkedIn ${ICON_ARROW_UP_RIGHT}</a>
            <a href="https://github.com/fahmibastari" target="_blank" rel="noreferrer">GitHub ${ICON_ARROW_UP_RIGHT}</a>
            <a href="mailto:perpahmian.tech@gmail.com">Email ${ICON_ARROW_UP_RIGHT}</a>
            <a href="privacy.html">Privacy</a>
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
          <p class="feature-project__meta"><span>${project.kind}</span> · ${project.year} · ${project.category}</p>
          <h3>${project.name}</h3>
          <p>${project.summary}</p>
          <a class="text-link" href="project.html?id=${project.id}">View case study ${ICON_ARROW_RIGHT}</a>
        </div>
      </article>`;
  }

  return `
    <article class="project-card" data-project-filters="${project.filters.join(" ")}">
      <a class="project-card__link" href="project.html?id=${project.id}" aria-label="View ${project.name} case study">
        <div class="project-card__media">
          <img src="${project.cover}" width="1600" height="1200" loading="lazy" alt="${project.name} product interface">
          <span class="project-card__media-action" aria-hidden="true">View case study ${ICON_ARROW_UP_RIGHT}</span>
        </div>
        <div class="project-card__body">
          <div>
            <p class="project-card__meta"><span>${project.kind}</span> · ${project.year}</p>
            <h3>${project.name}</h3>
          </div>
          <span class="project-card__arrow" aria-hidden="true">${ICON_ARROW_UP_RIGHT}</span>
          <p class="project-card__workstream">${project.workstream}</p>
          <p>${project.summary}</p>
          <p class="project-card__status"><span aria-hidden="true"></span>${project.status}</p>
        </div>
      </a>
    </article>`;
}

function renderFeaturedProjects() {
  const target = document.querySelector("[data-featured-projects]");
  if (!target || typeof PROJECTS === "undefined") return;
  const featured = FEATURED_PROJECT_IDS.map(getProject).filter(Boolean);
  const layers = featured.map((project, index) => `
    <a class="scroll-work__layer${index === 0 ? " is-active" : ""}" data-scroll-layer="${index}" href="project.html?id=${project.id}" aria-label="View ${project.name} case study" aria-hidden="${index === 0 ? "false" : "true"}" tabindex="${index === 0 ? "0" : "-1"}">
      <figure>
        <img src="${project.cover}" width="1600" height="1200" ${index === 0 ? "" : "loading=\"lazy\""} alt="${project.name} product interface">
        <figcaption>
          <span>${String(index + 1).padStart(2, "0")} / ${String(featured.length).padStart(2, "0")} · ${project.kind}</span>
          <strong>${project.name}</strong>
          <small>${project.workstream}</small>
        </figcaption>
      </figure>
    </a>`).join("");

  const steps = featured.map((project, index) => `
    <article class="scroll-work__step${index === 0 ? " is-active" : ""}" data-scroll-step="${index}" style="--step-opacity: ${index === 0 ? "1" : "0.48"}; --step-y: ${index === 0 ? "0px" : "12px"}">
      <a class="scroll-work__mobile-media" href="project.html?id=${project.id}" aria-label="View ${project.name} case study">
        <img src="${project.cover}" width="1600" height="1200" loading="lazy" alt="${project.name} product interface">
      </a>
      <div class="scroll-work__step-body">
        <p class="scroll-work__meta">${String(index + 1).padStart(2, "0")} / ${String(featured.length).padStart(2, "0")} · ${project.kind}</p>
        <h3>${project.name}</h3>
        <p>${project.summary}</p>
        <a class="text-link" href="project.html?id=${project.id}">View case study ${ICON_ARROW_RIGHT}</a>
      </div>
    </article>`).join("");

  target.innerHTML = `
    <div class="scroll-work__stage" data-scroll-stage>
      <div class="scroll-work__frame">${layers}</div>
      <div class="scroll-work__progress" aria-hidden="true"><span data-scroll-progress></span></div>
      <p class="scroll-work__hint"><span aria-hidden="true">↓</span> Scroll to move through the work</p>
    </div>
    <div class="scroll-work__steps">${steps}</div>`;
}

function setupFeaturedScroll() {
  const root = document.querySelector("[data-featured-projects]");
  if (!root) return;

  const layers = [...root.querySelectorAll("[data-scroll-layer]")];
  const steps = [...root.querySelectorAll("[data-scroll-step]")];
  const progress = root.querySelector("[data-scroll-progress]");
  const desktop = window.matchMedia("(min-width: 60rem)");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let frameRequested = false;
  let activeIndex = -1;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  function setActive(index) {
    if (index === activeIndex) return;
    activeIndex = index;
    layers.forEach((layer, layerIndex) => {
      const active = layerIndex === index;
      layer.classList.toggle("is-active", active);
      layer.setAttribute("aria-hidden", String(!active));
      layer.tabIndex = active ? 0 : -1;
    });
    steps.forEach((step, stepIndex) => step.classList.toggle("is-active", stepIndex === index));
  }

  function resetMobile() {
    layers.forEach((layer, index) => {
      layer.style.removeProperty("--layer-opacity");
      layer.style.removeProperty("--layer-y");
      layer.style.removeProperty("--layer-scale");
      layer.setAttribute("aria-hidden", "true");
      layer.tabIndex = -1;
    });
    steps.forEach((step) => {
      step.style.removeProperty("--step-opacity");
      step.style.removeProperty("--step-y");
    });
    if (progress) progress.style.removeProperty("transform");
    activeIndex = -1;
  }

  function update() {
    frameRequested = false;
    if (!desktop.matches || !steps.length) {
      resetMobile();
      return;
    }

    const viewportCenter = window.innerHeight * 0.5;
    const centers = steps.map((step) => {
      const rect = step.getBoundingClientRect();
      return rect.top + rect.height * 0.5;
    });

    let position = 0;
    if (viewportCenter >= centers[centers.length - 1]) {
      position = centers.length - 1;
    } else if (viewportCenter > centers[0]) {
      const before = centers.findIndex((center, index) => index < centers.length - 1 && viewportCenter >= center && viewportCenter < centers[index + 1]);
      if (before >= 0) {
        const distance = centers[before + 1] - centers[before];
        position = before + (viewportCenter - centers[before]) / distance;
      }
    }

    const nearest = clamp(Math.round(position), 0, layers.length - 1);
    setActive(nearest);

    layers.forEach((layer, index) => {
      const distance = index - position;
      const rawPresence = clamp(1 - Math.abs(distance), 0, 1);
      const easedPresence = rawPresence * rawPresence * (3 - 2 * rawPresence);
      const presence = reduceMotion.matches ? (index === nearest ? 1 : 0) : easedPresence;
      const offset = reduceMotion.matches ? 0 : clamp(distance, -1, 1) * 30;
      const scale = reduceMotion.matches ? 1 : 1 - clamp(Math.abs(distance), 0, 1) * 0.018;
      layer.style.setProperty("--layer-opacity", presence.toFixed(3));
      layer.style.setProperty("--layer-y", `${offset.toFixed(2)}px`);
      layer.style.setProperty("--layer-scale", scale.toFixed(4));
    });

    steps.forEach((step, index) => {
      const focus = reduceMotion.matches ? 1 : clamp(1 - Math.abs(index - position), 0, 1);
      step.style.setProperty("--step-opacity", (0.48 + focus * 0.52).toFixed(3));
      step.style.setProperty("--step-y", `${((1 - focus) * 12).toFixed(2)}px`);
    });

    if (progress) {
      const amount = layers.length > 1 ? position / (layers.length - 1) : 1;
      progress.style.transform = `scaleX(${clamp(amount, 0, 1).toFixed(4)})`;
    }
  }

  function requestUpdate() {
    if (frameRequested) return;
    frameRequested = true;
    window.requestAnimationFrame(update);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  desktop.addEventListener("change", requestUpdate);
  reduceMotion.addEventListener("change", requestUpdate);
  requestUpdate();
}

function setupHeroShowcase() {
  const link = document.querySelector("[data-hero-showcase]");
  if (!link || typeof PROJECTS === "undefined") return;

  const showcaseIds = ["sicater", "magicpin", "digivass", "ubmstorage"];
  const showcase = showcaseIds.map(getProject).filter(Boolean);
  if (!showcase.length) return;

  const image = link.querySelector("[data-hero-image]");
  const title = link.querySelector("[data-hero-title]");
  const meta = link.querySelector("[data-hero-meta]");
  const count = link.querySelector("[data-hero-count]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let current = 0;
  let rotation = null;
  let swapTimer = null;
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

  function transitionToProject(index) {
    window.clearTimeout(swapTimer);
    if (reduceMotion.matches) {
      showProject(index);
      return;
    }

    link.classList.add("is-switching");
    swapTimer = window.setTimeout(() => {
      showProject(index);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => link.classList.remove("is-switching"));
      });
    }, 170);
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
      transitionToProject(current);
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
  reduceMotion.addEventListener("change", () => {
    window.clearTimeout(swapTimer);
    link.classList.remove("is-switching");
    showProject(current);
    startRotation();
  });
  document.addEventListener("visibilitychange", startRotation);

  showProject(current);
  startRotation();
}

function renderProjectGrid() {
  const grid = document.querySelector("[data-project-grid]");
  const status = document.querySelector("[data-filter-status]");
  if (!grid || typeof PROJECTS === "undefined") return;

  const clientProjects = PROJECTS.filter((project) => project.kind === "Client work");
  const researchProjects = PROJECTS.filter((project) => project.kind === "Independent R&D");

  grid.innerHTML = `
    <section class="work-group" data-work-group="client" aria-labelledby="client-work-title">
      <header class="work-group__heading">
        <div><p>Commissioned products</p><h2 id="client-work-title">Client work</h2></div>
        <span>${clientProjects.length} projects</span>
      </header>
      <div class="project-grid__inner">${clientProjects.map((project) => projectCard(project)).join("")}</div>
    </section>
    <section class="work-group" data-work-group="rd" aria-labelledby="research-title">
      <header class="work-group__heading">
        <div><p>Self-initiated exploration</p><h2 id="research-title">Independent R&D</h2></div>
        <span>${researchProjects.length} projects</span>
      </header>
      <div class="project-grid__inner">${researchProjects.map((project) => projectCard(project)).join("")}</div>
    </section>`;
  if (status) status.textContent = `${PROJECTS.length} projects shown`;

  const buttons = [...document.querySelectorAll("[data-filter]")];
  const cards = [...grid.querySelectorAll(".project-card")];

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let filterRun = 0;
  let runningFilterAnimations = [];

  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const filter = button.dataset.filter;
      if (button.classList.contains("is-active")) return;
      const currentRun = ++filterRun;
      runningFilterAnimations.forEach((animation) => animation.cancel());
      runningFilterAnimations = [];
      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      const matchesFilter = (card) => filter === "all" || card.dataset.projectFilters.split(" ").includes(filter);
      const matchedCards = cards.filter(matchesFilter);
      const leavingCards = cards.filter((card) => !card.classList.contains("is-hidden") && !matchesFilter(card));
      const enteringCards = cards.filter((card) => card.classList.contains("is-hidden") && matchesFilter(card));

      if (!reduceMotion.matches && leavingCards.length) {
        const exits = leavingCards.map((card, index) => card.animate([
          { opacity: 1, transform: "translateY(0) scale(1)" },
          { opacity: 0, transform: "translateY(8px) scale(.992)" }
        ], { duration: 150, delay: Math.min(index * 12, 72), easing: "cubic-bezier(.4, 0, 1, 1)", fill: "forwards" }));
        runningFilterAnimations = exits;
        await Promise.all(exits.map((animation) => animation.finished.catch(() => {})));
        exits.forEach((animation) => animation.cancel());
        if (currentRun !== filterRun) return;
      }

      cards.forEach((card) => card.classList.toggle("is-hidden", !matchesFilter(card)));

      grid.querySelectorAll("[data-work-group]").forEach((group) => {
        const hasVisibleCards = [...group.querySelectorAll(".project-card")].some(matchesFilter);
        group.classList.toggle("is-hidden", !hasVisibleCards);
      });

      if (!reduceMotion.matches) {
        const entrances = enteringCards.map((card, index) => card.animate([
          { opacity: 0, transform: "translateY(10px)" },
          { opacity: 1, transform: "translateY(0)" }
        ], { duration: 260, delay: Math.min(index * 32, 192), easing: "cubic-bezier(.16, 1, .3, 1)" }));
        runningFilterAnimations = entrances;
        Promise.all(entrances.map((animation) => animation.finished.catch(() => {}))).then(() => {
          if (currentRun === filterRun) runningFilterAnimations = [];
        });
      }

      if (status) status.textContent = `${matchedCards.length} ${matchedCards.length === 1 ? "project" : "projects"} shown`;
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
        <a class="button button--ink" href="work.html">Return to work ${ICON_ARROW_RIGHT}</a>
      </section>`;
    document.title = "Project not found — perpahmian.tech";
    return;
  }

  document.title = `${project.name} — perpahmian.tech`;
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) descriptionMeta.content = project.summary;
  const canonical = document.querySelector('link[rel="canonical"]');
  const projectUrl = `https://cp-perpahmian.vercel.app/project.html?id=${project.id}`;
  const projectImage = new URL(project.cover, "https://cp-perpahmian.vercel.app/").href;
  if (canonical) canonical.href = projectUrl;
  const socialMeta = {
    'meta[property="og:title"]': `${project.name} — perpahmian.tech`,
    'meta[property="og:description"]': project.summary,
    'meta[property="og:url"]': projectUrl,
    'meta[property="og:image"]': projectImage,
    'meta[property="og:image:alt"]': `${project.name} product interface by perpahmian.tech`,
    'meta[name="twitter:title"]': `${project.name} — perpahmian.tech`,
    'meta[name="twitter:description"]': project.summary,
    'meta[name="twitter:image"]': projectImage
  };
  Object.entries(socialMeta).forEach(([selector, content]) => {
    const element = document.querySelector(selector);
    if (element) element.content = content;
  });

  const caseSchema = document.createElement("script");
  caseSchema.type = "application/ld+json";
  caseSchema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.summary,
    url: projectUrl,
    image: projectImage,
    dateCreated: project.year,
    genre: project.category,
    creator: { "@type": "Organization", name: "perpahmian.tech", url: "https://cp-perpahmian.vercel.app/" }
  });
  document.head.append(caseSchema);

  const breadcrumbSchema = document.createElement("script");
  breadcrumbSchema.type = "application/ld+json";
  breadcrumbSchema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Work", item: "https://cp-perpahmian.vercel.app/work.html" },
      { "@type": "ListItem", position: 2, name: project.name, item: projectUrl }
    ]
  });
  document.head.append(breadcrumbSchema);
  const projectIndex = PROJECTS.findIndex((item) => item.id === project.id);
  const next = PROJECTS[(projectIndex + 1) % PROJECTS.length];
  const externalLink = project.url
    ? `<a class="button button--ink" href="${project.url}" target="_blank" rel="noreferrer">Visit live project ${ICON_ARROW_UP_RIGHT}</a>`
    : "";

  const gallery = project.images.map((image, index) => {
    const filename = decodeURIComponent(image.split("/").pop()).replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
    return `
    <figure>
      <img src="${image}" width="1600" height="1200" loading="lazy" alt="${project.name} interface view ${index + 1}">
      <figcaption>View ${String(index + 1).padStart(2, "0")} · ${filename}</figcaption>
    </figure>`;
  }).join("");

  target.innerHTML = `
    <section class="case-hero page-shell">
      <div class="case-hero__copy reveal" style="--i: 0">
        <a class="case-back" href="work.html">${ICON_ARROW_LEFT} Back to work</a>
        <p class="project-meta">${project.kind} · ${project.workstream}</p>
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
        <div><dt>Engagement</dt><dd>${project.kind}</dd></div>
        <div><dt>Timeline</dt><dd>${project.timeline}</dd></div>
        <div><dt>Status</dt><dd>${project.status}</dd></div>
        <div><dt>Product area</dt><dd>${project.category}</dd></div>
        <div><dt>Year</dt><dd>${project.year}</dd></div>
      </dl>
    </section>
    <section class="case-story page-shell">
      <div class="case-story__intro">
        <p class="eyebrow">Case study</p>
        <h2>From operating context to working product.</h2>
      </div>
      <div class="case-story__body case-narrative">
        <article><span>01</span><h3>Context</h3><p>${project.context || project.summary}</p></article>
        <article><span>02</span><h3>Challenge</h3><p>${project.challenge || project.summary}</p></article>
        <article><span>03</span><h3>Response</h3><p>${project.response || project.description}</p></article>
        <article><span>04</span><h3>Shipped outcome</h3><p>${project.outcome || project.description}</p></article>
      </div>
    </section>
    <section class="case-evidence page-shell" aria-label="Project evidence and technology">
      <div><span>Delivery evidence</span><strong>${project.proof}</strong></div>
      <div><span>Product scope</span><strong>${project.workstream}</strong></div>
      <div><span>Technology</span><ul class="tech-list" aria-label="Technology used">${project.tech.map((tech) => `<li>${tech}</li>`).join("")}</ul></div>
    </section>
    <section class="project-gallery page-shell" aria-label="Project gallery">${gallery}</section>
    <section class="next-project page-shell">
      <span>Next project</span>
      <a href="project.html?id=${next.id}"><span class="next-project__name">${next.name}</span>${ICON_ARROW_RIGHT}</a>
    </section>`;
}

function setupContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const submit = form.querySelector("button[type='submit']");
  const status = form.querySelector("[data-form-status]");
  const defaultStatus = status?.textContent || "";
  const requiredFields = [...form.querySelectorAll("[aria-required='true']")];

  function validateField(field) {
    const wrapper = field.closest(".field");
    const helper = wrapper.querySelector(".field__help");
    const original = helper.dataset.original || helper.textContent;
    helper.dataset.original = original;
    let error = "";

    if (!field.value.trim()) {
      error = `${field.labels[0].textContent.replace("*", "").trim()} is missing. Add it before sending the enquiry.`;
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

  form.addEventListener("submit", async (event) => {
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

    submit.dataset.state = "loading";
    submit.disabled = true;
    submit.querySelector("span:first-child").textContent = "Sending enquiry";
    if (status) status.textContent = "Sending your message securely…";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "The message could not be sent.");

      submit.dataset.state = "success";
      submit.querySelector("span:first-child").textContent = "Enquiry sent";
      if (status) status.textContent = "Thank you. Your enquiry has reached perpahmian.tech and we will reply by email.";
      form.reset();
      form.querySelectorAll(".field").forEach((field) => delete field.dataset.state);
    } catch (error) {
      submit.dataset.state = "error";
      submit.querySelector("span:first-child").textContent = "Try sending again";
      if (status) status.innerHTML = `${error.message} You can also email <a href="mailto:perpahmian.tech@gmail.com">perpahmian.tech@gmail.com</a>.`;
    } finally {
      submit.disabled = false;
      window.setTimeout(() => {
        if (submit.dataset.state !== "success") {
          submit.querySelector("span:first-child").textContent = "Send project enquiry";
          if (status && submit.dataset.state !== "error") status.textContent = defaultStatus;
        }
      }, 5000);
    }
  });
}

function setupServiceScroll() {
  const root = document.querySelector("[data-service-scroll]");
  if (!root) return;

  const steps = [...root.querySelectorAll("[data-service-step]")];
  const progress = root.querySelector("[data-service-progress]");
  const count = root.querySelector("[data-service-count]");
  const desktop = window.matchMedia("(min-width: 60rem)");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let frameRequested = false;
  let activeIndex = -1;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  function update() {
    frameRequested = false;

    if (!desktop.matches || reduceMotion.matches) {
      steps.forEach((step) => {
        step.classList.remove("is-active");
        step.style.setProperty("--service-opacity", "1");
        step.style.setProperty("--service-y", "0px");
      });
      if (progress) progress.style.transform = "scaleX(1)";
      if (count) count.textContent = `${String(steps.length).padStart(2, "0")} / ${String(steps.length).padStart(2, "0")}`;
      activeIndex = -1;
      return;
    }

    const focusLine = window.innerHeight * 0.48;
    const centers = steps.map((step) => {
      const rect = step.getBoundingClientRect();
      return rect.top + rect.height * 0.5;
    });

    let position = 0;
    if (focusLine >= centers[centers.length - 1]) {
      position = centers.length - 1;
    } else if (focusLine > centers[0]) {
      const before = centers.findIndex((center, index) => index < centers.length - 1 && focusLine >= center && focusLine < centers[index + 1]);
      if (before >= 0) {
        position = before + (focusLine - centers[before]) / (centers[before + 1] - centers[before]);
      }
    }

    const nearest = clamp(Math.round(position), 0, steps.length - 1);
    if (nearest !== activeIndex) {
      activeIndex = nearest;
      steps.forEach((step, index) => step.classList.toggle("is-active", index === nearest));
      if (count) count.textContent = `${String(nearest + 1).padStart(2, "0")} / ${String(steps.length).padStart(2, "0")}`;
    }

    steps.forEach((step, index) => {
      const focus = clamp(1 - Math.abs(index - position), 0, 1);
      step.style.setProperty("--service-opacity", (0.7 + focus * 0.3).toFixed(3));
      step.style.setProperty("--service-y", `${((1 - focus) * 10).toFixed(2)}px`);
    });

    if (progress) progress.style.transform = `scaleX(${((position + 1) / steps.length).toFixed(4)})`;
  }

  function requestUpdate() {
    if (frameRequested) return;
    frameRequested = true;
    window.requestAnimationFrame(update);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  desktop.addEventListener("change", requestUpdate);
  reduceMotion.addEventListener("change", requestUpdate);
  requestUpdate();
}

function setupPageTransitions() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function revealPage() {
    document.body.classList.remove("is-page-leaving");
    window.requestAnimationFrame(() => document.body.classList.add("is-page-ready"));
  }

  revealPage();
  window.addEventListener("pageshow", revealPage);

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target === "_blank" || link.hasAttribute("download") || reduceMotion.matches) return;

    const destination = new URL(link.href, window.location.href);
    const sameDocumentAnchor = destination.pathname === window.location.pathname && destination.search === window.location.search && destination.hash;
    if (destination.origin !== window.location.origin || sameDocumentAnchor || !/\.html$|\/$/.test(destination.pathname)) return;

    event.preventDefault();
    document.body.classList.add("is-page-leaving");
    window.setTimeout(() => window.location.assign(destination.href), 180);
  });
}

mountSiteChrome();
setupMenu();
setupHeroShowcase();
renderFeaturedProjects();
setupFeaturedScroll();
renderProjectGrid();
renderProjectDetail();
setupContactForm();
setupServiceScroll();
setupPageTransitions();
