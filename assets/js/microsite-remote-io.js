(function () {
  "use strict";

  const productBase = "https://www.moxa.com/en/products/industrial-edge-connectivity/controllers-and-ios/";
  const products = [
    {
      name: "ioLogik 2500 Series",
      type: "Smart remote I/O",
      image: "assets/microsite/product-1.png",
      href: `${productBase}universal-controllers-and-i-os/iologik-2500-series`,
      features: ["Click&Go Plus edge logic", "Expansion with ioLogik E1200", "Four Ethernet and two serial ports"],
    },
    {
      name: "ioLogik E1200 Series",
      type: "Ethernet remote I/O",
      image: "assets/microsite/product-2.png",
      href: `${productBase}universal-controllers-and-i-os/iologik-e1200-series`,
      features: ["Compact front-wiring design", "Two-port Ethernet switch", "Modbus TCP, RESTful API, and SNMP"],
    },
    {
      name: "ioLogik R1200 Series",
      type: "RS-485 remote I/O",
      image: "assets/microsite/product-3.png",
      href: `${productBase}universal-controllers-and-i-os/iologik-r1200-series`,
      features: ["Compact front-wiring design", "Higher-stability RS-485", "Dual RS-485 or repeater mode"],
    },
    {
      name: "ioThinx 4510 Series",
      type: "Modular remote I/O",
      image: "assets/microsite/product-4.png",
      href: `${productBase}advanced-controllers-and-i-os/iothinx-4510-series`,
      features: ["Tool-free installation", "Expansion to 32 modules", "MQTT, RESTful API, Modbus TCP, and SNMPv3"],
    },
  ];

  const selectionRows = [
    ["I/O", ["DI, DO, Relay, AI, AO, RTD, TC", "DI, DO, Relay, AI, AO", "DI, DO, AI; expandable by ioLogik E1200", "DI, DO, Relay, AI, AO, RTD, TC; expandable by 45MR Series"]],
    ["Front-end logic", ["—", "—", "Click&Go Plus", "—"]],
    ["Ethernet ports", ["2", "—", "4", "2"]],
    ["Serial", ["—", "2 × RS-485", "2 × RS-232/422/485", "1 × RS-232/422 or 2 × RS-485"]],
    ["Northbound protocol", ["Modbus TCP server\nEtherNet/IP adapter\nSNMPv1/v2c\nRESTful API", "Modbus RTU server", "Modbus TCP server\nSNMPv1/v2c/v3\nRESTful API", "Modbus TCP server\nSNMPv1/v2c/v3\nRESTful API via TLS"]],
    ["Active protocol", ["Moxa AOPC active tag\nSNMPv1 Trap", "—", "Moxa AOPC active tag\nSNMPv1/v2c Trap\nCGI command", "MQTT via TLS\nSNMPv1/v2c/v3 Trap\nSNMPv2c/v3 Inform"]],
    ["Operating temperature", ["Standard: -10 to 60°C\nWide: -40 to 75°C", "Standard: -10 to 75°C\nWide: -40 to 85°C", "Standard: -10 to 60°C\nWide: -40 to 75°C", "Standard: -20 to 60°C\nWide: -40 to 75°C"]],
    ["Standards and certifications", ["CID2, ATEX Zone 2, CE, FCC, UL", "CE, FCC, UL", "CID2, ATEX Zone 2, CE, FCC, UL", "CID2, ATEX Zone 2, CE, FCC, UL"]],
  ];

  const brochureImages = Array.from({ length: 5 }, (_, index) => `assets/microsite/brochure-page-${index + 1}.jpg`);
  let brochureIndex = 0;
  let activeModal = null;
  let modalTrigger = null;

  function renderProducts() {
    const grid = document.getElementById("rioProductGrid");
    if (!grid) return;
    grid.innerHTML = products
      .map(
        (product) => `
          <article class="rio-product-card">
            <div class="rio-product-media"><img src="${product.image}" alt="${product.name}" loading="lazy"></div>
            <div class="rio-product-body">
              <p class="rio-product-type">${product.type}</p>
              <h3>${product.name}</h3>
              <ul>${product.features.map((feature) => `<li>${feature}</li>`).join("")}</ul>
              <div class="rio-actions">
                <a class="rio-btn rio-btn-primary" href="${product.href}">View series</a>
                <a class="rio-btn rio-btn-outline" href="#comparison">Compare</a>
              </div>
            </div>
          </article>`
      )
      .join("");
  }

  function renderBrochurePages() {
    const pages = document.getElementById("rioBrochurePages");
    if (!pages) return;
    pages.innerHTML = brochureImages
      .map(
        (image, index) => `
          <button class="rio-brochure-page" type="button" data-open-brochure="${index}" aria-label="Open brochure page ${index + 1}">
            <img src="${image}" alt="Remote I/O portfolio brochure page ${index + 1}" loading="lazy">
          </button>`
      )
      .join("");
  }

  function renderSelectionGuide() {
    const table = document.getElementById("rioSelectionTable");
    const links = document.getElementById("rioSelectionLinks");
    const highlight = document.getElementById("rioDiffToggle")?.checked;
    if (!table || !links) return;

    const columns = [products[1], products[2], products[0], products[3]];
    table.innerHTML = `
      <thead><tr><th scope="col">Engineering specification</th>${columns
        .map(
          (product) => `<th scope="col"><img src="${product.image}" alt=""><a href="${product.href}">${product.name}</a><div>${product.type}</div></th>`
        )
        .join("")}</tr></thead>
      <tbody>${selectionRows
        .map(([label, values]) => {
          const differs = new Set(values.map((value) => value.trim())).size > 1;
          return `<tr class="${highlight && differs ? "is-different" : ""}"><th scope="row">${label}</th>${values
            .map((value) => `<td>${value}</td>`)
            .join("")}</tr>`;
        })
        .join("")}</tbody>`;

    links.innerHTML = columns
      .map((product) => `<a href="${product.href}">View ${product.name.replace(" Series", "")}</a>`)
      .join("");
  }

  function activateTab(tab) {
    const tabs = Array.from(document.querySelectorAll(".rio-pillar-tab"));
    tabs.forEach((button) => {
      const selected = button === tab;
      button.setAttribute("aria-selected", selected ? "true" : "false");
      button.tabIndex = selected ? 0 : -1;
      const panel = document.querySelector(`[data-panel="${button.dataset.tab}"]`);
      if (panel) panel.hidden = !selected;
    });
  }

  function initializeTabs() {
    const tabs = Array.from(document.querySelectorAll(".rio-pillar-tab"));
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activateTab(tab));
      tab.addEventListener("keydown", (event) => {
        let nextIndex = index;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = tabs.length - 1;
        else return;
        event.preventDefault();
        activateTab(tabs[nextIndex]);
        tabs[nextIndex].focus();
      });
    });
  }

  function focusableIn(modal) {
    return Array.from(modal.querySelectorAll('button, a[href], iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])'));
  }

  function openModal(modal, trigger) {
    if (!modal) return;
    activeModal = modal;
    modalTrigger = trigger || document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (modal.id === "videoModal") {
      const frame = document.getElementById("rioVideoFrame");
      if (frame && !frame.getAttribute("src")) frame.src = frame.dataset.src || "";
    }
    window.setTimeout(() => focusableIn(modal)[0]?.focus(), 0);
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (modal.id === "videoModal") {
      const frame = document.getElementById("rioVideoFrame");
      if (frame) frame.removeAttribute("src");
    }
    activeModal = null;
    if (modalTrigger instanceof HTMLElement) modalTrigger.focus();
    modalTrigger = null;
  }

  function renderBrochureModal() {
    const image = document.getElementById("rioBrochureImage");
    const count = document.getElementById("rioBrochureIndex");
    if (!image || !count) return;
    image.src = brochureImages[brochureIndex];
    image.alt = `Remote I/O portfolio brochure page ${brochureIndex + 1}`;
    count.textContent = String(brochureIndex + 1);
  }

  function openBrochure(index, trigger) {
    brochureIndex = Number(index) || 0;
    renderBrochureModal();
    openModal(document.getElementById("brochureModal"), trigger);
  }

  function stepBrochure(step) {
    brochureIndex = (brochureIndex + step + brochureImages.length) % brochureImages.length;
    renderBrochureModal();
  }

  function initializeModals() {
    document.addEventListener("click", (event) => {
      const openButton = event.target.closest("[data-open-modal]");
      const brochureButton = event.target.closest("[data-open-brochure]");
      const closeButton = event.target.closest("[data-close-modal]");
      if (openButton) openModal(document.getElementById(openButton.dataset.openModal), openButton);
      if (brochureButton) openBrochure(brochureButton.dataset.openBrochure, brochureButton);
      if (closeButton) closeModal(closeButton.closest(".rio-modal"));
    });

    document.querySelectorAll(".rio-modal").forEach((modal) => {
      modal.addEventListener("pointerdown", (event) => {
        if (event.target === modal) closeModal(modal);
      });
    });

    document.getElementById("rioBrochurePrev")?.addEventListener("click", () => stepBrochure(-1));
    document.getElementById("rioBrochureNext")?.addEventListener("click", () => stepBrochure(1));

    document.addEventListener("keydown", (event) => {
      if (!activeModal) return;
      if (event.key === "Escape") closeModal(activeModal);
      if (activeModal.id === "brochureModal" && event.key === "ArrowLeft") stepBrochure(-1);
      if (activeModal.id === "brochureModal" && event.key === "ArrowRight") stepBrochure(1);
      if (event.key === "Tab") {
        const focusable = focusableIn(activeModal);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
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

  function initializeScrollSpy() {
    const links = Array.from(document.querySelectorAll(".rio-anchor-links a[data-section]"));
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        links.forEach((link) => link.classList.toggle("is-active", link.dataset.section === visible.target.id));
      },
      { rootMargin: "-30% 0px -58%", threshold: [0.01, 0.2, 0.5] }
    );
    links.forEach((link) => {
      const section = document.getElementById(link.dataset.section);
      if (section) observer.observe(section);
    });
  }

  renderProducts();
  renderBrochurePages();
  renderSelectionGuide();
  initializeTabs();
  initializeModals();
  initializeScrollSpy();

  document.getElementById("rioDiffToggle")?.addEventListener("change", renderSelectionGuide);
  document.getElementById("rioPrintGuide")?.addEventListener("click", () => window.print());
})();
