(function () {
  "use strict";

  const workflow = document.getElementById("quoteWorkflow");
  if (!workflow) return;

  const stepOrder = ["cart", "accessory", "requester", "submitted"];
  const stepLabels = {
    cart: "Review quote list",
    accessory: "Add required accessory",
    requester: "Confirm your details",
    submitted: "Request submitted",
  };
  const panels = Array.from(workflow.querySelectorAll("[data-quote-step]"));
  const progressItems = Array.from(workflow.querySelectorAll("[data-progress-step]"));
  const status = document.getElementById("quoteStepStatus");
  const form = document.getElementById("quoteRequesterForm");
  const message = document.getElementById("quoteFormMessage");
  const accessoryButton = workflow.querySelector('[data-action="add-accessory"]');
  const accessoryNext = workflow.querySelector('[data-quote-step="accessory"] [data-action="next-step"]');
  const accessoryState = workflow.querySelector("[data-accessory-state]");
  const reference = document.getElementById("quoteReference");
  let currentStep = "cart";
  let accessoryAdded = false;

  function recordEvent(name, detail) {
    const event = {
      name,
      detail: detail || {},
      occurredAt: new Date().toISOString(),
    };
    const log = JSON.parse(sessionStorage.getItem("moxaQuoteEventLog") || "[]");
    log.push(event);
    sessionStorage.setItem("moxaQuoteEventLog", JSON.stringify(log.slice(-30)));
    document.dispatchEvent(new CustomEvent("moxa:quote:event", { detail: event }));
  }

  function setStep(step, options) {
    if (!stepOrder.includes(step)) return;
    currentStep = step;
    const index = stepOrder.indexOf(step);

    panels.forEach((panel) => {
      const active = panel.dataset.quoteStep === step;
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);
    });

    progressItems.forEach((item, itemIndex) => {
      const active = item.dataset.progressStep === step;
      item.classList.toggle("is-active", active);
      item.classList.toggle("is-complete", itemIndex < index);
      if (active) item.setAttribute("aria-current", "step");
      else item.removeAttribute("aria-current");
    });

    if (status) {
      status.textContent = `Step ${index + 1} of ${stepOrder.length}: ${stepLabels[step]}`;
    }

    if (!options || options.scroll !== false) {
      workflow.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function getProductItems() {
    return ["EDS-4008-LV", "EDS-4008-HV"].map((sku) => {
      const quantity = workflow.querySelector(`[data-quote-quantity="${sku}"]`);
      return { sku, quantity: Math.max(1, Number(quantity && quantity.value) || 1) };
    });
  }

  function persistCartEvents() {
    getProductItems().forEach((item) => recordEvent("quote_item_add", item));
  }

  function addAccessory() {
    accessoryAdded = true;
    accessoryButton.setAttribute("aria-pressed", "true");
    accessoryButton.textContent = "Accessory added";
    accessoryButton.classList.add("is-added");
    accessoryNext.disabled = false;
    accessoryState.textContent = "Added";
    accessoryState.classList.add("is-added");
    const quantityField = workflow.querySelector("[data-accessory-quantity]");
    const quantity = Math.max(1, Number(quantityField && quantityField.value) || 1);
    recordEvent("quote_accessory_add", { sku: "SFP-1GEZXLC", quantity });
  }

  function validateForm() {
    const fields = Array.from(form.querySelectorAll("[required]"));
    fields.forEach((field) => field.removeAttribute("aria-invalid"));
    const invalid = fields.filter((field) => !field.checkValidity());
    if (!invalid.length) return true;

    invalid.forEach((field) => field.setAttribute("aria-invalid", "true"));
    message.textContent = "Please complete all required fields and confirm your consent.";
    invalid[0].focus();
    return false;
  }

  function getRequester() {
    const data = new FormData(form);
    return {
      firstName: String(data.get("firstName") || "").trim(),
      lastName: String(data.get("lastName") || "").trim(),
      email: String(data.get("email") || "").trim(),
      company: String(data.get("company") || "").trim(),
      industry: String(data.get("industry") || ""),
      country: String(data.get("country") || ""),
      projectDetails: String(data.get("projectDetails") || "").trim(),
    };
  }

  function buildSalesforcePayload() {
    const quantityField = workflow.querySelector("[data-accessory-quantity]");
    const accessoryQuantity = Math.max(1, Number(quantityField && quantityField.value) || 1);
    return {
      source: "Moxa SitecoreAI PoC",
      workflow: "online-quotation",
      integrationTarget: "salesforce",
      crmObject: "Lead + Quote_Request__c",
      products: getProductItems(),
      accessories: [{ sku: "SFP-1GEZXLC", quantity: accessoryQuantity }],
      requester: getRequester(),
      consent: document.getElementById("quoteConsent").checked,
      journeyContext: {
        route: window.location.pathname,
        pageAnchor: window.location.hash || "#quoteWorkflow",
        submittedAt: new Date().toISOString(),
      },
    };
  }

  function submitQuote(event) {
    event.preventDefault();
    message.textContent = "";
    if (!validateForm()) return;

    const payload = buildSalesforcePayload();
    const requestReference = `MOXA-RFQ-${Date.now().toString().slice(-8)}`;
    payload.reference = requestReference;
    sessionStorage.setItem("moxaQuoteWorkflow", JSON.stringify(payload));
    recordEvent("quote_submit", {
      reference: requestReference,
      destination: "salesforce",
      country: payload.requester.country,
    });
    document.dispatchEvent(new CustomEvent("moxa:quote:submitted", { detail: payload }));
    reference.textContent = requestReference;
    setStep("submitted");
  }

  workflow.addEventListener("click", (event) => {
    const control = event.target.closest("[data-action]");
    if (!control) return;
    const action = control.dataset.action;

    if (action === "add-accessory") {
      addAccessory();
      return;
    }

    if (action === "next-step") {
      if (currentStep === "cart") {
        persistCartEvents();
        setStep("accessory");
      } else if (currentStep === "accessory" && accessoryAdded) {
        setStep("requester");
      }
      return;
    }

    if (action === "previous-step") {
      const previousIndex = Math.max(0, stepOrder.indexOf(currentStep) - 1);
      setStep(stepOrder[previousIndex]);
      return;
    }

    if (action === "restart-quote") {
      form.reset();
      message.textContent = "";
      accessoryAdded = false;
      accessoryButton.setAttribute("aria-pressed", "false");
      accessoryButton.textContent = "Add accessory";
      accessoryButton.classList.remove("is-added");
      accessoryNext.disabled = true;
      accessoryState.textContent = "Required";
      accessoryState.classList.remove("is-added");
      setStep("cart");
    }
  });

  form.addEventListener("submit", submitQuote);
  form.addEventListener("input", (event) => {
    event.target.removeAttribute("aria-invalid");
    if (message) message.textContent = "";
  });

  setStep("cart", { scroll: false });
})();
