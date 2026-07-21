(function () {
  var MOXA_CROSS_SELL_RELATIONSHIPS = {
    "eds-4008": {
      sourceProduct: "EDS-4008 Series",
      sourceRole: "Managed industrial Ethernet backbone",
      recommendedProductId: "nport-5100",
      recommendedProduct: "NPort 5100 Series",
      recommendedRole: "Serial-to-Ethernet device connectivity",
      relationType: "legacy-device-connectivity",
      destination: "nport-5100-series.html?from=eds-4008&journey=complete-architecture",
      returnUrl: "product-series-eds-4008.html",
      contextTitle: "Recommended from your EDS-4008 network scenario",
      contextCopy: "You are building a managed industrial Ethernet network. NPort 5100 can help bring existing serial devices into the same architecture."
    },
    "nport-5100": {
      sourceProduct: "NPort 5100 Series",
      sourceRole: "Serial-to-Ethernet device connectivity",
      recommendedProductId: "eds-4008",
      recommendedProduct: "EDS-4008 Series",
      recommendedRole: "Managed industrial Ethernet backbone",
      relationType: "complementary-infrastructure",
      destination: "product-series-eds-4008.html?from=nport-5100&journey=complete-architecture",
      returnUrl: "nport-5100-series.html",
      contextTitle: "Recommended from your NPort 5100 connectivity scenario",
      contextCopy: "You are building a serial-to-Ethernet architecture. EDS-4008 can provide the managed industrial Ethernet backbone for the next stage of the network."
    }
  };

  window.MOXA_CROSS_SELL_RELATIONSHIPS = MOXA_CROSS_SELL_RELATIONSHIPS;

  var STORAGE_KEY = "moxaCrossSellJourney";
  var SHORTLIST_TEXT = "Added to solution shortlist: NPort 5100 + EDS-4008";

  function emitCrossSellEvent(eventName, detail) {
    var payload = Object.assign(
      {
        event: eventName,
        timestamp: new Date().toISOString(),
        storageKey: STORAGE_KEY
      },
      detail || {}
    );
    window.dispatchEvent(new CustomEvent(eventName, { detail: payload }));
    if (window.console && typeof window.console.info === "function") {
      window.console.info("[Moxa cross-sell]", payload);
    }
  }

  function readState() {
    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
    } catch (error) {
      return {};
    }
  }

  function writeState(nextState) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    } catch (error) {
      emitCrossSellEvent("moxa_cross_sell_storage_error", { message: error.message });
    }
  }

  function persistJourney(sourceId, action) {
    var relationship = MOXA_CROSS_SELL_RELATIONSHIPS[sourceId];
    if (!relationship) return;
    var solutionProducts = ["nport-5100", "eds-4008"];
    writeState({
      entryProduct: sourceId,
      currentProduct: currentPageProductId(),
      sourceId: sourceId,
      sourceProduct: relationship.sourceProduct,
      recommendedProduct: relationship.recommendedProductId,
      relationshipType: relationship.relationType,
      relationType: relationship.relationType,
      journey: "complete-architecture",
      lastAction: action,
      solutionProducts: solutionProducts,
      updatedAt: new Date().toISOString(),
      timestamp: new Date().toISOString()
    });
  }

  function showToast(message) {
    var toast = document.querySelector(".solution-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "solution-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = message || SHORTLIST_TEXT;
    toast.classList.add("is-visible");
    window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 3200);
  }

  function currentPageProductId() {
    var module = document.querySelector("[data-cross-sell-product]");
    if (module) return module.getAttribute("data-cross-sell-product");
    var page = document.body && document.body.getAttribute("data-moxa-page");
    if (page === "eds-4008-series") return "eds-4008";
    if (page === "nport-5100-series") return "nport-5100";
    return "";
  }

  function applyContextBanner() {
    var params = new URLSearchParams(window.location.search);
    var sourceId = params.get("from");
    var journey = params.get("journey");
    var currentId = currentPageProductId();
    var sourceRelationship = MOXA_CROSS_SELL_RELATIONSHIPS[sourceId];
    var banner = document.querySelector("[data-cross-sell-context-banner]");
    if (!banner || !sourceRelationship || journey !== "complete-architecture" || sourceId === currentId) {
      return;
    }

    var title = banner.querySelector("[data-cross-sell-context-title]");
    var copy = banner.querySelector("[data-cross-sell-context-copy]");
    var backLink = banner.querySelector('[data-action="return-to-source"]');
    if (title) title.textContent = sourceRelationship.contextTitle;
    if (copy) copy.textContent = sourceRelationship.contextCopy;
    if (backLink) backLink.setAttribute("href", sourceRelationship.returnUrl);
    banner.hidden = false;

    emitCrossSellEvent("moxa_cross_sell_arrive", {
      from: sourceId,
      to: currentId,
      relationType: sourceRelationship.relationType,
      journey: journey
    });
  }

  function wireCrossSellModule() {
    var module = document.querySelector("[data-cross-sell-product]");
    if (!module) return;
    var sourceId = module.getAttribute("data-cross-sell-product");
    var relationship = MOXA_CROSS_SELL_RELATIONSHIPS[sourceId];
    if (!relationship) return;

    emitCrossSellEvent("moxa_cross_sell_impression", {
      sourceProduct: relationship.sourceProduct,
      recommendedProduct: relationship.recommendedProduct,
      relationType: relationship.relationType
    });

    var primary = module.querySelector("[data-cross-sell-primary]");
    if (primary) {
      primary.addEventListener("click", function () {
        persistJourney(sourceId, "primary_click");
        emitCrossSellEvent("moxa_cross_sell_click", {
          sourceProduct: relationship.sourceProduct,
          recommendedProduct: relationship.recommendedProduct,
          relationType: relationship.relationType,
          destination: relationship.destination
        });
      });
    }
  }

  function wireGlobalActions() {
    document.addEventListener("click", function (event) {
      var addBoth = event.target.closest('[data-action="add-both-to-solution"]');
      if (addBoth) {
        var sourceId = currentPageProductId();
        persistJourney(sourceId, "add_both");
        emitCrossSellEvent("moxa_cross_sell_add_both", {
          sourceProduct: MOXA_CROSS_SELL_RELATIONSHIPS[sourceId] && MOXA_CROSS_SELL_RELATIONSHIPS[sourceId].sourceProduct,
          products: ["NPort 5100 Series", "EDS-4008 Series"],
          solutionProducts: ["nport-5100", "eds-4008"]
        });
        showToast(SHORTLIST_TEXT);
      }

      var returnLink = event.target.closest('[data-action="return-to-source"]');
      if (returnLink) {
        emitCrossSellEvent("moxa_cross_sell_return_to_source", {
          href: returnLink.getAttribute("href"),
          state: readState()
        });
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyContextBanner();
    wireCrossSellModule();
    wireGlobalActions();
  });
})();
