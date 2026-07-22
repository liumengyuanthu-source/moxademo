(function () {
  "use strict";

  const body = document.body;
  if (!body || body.dataset.moxaShellReady === "true") return;

  body.dataset.moxaShellReady = "true";
  body.classList.add("moxa-ds");

  const pageId = body.dataset.moxaPage || "page";

  const breadcrumbMap = {
    homepage: null,
    search: [
      ["Home", "homepage.html"],
      ["Search Results", null],
    ],
    "ethernet-switches": [
      ["Home", "homepage.html"],
      ["Products", "homepage.html#featured-products"],
      ["Ethernet Switches", null],
    ],
    "eds-4008-series": [
      ["Home", "homepage.html"],
      ["Products", "homepage.html#featured-products"],
      ["Ethernet Switches", "product-category-ethernet-switches.html"],
      ["EDS-4008 Series", null],
    ],
    campaign: [
      ["Home", "homepage.html"],
      ["Solutions", "homepage.html#explore-now"],
      ["Industrial Network Security", null],
    ],
    microsite: [
      ["Home", "homepage.html"],
      ["Solutions", "homepage.html#explore-now"],
      ["Controller & I/O", "microsite.html#overview"],
      ["Remote I/O Portfolio", null],
    ],
    video: [
      ["Home", "homepage.html"],
      ["Videos", "video.html#video-library"],
      ["Energy Transition", null],
    ],
    article: [
      ["Home", "homepage.html"],
      ["Resources", "search.html?q=Articles"],
      ["Articles", "article.html"],
      ["Taking TSN to the Real World", null],
    ],
    "eds-4008-lv": [
      ["Home", "homepage.html"],
      ["Products", "homepage.html#featured-products"],
      ["Ethernet Switches", "product-category-ethernet-switches.html"],
      ["EDS-4008 Series", "product-series-eds-4008.html"],
      ["EDS-4008-LV", null],
    ],
    "eds-4008-hv": [
      ["Home", "homepage.html"],
      ["Products", "homepage.html#featured-products"],
      ["Ethernet Switches", "product-category-ethernet-switches.html"],
      ["EDS-4008 Series", "product-series-eds-4008.html"],
      ["EDS-4008-HV", null],
    ],
    "nport-5100-series": [
      ["Home", "homepage.html"],
      ["Products", "homepage.html#featured-products"],
      ["Device Connectivity", "search.html?q=Device%20Connectivity"],
      ["NPort 5100 Series", null],
    ],
    manual: [
      ["Home", "homepage.html"],
      ["Resources", "search.html"],
      ["Manuals", "search.html?q=Manuals"],
      ["EDS-4008 Manual", null],
    ],
    "compare-lv-hv": [
      ["Home", "homepage.html"],
      ["Products", "homepage.html#featured-products"],
      ["Ethernet Switches", "product-category-ethernet-switches.html"],
      ["EDS-4008 Series", "product-series-eds-4008.html"],
      ["AI Model Comparison", null],
    ],
    "compare-quote": [
      ["Home", "homepage.html"],
      ["Products", "homepage.html#featured-products"],
      ["EDS-4008 Series", "product-series-eds-4008.html"],
      ["Request a Quote", null],
    ],
    "product-360": [
      ["Home", "homepage.html"],
      ["Products", "homepage.html#featured-products"],
      ["Ethernet Switches", "product-category-ethernet-switches.html"],
      ["EDS-4008 Series", "product-series-eds-4008.html"],
      ["360-degree Product Image", null],
    ],
  };

  const megaColumns = {
    Products: [
      {
        title: "Browse by category",
        links: [
          ["Ethernet Switches", "product-category-ethernet-switches.html"],
          ["EDS-4008 Series", "product-series-eds-4008.html"],
          ["NPort 5100 Series", "nport-5100-series.html"],
        ],
      },
      {
        title: "Models and Validation",
        links: [
          ["EDS-4008-LV", "eds-4008-lv.html"],
          ["EDS-4008-HV", "eds-4008-hv.html"],
          ["LV/HV AI Compare", "compare-lv-hv.html"],
        ],
      },
      {
        title: "Product Media",
        links: [
          ["HXML Manual", "manual.html"],
          ["360-degree Product Image", "product-360.html"],
          ["Search all resources", "search.html?q=Ethernet%20Switches"],
        ],
      },
    ],
    Solutions: [
      {
        title: "Explore by Challenge",
        links: [
          ["Industrial Network Security", "campaign.html"],
          ["Controller & I/O", "microsite.html"],
          ["Energy Transition", "video.html"],
        ],
      },
      {
        title: "Explore by Journey",
        links: [
          ["Find a product", "product-category-ethernet-switches.html"],
          ["Validate a model", "product-series-eds-4008.html"],
          ["Ask the AI comparison demo", "compare-lv-hv.html"],
        ],
      },
      {
        title: "Featured Proof",
        links: [
          ["Secure networking campaign", "campaign.html#solutions"],
          ["Remote I/O portfolio", "microsite.html#architecture"],
          ["Video library", "video.html#video-library"],
        ],
      },
    ],
    Resources: [
      {
        title: "Technical Resources",
        links: [
          ["Product manuals", "manual.html"],
          ["EDS-4008 resources", "product-series-eds-4008.html#resources"],
          ["Video library", "video.html#video-library"],
        ],
      },
      {
        title: "Search and Compare",
        links: [
          ["Search Moxa", "search.html"],
          ["LV/HV AI Compare", "compare-lv-hv.html"],
          ["360-degree Product Image", "product-360.html"],
        ],
      },
      {
        title: "Related Journeys",
        links: [
          ["Ethernet Switches", "product-category-ethernet-switches.html"],
          ["EDS-4008 Series", "product-series-eds-4008.html"],
          ["NPort 5100 Series", "nport-5100-series.html"],
        ],
      },
    ],
    Support: [
      {
        title: "Get Help",
        links: [
          ["Contact Moxa", "https://www.moxa.com/contact-us"],
          ["Technical Support", "https://www.moxa.com/en/support"],
          ["Find a Distributor", "https://www.moxa.com/en/contact-us/find-a-distributor"],
        ],
      },
      {
        title: "Product Validation",
        links: [
          ["Open the manual", "manual.html"],
          ["Compare LV and HV", "compare-lv-hv.html"],
          ["Search documents", "search.html?q=EDS-4008%20manual"],
        ],
      },
      {
        title: "Account",
        links: [
          ["My Moxa", "https://www.moxa.com/en/membership/my-account/profile/personal-info"],
          ["Sign In", "homepage.html#my-moxa-signup"],
          ["Partner Zone", "https://partnerzone.moxa.com/"],
        ],
      },
    ],
    "Why Moxa": [
      {
        title: "Why Moxa",
        links: [
          ["About Moxa", "https://www.moxa.com/en/about-us"],
          ["Global presence", "https://www.moxa.com/en/about-us/about-moxa/global-presence"],
          ["Careers", "https://www.moxa.com/en/about-us/careers"],
        ],
      },
      {
        title: "Insights",
        links: [
          ["Trending at Moxa", "homepage.html#trending"],
          ["Energy transition video", "video.html"],
          ["Industrial security", "campaign.html"],
        ],
      },
      {
        title: "Connect",
        links: [
          ["Contact Us", "https://www.moxa.com/contact-us"],
          ["Follow Moxa", "#moxa-follow"],
          ["Stay connected", "#moxa-subscribe"],
        ],
      },
    ],
  };

  const megaMeta = {
    Products: {
      heading: "Explore Products",
      description:
        "Browse the portfolio, validate the right model, or continue directly to technical product resources.",
      viewAll: ["View All Products", "product-category-ethernet-switches.html"],
      feature: {
        tag: "Featured series",
        title: "EDS-4008 Series",
        description:
          "Eight-port managed Ethernet switches with flexible power options for demanding industrial networks.",
        image: "asset/generated-hero/hero-product-selection.png",
        href: "product-series-eds-4008.html",
        cta: "Explore the Series",
      },
    },
    Solutions: {
      heading: "Explore Solutions",
      description:
        "Start with an industrial challenge, then move into a validated architecture, campaign, or solution portfolio.",
      viewAll: ["View Security Solutions", "campaign.html#solutions"],
      feature: {
        tag: "Featured solution",
        title: "Industrial Network Security",
        description:
          "Build layered OT protection with secure networking products and deployment guidance.",
        image: "assets/campaign-security/secure-network-selection-guide.jpg",
        href: "campaign.html",
        cta: "Open the Selection Guide",
      },
    },
    Resources: {
      heading: "Find Resources",
      description:
        "Search technical documents, compare products, or open the media needed for engineering validation.",
      viewAll: ["Search All Resources", "search.html"],
      feature: {
        tag: "Featured resource",
        title: "EDS-4008 Technical Resources",
        description:
          "Open the series datasheet, HXML manual experience, model comparison, and product media.",
        image: "asset/generated-hero/hero-search-docs.png",
        href: "product-series-eds-4008.html#resources",
        cta: "View Series Resources",
      },
    },
    Support: {
      heading: "Get Support",
      description:
        "Move from product validation to documentation, technical support, or a local Moxa contact.",
      viewAll: ["Visit Moxa Support", "https://www.moxa.com/en/support"],
      feature: {
        tag: "Technical support",
        title: "Validate Before Deployment",
        description:
          "Review the manual, compare LV and HV models, or search product documentation before installation.",
        image: "img/family-network.jpg",
        href: "manual.html",
        cta: "Open Technical Resources",
      },
    },
    "Why Moxa": {
      heading: "Why Moxa",
      description:
        "Explore the experience, global reach, and industrial expertise behind Moxa connectivity solutions.",
      viewAll: ["About Moxa", "https://www.moxa.com/en/about-us"],
      feature: {
        tag: "Featured story",
        title: "Connecting Industry Worldwide",
        description:
          "See how Moxa supports reliable industrial connectivity across regions and applications.",
        image: "img/scenario-manufacturing.jpg",
        href: "homepage.html#enabling-connectivity",
        cta: "Explore Moxa",
      },
    },
  };

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function megaMarkup(label) {
    const columns = megaColumns[label] || [];
    const meta = megaMeta[label] || {};
    return `
      <div class="moxa-mega" role="region" aria-label="${escapeHtml(label)} menu">
        <div class="moxa-mega-shell">
          <div class="moxa-mega-card-grid">
            <article class="moxa-mega-intro">
              <p class="moxa-mega-eyebrow">${escapeHtml(label)}</p>
              <h2>${escapeHtml(meta.heading || label)}</h2>
              <p>${escapeHtml(meta.description || "")}</p>
              <a class="moxa-mega-guide" href="${escapeHtml(meta.viewAll?.[1] || "#")}">
                <strong>${escapeHtml(meta.viewAll?.[0] || `View All ${label}`)}</strong>
                <span>Start here for a guided overview.</span>
              </a>
            </article>
            ${columns
              .map(
              (column) => `
                <section class="moxa-mega-category-card">
                  <h3>${escapeHtml(column.title)}</h3>
                  ${column.links
                    .map(
                      ([linkLabel, href]) =>
                        `<a href="${escapeHtml(href)}"><span>${escapeHtml(linkLabel)}</span></a>`
                    )
                    .join("")}
                </section>
              `
            )
            .join("")}
          </div>
        </div>
      </div>
    `;
  }

  function navItem(label) {
    return `
      <div class="moxa-nav-item" data-moxa-nav="${escapeHtml(label)}">
        <button class="moxa-nav-trigger" type="button" aria-expanded="false">
          ${escapeHtml(label)}
        </button>
        ${megaMarkup(label)}
      </div>
    `;
  }

  const headerMarkup = `
    <header class="moxa-global-header" data-shared-component="GlobalHeader">
      <div class="moxa-header-inner moxa-utility-row">
        <a class="moxa-brand" href="homepage.html" aria-label="Moxa homepage">
          <img src="img/moxa-logo.png" alt="Moxa" width="180" height="36">
        </a>
        <form class="moxa-search" id="moxaGlobalSearch" role="search">
          <img src="img/icon-search.svg" alt="">
          <label class="moxa-visually-hidden" for="moxaGlobalSearchInput">Search products, solutions, and resources</label>
          <input id="moxaGlobalSearchInput" name="q" type="search" placeholder="Search products, solutions, and resources" autocomplete="off">
          <button class="moxa-ai-mode" id="moxaAiMode" type="button" aria-pressed="false">Ask AI</button>
        </form>
        <div class="moxa-utility-links" id="moxaUtilityLinks">
          <a href="https://www.moxa.com/contact-us">Contact Us</a>
          <a href="https://partnerzone.moxa.com/">Partner Zone</a>
          <a href="https://www.moxa.com/en/membership/my-account/profile/personal-info">My Moxa</a>
          <a href="homepage.html#my-moxa-signup">Sign In</a>
        </div>
        <button class="moxa-mobile-control" id="moxaSearchToggle" type="button" aria-label="Open search" aria-expanded="false">
          <img src="img/icon-search.svg" alt="">
        </button>
        <button class="moxa-mobile-control" id="moxaAccountToggle" type="button" aria-label="Open account links" aria-expanded="false">
          <img src="img/icon-person.svg" alt="">
        </button>
        <button class="moxa-mobile-control" id="moxaMenuToggle" type="button" aria-label="Open navigation" aria-expanded="false">
          <img src="img/icon-menu.svg" alt="">
        </button>
      </div>
      <div class="moxa-primary-row">
        <div class="moxa-header-inner">
          <nav class="moxa-mainnav" id="moxaMainnav" aria-label="Primary navigation">
            ${["Products", "Solutions", "Resources", "Support", "Why Moxa"]
              .map(navItem)
              .join("")}
          </nav>
          <div class="moxa-header-actions">
            <a class="moxa-header-action" href="https://www.moxa.com/contact-us">Contact Us</a>
          </div>
        </div>
      </div>
    </header>
  `;

  const footerMarkup = `
    <footer class="moxa-global-footer" data-shared-component="GlobalFooter">
      <div class="moxa-footer-top">
        <section class="moxa-footer-social-row" id="moxa-follow">
          <h2 class="moxa-footer-compact-title">Follow Moxa</h2>
          <div class="moxa-social-list" aria-label="Follow Moxa">
            <a href="https://www.facebook.com/MoxaInc" aria-label="Follow Moxa on Facebook"><img src="img/social-facebook.svg" alt=""></a>
            <a href="https://x.com/MoxaInc" aria-label="Follow Moxa on X"><img src="img/social-x.svg" alt=""></a>
            <a href="https://www.youtube.com/user/MoxaInc" aria-label="Follow Moxa on YouTube"><img src="img/social-youtube.svg" alt=""></a>
            <a href="https://www.linkedin.com/company/moxa/" aria-label="Follow Moxa on LinkedIn"><img src="img/social-linkedin.svg" alt=""></a>
          </div>
        </section>
        <section class="moxa-subscribe moxa-subscribe-row" id="moxa-subscribe">
          <div class="moxa-subscribe-copy">
            <h2 class="moxa-footer-compact-title">Stay connected</h2>
            <p class="moxa-subscribe-consent">Sign up for the latest updates on Moxa solutions. At Moxa, we have a healthy respect for privacy and will not share your email with anyone.</p>
          </div>
          <div class="moxa-subscribe-action">
            <form class="moxa-subscribe-form" id="moxaSubscribeForm">
              <label class="moxa-visually-hidden" for="moxaSubscribeEmail">Business email address</label>
              <input id="moxaSubscribeEmail" type="email" placeholder="Business email address" required>
              <button type="submit">Sign Up</button>
            </form>
            <div class="moxa-subscribe-message" id="moxaSubscribeMessage" aria-live="polite"></div>
          </div>
        </section>
      </div>
      <div class="moxa-footer-bottom">
        <div class="moxa-legal-links">
          <a href="https://www.moxa.com/en/about-us/legal/do-not-share-my-personal-information">Do not share my personal information</a>
          <a id="cookie-preferences" href="#cookie-preferences">COOKIE PREFERENCES</a>
          <a href="https://www.moxa.com/en/about-us/legal/privacy-policy">Privacy policy</a>
          <a href="https://www.moxa.com/en/about-us/legal/terms-of-use">Terms of Use</a>
          <a href="https://www.moxa.com/en/sitemap">Sitemap</a>
        </div>
        <label class="moxa-locale">
          Country / language
          <select id="moxaLocale">
            <option value="global-en" selected>Global / English</option>
            <option value="us-en">United States / English</option>
            <option value="tw-zh">台灣 / 繁體中文</option>
            <option value="cn-zh">中国 / 简体中文</option>
            <option value="de-de">Deutschland / Deutsch</option>
          </select>
        </label>
      </div>
    </footer>
  `;

  const advisorMarkup = `
    <button class="moxa-advisor-launcher" id="moxaAdvisorLauncher" type="button" aria-expanded="false" aria-controls="moxaAdvisorPanel" aria-label="Open Moxa AI Advisor">
      <img src="img/ai-advisor-icon.png" alt="">
    </button>
    <aside class="moxa-advisor-panel" id="moxaAdvisorPanel" aria-hidden="true" aria-label="Moxa AI Advisor">
      <div class="moxa-advisor-head">
        <div class="moxa-advisor-title">
          <img src="img/ai-advisor-icon.png" alt="">
          <div>
            <strong>Moxa Solution Advisor</strong>
            <span>Friendly guided discovery</span>
          </div>
        </div>
        <button class="moxa-advisor-close" id="moxaAdvisorClose" type="button">Close</button>
      </div>
      <div class="moxa-advisor-body" id="moxaAdvisorBody">
        <div class="moxa-advisor-welcome">
          <img src="img/ai-advisor-icon.png" alt="">
          <div>
            <h2>Hi, I’m here to help.</h2>
            <p>Tell me what you’re building, and I’ll guide you to a product path, resource, or next step that fits your project.</p>
          </div>
        </div>
        <div class="moxa-advisor-quick" aria-label="Suggested questions">
          <button type="button" data-advisor-prompt="Find the right switch">Find the right switch</button>
          <button type="button" data-advisor-prompt="Compare product families">Compare product families</button>
          <button type="button" data-advisor-prompt="Talk to an expert">Talk to an expert</button>
        </div>
        <div class="moxa-advisor-conversation" id="moxaAdvisorConversation" aria-live="polite">
          <div class="moxa-advisor-bubble is-bot">Not sure where to start? Answer a few quick questions and I’ll help narrow down your options.</div>
          <div class="moxa-advisor-bubble is-user">We need reliable networking for a smart manufacturing line.</div>
        </div>
        <form class="moxa-advisor-input" id="moxaAdvisorForm">
          <label class="moxa-visually-hidden" for="moxaAdvisorInput">Ask Moxa Solution Advisor</label>
          <input id="moxaAdvisorInput" type="text" autocomplete="off" placeholder="Ask about products, applications, or support">
          <button id="moxaAdvisorSend" type="submit">Send</button>
        </form>
        <div class="moxa-advisor-status" id="moxaAdvisorStatus" aria-live="polite"></div>
      </div>
    </aside>
  `;

  function removeLegacyShell() {
    const oldHeader =
      document.querySelector("body > header") ||
      document.querySelector("body > .header") ||
      document.querySelector(".header-v2");
    if (oldHeader) oldHeader.remove();

    document.querySelectorAll("footer:not(.moxa-global-footer)").forEach((footer) => footer.remove());

    document.querySelectorAll(".community, .community-grid").forEach((element) => {
      (element.closest("section") || element).remove();
    });

    document
      .querySelectorAll(
        "[data-moxa-advisor-toggle], [data-moxa-advisor-panel], .moxa-global-advisor-launch, .moxa-global-advisor-panel"
      )
      .forEach((element) => element.remove());
  }

  function insertSharedShell() {
    body.insertAdjacentHTML("afterbegin", headerMarkup);
    if (!document.querySelector(".moxa-global-footer")) {
      body.insertAdjacentHTML("beforeend", footerMarkup);
    }
    body.insertAdjacentHTML("beforeend", advisorMarkup);
  }

  function initializeBreadcrumb() {
    document.querySelectorAll('[aria-label="Breadcrumb"]').forEach((breadcrumb) => breadcrumb.remove());

    const items = breadcrumbMap[pageId];
    if (!items?.length) return;

    const markup = items
      .map(([label, href], index) => {
        const isCurrent = index === items.length - 1;
        const item = isCurrent
          ? `<span class="moxa-breadcrumb-current" aria-current="page">${escapeHtml(label)}</span>`
          : `<a class="${index === 0 ? "moxa-breadcrumb-home" : ""}" href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
        const separator = isCurrent
          ? ""
          : '<span class="moxa-breadcrumb-separator" aria-hidden="true"></span>';
        return `<li>${item}${separator}</li>`;
      })
      .join("");

    const header = document.querySelector(".moxa-global-header");
    header?.insertAdjacentHTML(
      "afterend",
      `<div class="moxa-breadcrumb-bar">
        <nav class="moxa-breadcrumb" aria-label="Breadcrumb">
          <ol>${markup}</ol>
        </nav>
      </div>`
    );
  }

  function closeNavigation(except) {
    document.querySelectorAll(".moxa-nav-trigger").forEach((button) => {
      if (button !== except) {
        button.setAttribute("aria-expanded", "false");
        button.closest(".moxa-nav-item")?.classList.remove("is-pinned");
      }
    });
  }

  function initializeNavigation() {
    const nav = document.getElementById("moxaMainnav");
    const menuToggle = document.getElementById("moxaMenuToggle");
    const search = document.getElementById("moxaGlobalSearch");
    const searchToggle = document.getElementById("moxaSearchToggle");
    const utilities = document.getElementById("moxaUtilityLinks");
    const accountToggle = document.getElementById("moxaAccountToggle");
    const desktopNavigation = window.matchMedia("(min-width: 769px)");
    let hoverCloseTimer = 0;

    function setNavigationTrigger(button, open) {
      if (!(button instanceof HTMLButtonElement)) return;
      if (open) closeNavigation(button);
      button.setAttribute("aria-expanded", open ? "true" : "false");
    }

    function clearHoverCloseTimer() {
      window.clearTimeout(hoverCloseTimer);
      hoverCloseTimer = 0;
    }

    function closeNavigationUi() {
      clearHoverCloseTimer();
      closeNavigation();
      nav?.classList.remove("is-open");
      search?.classList.remove("is-open");
      utilities?.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
      searchToggle?.setAttribute("aria-expanded", "false");
      accountToggle?.setAttribute("aria-expanded", "false");
    }

    function handleOutsidePointerDown(event) {
      const target = event.target;
      if (target instanceof Element && target.closest(".moxa-nav-item")) return;
      closeNavigationUi();
    }

    document.querySelectorAll(".moxa-nav-trigger").forEach((button) => {
      const item = button.closest(".moxa-nav-item");
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        clearHoverCloseTimer();
        const pinned = item?.classList.contains("is-pinned");
        closeNavigation(button);
        item?.classList.toggle("is-pinned", !pinned);
        setNavigationTrigger(button, !pinned);
      });

      item?.addEventListener("pointerenter", () => {
        if (!desktopNavigation.matches) return;
        clearHoverCloseTimer();
        setNavigationTrigger(button, true);
      });
      item?.addEventListener("pointerleave", () => {
        if (!desktopNavigation.matches) return;
        if (item.classList.contains("is-pinned")) return;
        clearHoverCloseTimer();
        hoverCloseTimer = window.setTimeout(() => setNavigationTrigger(button, false), 140);
      });
      item?.addEventListener("focusin", () => {
        clearHoverCloseTimer();
        setNavigationTrigger(button, true);
      });
      item?.addEventListener("focusout", (event) => {
        if (item.contains(event.relatedTarget)) return;
        if (item.classList.contains("is-pinned")) return;
        setNavigationTrigger(button, false);
      });
    });

    if (menuToggle && nav) {
      menuToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const opening = !nav.classList.contains("is-open");
        nav.classList.toggle("is-open", opening);
        menuToggle.setAttribute("aria-expanded", opening ? "true" : "false");
        search?.classList.remove("is-open");
        utilities?.classList.remove("is-open");
      });
    }

    if (searchToggle && search) {
      searchToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const opening = !search.classList.contains("is-open");
        search.classList.toggle("is-open", opening);
        searchToggle.setAttribute("aria-expanded", opening ? "true" : "false");
        nav?.classList.remove("is-open");
        utilities?.classList.remove("is-open");
        if (opening) document.getElementById("moxaGlobalSearchInput")?.focus();
      });
    }

    if (accountToggle && utilities) {
      accountToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const opening = !utilities.classList.contains("is-open");
        utilities.classList.toggle("is-open", opening);
        accountToggle.setAttribute("aria-expanded", opening ? "true" : "false");
        nav?.classList.remove("is-open");
        search?.classList.remove("is-open");
      });
    }

    document.addEventListener("pointerdown", handleOutsidePointerDown, true);
    window.addEventListener("scroll", closeNavigationUi, { passive: true });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      closeNavigationUi();
    });
  }

  function initializeSearchAndAdvisor() {
    const searchForm = document.getElementById("moxaGlobalSearch");
    const searchInput = document.getElementById("moxaGlobalSearchInput");
    const aiToggle = document.getElementById("moxaAiMode");
    const launcher = document.getElementById("moxaAdvisorLauncher");
    const panel = document.getElementById("moxaAdvisorPanel");
    const close = document.getElementById("moxaAdvisorClose");
    const advisorBody = document.getElementById("moxaAdvisorBody");
    const advisorConversation = document.getElementById("moxaAdvisorConversation");
    const advisorForm = document.getElementById("moxaAdvisorForm");
    const advisorInput = document.getElementById("moxaAdvisorInput");
    const advisorSend = document.getElementById("moxaAdvisorSend");
    const advisorStatus = document.getElementById("moxaAdvisorStatus");

    function setAdvisor(open) {
      panel?.classList.toggle("is-open", open);
      panel?.setAttribute("aria-hidden", open ? "false" : "true");
      launcher?.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) window.setTimeout(() => advisorInput?.focus(), 180);
    }

    function scrollAdvisorConversation() {
      if (advisorConversation) advisorConversation.scrollTop = advisorConversation.scrollHeight;
    }

    function addAdvisorMessage(type, text) {
      const bubble = document.createElement("div");
      bubble.className = `moxa-advisor-bubble ${type === "user" ? "is-user" : "is-bot"}`;
      bubble.textContent = text;
      advisorConversation?.appendChild(bubble);
      scrollAdvisorConversation();
      return bubble;
    }

    function addAdvisorActions(actions) {
      const row = document.createElement("div");
      row.className = "moxa-advisor-actions";
      actions.forEach((action, index) => {
        const link = document.createElement("a");
        link.href = action.href;
        link.textContent = action.label;
        if (index > 0) link.classList.add("is-secondary");
        row.appendChild(link);
      });
      advisorConversation?.appendChild(row);
      scrollAdvisorConversation();
    }

    function resolveAdvisorReply(prompt) {
      const normalized = prompt.toLowerCase();
      if (/compare|difference|family|families|lv|hv/.test(normalized)) {
        return {
          message: "You can compare product families side by side, then drill into the EDS-4008 LV and HV models with cited engineering sources.",
          actions: [
            { label: "Compare LV / HV", href: "compare-lv-hv.html" },
            { label: "View EDS-4008 Series", href: "product-series-eds-4008.html" },
          ],
        };
      }
      if (/expert|sales|contact|quote|human|help/.test(normalized)) {
        return {
          message: "I can connect you with the Moxa team. Continue with your application context, or reach the contact page directly.",
          actions: [
            { label: "Contact Moxa", href: "https://www.moxa.com/contact-us" },
            { label: "Review Technical Support", href: "manual.html" },
          ],
        };
      }
      if (/document|datasheet|manual|resource|guide|download/.test(normalized)) {
        return {
          message: "Use the technical resource path to validate specifications, manuals, and source documents before selecting a model.",
          actions: [
            { label: "Open HXML Manual", href: "manual.html" },
            { label: "Browse Resources", href: "search.html?q=EDS-4008" },
          ],
        };
      }
      if (/factory|manufactur|line|plant|solution|application/.test(normalized)) {
        return {
          message: "For a smart manufacturing line, start with the factory-network solution, then narrow the managed switch family by environment and redundancy needs.",
          actions: [
            { label: "Explore Factory Network", href: "microsite.html" },
            { label: "View Ethernet Switches", href: "product-category-ethernet-switches.html" },
          ],
        };
      }
      return {
        message: "For industrial networking, managed Ethernet switches are the usual starting point. I can help narrow the family by environment, port count, redundancy, and power input.",
        actions: [
          { label: "View Ethernet Switches", href: "product-category-ethernet-switches.html" },
          { label: "Open Product Search", href: `search.html?q=${encodeURIComponent(prompt)}` },
        ],
      };
    }

    function handleAdvisorPrompt(prompt) {
      const text = prompt?.trim() || "";
      if (!text) {
        advisorInput?.focus();
        return;
      }
      setAdvisor(true);
      addAdvisorMessage("user", text);
      if (advisorInput) advisorInput.value = "";
      if (advisorSend) advisorSend.disabled = true;
      if (advisorStatus) advisorStatus.textContent = "Moxa Solution Advisor is preparing a recommendation.";
      const typing = document.createElement("div");
      typing.className = "moxa-advisor-bubble is-bot is-typing";
      typing.innerHTML = "<i></i><i></i><i></i>";
      advisorConversation?.appendChild(typing);
      scrollAdvisorConversation();
      window.setTimeout(() => {
        typing.remove();
        const reply = resolveAdvisorReply(text);
        addAdvisorMessage("bot", reply.message);
        addAdvisorActions(reply.actions);
        if (advisorSend) advisorSend.disabled = false;
        if (advisorStatus) advisorStatus.textContent = "Recommendation ready.";
      }, 420);
    }

    aiToggle?.addEventListener("click", () => {
      const enabled = aiToggle.getAttribute("aria-pressed") !== "true";
      aiToggle.setAttribute("aria-pressed", enabled ? "true" : "false");
      if (searchInput) {
        searchInput.placeholder = enabled
          ? "Ask Moxa AI about products or applications"
          : "Search products, solutions, and resources";
        searchInput.focus();
      }
    });

    searchForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = searchInput?.value.trim() || "";
      if (!query) {
        searchInput?.focus();
        return;
      }
      if (aiToggle?.getAttribute("aria-pressed") === "true") {
        handleAdvisorPrompt(query);
      } else {
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
      }
    });

    launcher?.addEventListener("click", () => {
      setAdvisor(panel?.getAttribute("aria-hidden") === "true");
    });
    close?.addEventListener("click", () => setAdvisor(false));
    advisorBody?.querySelectorAll("[data-advisor-prompt]").forEach((button) => {
      button.addEventListener("click", () => handleAdvisorPrompt(button.dataset.advisorPrompt));
    });
    advisorForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      handleAdvisorPrompt(advisorInput?.value || "");
    });
  }

  function initializeFooter() {
    const form = document.getElementById("moxaSubscribeForm");
    const message = document.getElementById("moxaSubscribeMessage");
    const locale = document.getElementById("moxaLocale");
    const defaultLocale = "global-en";

    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (message) {
        message.textContent =
          "Thank you. The PoC records the subscription interaction; production routing is configured in Sitecore and the marketing platform.";
      }
    });

    try {
      const savedLocale = localStorage.getItem("moxa-poc-locale");
      if (locale) {
        const localeValues = new Set(Array.from(locale.options, (option) => option.value));
        locale.value = localeValues.has(savedLocale) ? savedLocale : defaultLocale;
        if (locale.value !== savedLocale) {
          localStorage.setItem("moxa-poc-locale", locale.value);
        }
      }
    } catch (_error) {
      if (locale) locale.value = defaultLocale;
    }

    locale?.addEventListener("change", () => {
      try {
        localStorage.setItem("moxa-poc-locale", locale.value);
      } catch (_error) {
        // Locale selection remains usable in the current view.
      }
    });
  }

  removeLegacyShell();
  insertSharedShell();
  initializeBreadcrumb();
  initializeNavigation();
  initializeSearchAndAdvisor();
  initializeFooter();
})();
