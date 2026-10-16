/* Curated media and motion. Routes, project records, and contact delivery are unchanged. */
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const styles = getComputedStyle(document.documentElement);
  const ease = styles.getPropertyValue("--ease-out").trim();
  const duration = parseFloat(styles.getPropertyValue("--dur-editorial")) || 850;
  const media = {
    sicater: { primary: "image/sicater/Web-Dashboard.png", secondary: "image/sicater/Mobile-DashboardStats.jpg", layout: "paired", label: "Field + office", tone: "light" },
    magicpin: { primary: "image/magicpin/DashboardGuest3.png", secondary: "image/magicpin/Mobile - FullMapTiles.png", layout: "paired", label: "Production web + mobile", tone: "dark" },
    flamboys: { primary: "image/flamboys/Admin - DashboardAnalytics.png", layout: "single", label: "Operations platform", tone: "light" },
    ubmstorage: { primary: "image/ubmstorage/PSP - Product Catalog.png", secondary: "image/ubmstorage/PSP - Menu Custom UI.png", layout: "immersive", label: "Interactive 3D", tone: "dark" },
    '2watuju': { primary: "image/2watuju/DashboardCatalog.png", layout: "single", label: "Architecture + 360° exploration", tone: "light" },
    cced: { primary: "image/cced/LandingPage.png", layout: "single", label: "University career platform", tone: "dark" },
    justspeak: { primary: "image/justspeak/Dashboard.png", layout: "single", label: "Learning + assessment", tone: "light" }
  };
  function art(id, name, fallback, eager = false) {
    const item = media[id] || { primary: fallback, layout: "single", tone: "dark", label: "" };
    return `<div class="project-art project-art--${item.layout} project-art--${item.tone}" data-project-art>
      <div class="project-art__surface">
        <img class="project-art__primary" src="${item.primary}" width="1600" height="1000" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} alt="${name} product preview">
        ${item.secondary ? `<img class="project-art__secondary" src="${item.secondary}" width="800" height="1200" loading="${eager ? 'eager' : 'lazy'}" alt="${name} — ${item.layout === 'paired' ? 'mobile interface' : 'another product view'}">` : ""}
      </div>
      ${item.label ? `<span class="project-art__label" aria-hidden="true">${item.label}</span>` : ""}
      <span class="project-art__curtain" aria-hidden="true"></span>
    </div>`;
  }
  function animateArtwork(root) {
    if (reduce.matches || !root) return;
    root.querySelectorAll(".project-art__primary, .project-art__secondary").forEach((image, index) => {
      if (image.classList.contains("project-art__secondary") && image.closest(".project-art--immersive")) return;
      image.animate([{ opacity: 0, transform: `translateY(${index ? 44 : 24}px)` }, { opacity: 1, transform: "translateY(0)" }],
        { duration, delay: index * 90, easing: ease, fill: "backwards" });
    });
  }
  const stage = document.querySelector("[data-showcase-stage]");
  if (stage && !window.PerpahmianMotion) {
    const slides = [
      { id: "magicpin", name: "Magic Pin", category: "Web & mobile platforms", description: "A collector community, connected across the web and production mobile apps." },
      { id: "sicater", name: "SiCater Ultimate", category: "Operational systems", description: "Connecting field teams and office operations for a regional water utility." },
      { id: "ubmstorage", name: "UBM Storage 3D", category: "Interactive experiences", description: "An explorable 3D product catalog, built to run in the browser." }
    ];
    const visual = stage.querySelector("[data-showcase-image-link]");
    const title = stage.querySelector("[data-showcase-title]");
    const category = stage.querySelector("[data-showcase-category]");
    const description = stage.querySelector("[data-showcase-description]");
    const link = stage.querySelector("[data-showcase-link]");
    const buttons = [...document.querySelectorAll("[data-showcase-select]")];
    const controls = document.querySelector(".showcase__controls");
    let active = "magicpin";
    let request = 0;
    const status = document.createElement("p");
    status.className = "showcase__status";
    status.setAttribute("role", "status");
    status.hidden = true;
    controls.after(status);
    const initial = slides[0];
    visual.innerHTML = art(initial.id, initial.name, "", true);
    description.textContent = initial.description;
    link.innerHTML = `View project ${ICON_ARROW_UP_RIGHT}`;
    buttons.forEach(button => button.addEventListener("click", async () => {
      const slide = slides.find(item => item.id === button.dataset.showcaseSelect);
      const currentRequest = ++request;
      buttons.forEach(item => item.removeAttribute("aria-busy"));
      status.hidden = true;
      if (!slide || slide.id === active) return;
      button.setAttribute("aria-busy", "true");
      try {
        await Promise.all([media[slide.id].primary, media[slide.id].secondary].filter(Boolean).map(src => {
          const image = new Image();
          image.src = src;
          return image.decode();
        }));
      } catch {
        if (currentRequest === request) {
          button.removeAttribute("aria-busy");
          status.textContent = "This preview could not load. Try again, or open the project from Work.";
          status.hidden = false;
        }
        return;
      }
      if (currentRequest !== request) return;
      active = slide.id;
      button.removeAttribute("aria-busy");
      title.textContent = slide.name;
      category.textContent = slide.category;
      description.textContent = slide.description;
      link.href = `project.html?id=${slide.id}`;
      visual.href = link.href;
      visual.setAttribute("aria-label", `View ${slide.name} case study`);
      visual.innerHTML = art(slide.id, slide.name, "", true);
      visual.querySelector(".project-art").classList.add("is-revealed");
      buttons.forEach(item => item.setAttribute("aria-pressed", String(item === button)));
      document.querySelector("[data-showcase-counter]").textContent = `0${slides.indexOf(slide) + 1} / 03`;
      animateArtwork(visual);
      if (!reduce.matches) {
        stage.querySelector(".showcase__copy").getAnimations().forEach(animation => animation.cancel());
        stage.querySelector(".showcase__copy").animate([{ opacity: .15 }, { opacity: 1 }], { duration: 300, easing: ease });
      }
    }));
  }

  const selected = document.querySelector("[data-editorial-projects]");
  if (selected && typeof getProject === "function") {
    selected.innerHTML = ["flamboys", "2watuju", "cced", "justspeak"].map(id => {
      const project = getProject(id);
      return `<article class="editorial-card"><a href="project.html?id=${id}">
        <div class="editorial-card__media">${art(id, project.name, project.cover)}</div>
        <div class="editorial-card__caption"><div><h3>${project.name}</h3><p>${project.workstream}</p></div>
        <span class="project-open" aria-hidden="true">${ICON_ARROW_UP_RIGHT}</span></div></a></article>`;
    }).join("");
  }
  document.querySelectorAll(".project-card").forEach(card => {
    const link = card.querySelector(".project-card__link");
    const id = new URL(link.href).searchParams.get("id");
    const project = getProject(id);
    card.querySelector(".project-card__media").innerHTML = art(id, project.name, project.cover);
  });
  const caseMedia = document.querySelector(".case-hero__media");
  const id = new URLSearchParams(location.search).get("id");
  if (caseMedia && media[id]) {
    caseMedia.classList.add("case-hero__media--art");
    caseMedia.innerHTML = art(id, getProject(id).name, "", true);
  }

  const serviceProof = {
    product: [["sicater", "SiCater Ultimate", "Utility operations", "image/sicater/Sicater Thumb Black.png"], ["flamboys", "Flamboys Roaster", "Roasting workflows", "image/flamboys/Flambo Thumb Black.png"]],
    engineering: [["magicpin", "Magic Pin", "Web & mobile ecosystem", "image/magicpin/MP Thumb Black.png"], ["sicater", "SiCater Ultimate", "Connected applications", "image/sicater/Sicater Thumb Black.png"]],
    systems: [["flamboys", "Flamboys Roaster", "Internal operations", "image/flamboys/Flambo Thumb Black.png"], ["sicater", "SiCater Ultimate", "Field-to-office platform", "image/sicater/Sicater Thumb Black.png"]],
    immersive: [["ubmstorage", "UBM Storage", "3D product catalog", "image/ubmstorage/UBM Thumb Black.png"], ["worldofbooth", "World of Booth", "Independent experiment", "image/worldOfBooth/Gameplay1.png"]]
  };
  document.querySelectorAll(".service-detail__row").forEach(row => {
    const [copy, detail] = row.children;
    if (!copy || !detail || !serviceProof[row.id]) return;
    while (detail.firstChild) copy.append(detail.firstChild);
    detail.className = "service-proof";
    detail.innerHTML = serviceProof[row.id].map(([id, name, scope, src]) => `<a href="project.html?id=${id}">${art(id, name, src)}<h3>${name}</h3><p>${scope}</p></a>`).join("");
  });

  // Reveal media only, once. Never hide text, links, or whole sections.
  if (!reduce.matches && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        animateArtwork(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    document.querySelectorAll("[data-project-art]").forEach(board => {
      board.classList.add("is-motion-ready");
      observer.observe(board);
    });
    reduce.addEventListener("change", () => {
      if (!reduce.matches) return;
      observer.disconnect();
      document.querySelectorAll("[data-project-art]").forEach(board => board.classList.add("is-revealed"));
      document.querySelectorAll('.project-art, .showcase__copy, .headline-line').forEach(element => {
        element.getAnimations({ subtree: true }).forEach(animation => animation.cancel());
      });
    });
  }

  // A short, single entrance for the homepage headline; accessible text remains intact.
  const headline = document.querySelector(".studio-hero h1");
  if (headline && !reduce.matches) {
    headline.setAttribute("aria-label", headline.innerText.replace(/\s+/g, " "));
    headline.innerHTML = headline.innerHTML.split(/<br\s*\/?\s*>/i).map((line, index) =>
      `<span class="headline-line" aria-hidden="true"><span style="--line-order:${index}">${line}</span></span>`).join("");
  }
  if (new URLSearchParams(location.search).get("filter") === "rd") {
    document.querySelector('[data-filter="rd"]')?.click();
  }
  window.PerpahmianMotion?.mount({ art });
})();
