(() => {
  // A screen selector, not a simulated live POS. Keep the static image without JS.
  const preview = document.querySelector("[data-merbaoe-image]");
  const controls = document.querySelector(".merbaoe-controls");
  if (preview && controls) {
    const caption = document.querySelector("[data-merbaoe-caption]");
    const status = document.querySelector("[data-merbaoe-status]");
    const views = {
      cashier: { src: "image/merbaoe/screencapture-merbaoe-vercel-app-cashier-2026-09-05-22_36_22 1.png", title: "Cashier workspace" },
      reports: { src: "image/merbaoe/screencapture-merbaoe-vercel-app-admin-reports-profit-2026-09-05-22_27_41 1.png", title: "Profit reporting" },
      shift: { src: "image/merbaoe/screencapture-merbaoe-vercel-app-cashier-shift-2026-09-05-22_40_11 1.png", title: "Cash-shift reconciliation" }
    };
    let request = 0;
    controls.hidden = false;
    controls.addEventListener("click", async event => {
      const button = event.target.closest("[data-merbaoe-view]");
      if (!button) return;
      const view = views[button.dataset.merbaoeView];
      if (!view) return;
      const current = ++request;
      controls.querySelectorAll("button").forEach(item => item.removeAttribute("aria-busy"));
      button.setAttribute("aria-busy", "true");
      status.textContent = "Loading sandbox screen…";
      try {
        const next = new Image();
        next.src = view.src;
        await next.decode();
        if (current !== request) return;
        preview.src = view.src;
        preview.alt = "Kopi Merbaoe sandbox: " + view.title + ". Demonstration data.";
        caption.textContent = view.title + ". Sandbox account with demonstration data, not the operating account.";
        controls.querySelectorAll("button").forEach(item => item.setAttribute("aria-pressed", String(item === button)));
        status.textContent = view.title + " selected.";
        if (!matchMedia("(prefers-reduced-motion: reduce)").matches) preview.animate([{ opacity: 0.45 }, { opacity: 1 }], { duration: 240 });
      } catch {
        if (current === request) status.textContent = "This screen could not load. Try again or explore the project.";
      } finally {
        if (current === request) button.removeAttribute("aria-busy");
      }
    });
  }

  const menu = document.querySelector(".site-menu");
  const syncMenuState = () => {
    if (!menu) return;
    const open = menu.classList.contains("is-open");
    menu.inert = !open;
    menu.toggleAttribute("inert", !open);
  };

  if (menu) {
    syncMenuState();
    new MutationObserver(syncMenuState).observe(menu, {
      attributes: true,
      attributeFilter: ["class", "aria-hidden"]
    });
  }

  document.querySelectorAll(".archive-ribbon, .brand-assembly, .contact-signal, .privacy-index").forEach((item) => {
    item.hidden = true;
    item.inert = true;
  });

  const revealTargets = document.querySelectorAll([
    ".showcase", ".studio-selected", ".studio-capabilities", ".studio-product",
    ".work-proof", ".work-index", ".service-detail__row", ".engagements",
    ".process", ".working-together", ".about-story", ".founder-profile",
    ".principles", ".profile-strip", ".case-story", ".case-implementation",
    ".project-gallery", ".legal-copy"
  ].join(","));

  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  if ("IntersectionObserver" in window && !reduced.matches) {
    revealTargets.forEach((item) => item.setAttribute("data-board-reveal", ""));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    revealTargets.forEach((item) => observer.observe(item));
    document.documentElement.classList.add("revamp-ready");
    reduced.addEventListener("change", () => {
      if (!reduced.matches) return;
      observer.disconnect();
      revealTargets.forEach((item) => item.classList.add("is-visible"));
    });
  }
})();
