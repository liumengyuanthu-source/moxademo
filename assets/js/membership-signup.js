(function () {
  "use strict";

  var workflow = document.querySelector('[data-workflow="anonymous-membership-registration"]');
  if (!workflow) return;

  var steps = ["account-details", "profile-confirmation", "membership-complete"];
  var panels = Array.prototype.slice.call(document.querySelectorAll(".member-panel"));
  var tabs = Array.prototype.slice.call(document.querySelectorAll("[data-member-step-tab]"));
  var form = document.getElementById("membershipForm");
  var status = document.getElementById("memberFormStatus");
  var summary = document.getElementById("memberConfirmSummary");
  var latestMembershipPayload = null;

  function getField(id) {
    var field = document.getElementById(id);
    return field ? field.value.trim() : "";
  }

  function setStep(step) {
    var index = steps.indexOf(step);
    if (index < 0) index = 0;
    panels.forEach(function (panel) {
      var active = panel.getAttribute("data-step") === steps[index];
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);
    });
    tabs.forEach(function (tab, tabIndex) {
      tab.classList.toggle("is-active", tabIndex === index);
      tab.classList.toggle("is-complete", tabIndex < index);
      tab.setAttribute("aria-current", tabIndex === index ? "step" : "false");
    });
  }

  function validateForm() {
    if (!form) return false;
    var required = Array.prototype.slice.call(form.querySelectorAll("[required]"));
    var invalid = required.find(function (field) {
      if (field.type === "checkbox") return !field.checked;
      return !field.value.trim();
    });
    if (invalid) {
      if (status) status.textContent = "Please complete the required fields before continuing.";
      invalid.focus();
      return false;
    }
    if (status) status.textContent = "";
    return true;
  }

  function buildMembershipPayload() {
    var firstName = getField("member-first-name");
    var lastName = getField("member-last-name");
    var email = getField("member-business-email");
    var company = getField("member-company");
    var country = getField("member-country");
    var industry = getField("member-industry");
    var interest = getField("member-interest");
    var membershipId = "MYMOXA-POC-" + Date.now().toString().slice(-6);
    return {
      source: "Moxa SitecoreAI PoC",
      workflow: "anonymous-membership-registration",
      crmSystem: "Salesforce CRM",
      crmSyncState: "ready",
      visitorStateBefore: "anonymous",
      visitorStateAfter: "registered",
      membershipId: membershipId,
      profileType: "My Moxa profile",
      requester: {
        firstName: firstName,
        lastName: lastName,
        businessEmail: email,
        company: company,
        industry: industry,
        country: country,
        primaryInterest: interest
      },
      personalizationSignals: [
        "membership_registered",
        "business_email_known",
        "eds_4008_interest"
      ],
      nextBestActions: [
        "Continue to quote workflow",
        "Save product comparisons",
        "Recover downloads and support handoff"
      ]
    };
  }

  function syncMembershipPayloadToCrm(payload) {
    latestMembershipPayload = payload;
    try {
      sessionStorage.setItem("moxaMembershipProfile", JSON.stringify(payload));
      sessionStorage.setItem("moxaMembershipCrmPayload", JSON.stringify(payload));
      sessionStorage.setItem("moxaVisitorState", "registered");
    } catch (error) {}
    return latestMembershipPayload;
  }

  function renderSummary() {
    if (!summary) return;
    var rows = [
      ["Name", getField("member-first-name") + " " + getField("member-last-name")],
      ["Business email", getField("member-business-email")],
      ["Company", getField("member-company")],
      ["Industry", getField("member-industry")],
      ["Country / region", getField("member-country")],
      ["Primary interest", getField("member-interest")]
    ];
    summary.innerHTML = rows.map(function (row) {
      return "<div><span>" + row[0] + "</span><strong>" + row[1] + "</strong></div>";
    }).join("");
  }

  function submitRegistration() {
    var payload = buildMembershipPayload();
    syncMembershipPayloadToCrm(payload);
    document.body.setAttribute("data-visitor-state", "registered");
    setStep("membership-complete");
    document.dispatchEvent(new CustomEvent("moxa:membership:registered", {
      detail: {
        event: "membership_registration_submit",
        crmSystem: payload.crmSystem,
        crmSyncState: payload.crmSyncState,
        membershipId: payload.membershipId,
        businessEmail: payload.requester.businessEmail,
        company: payload.requester.company,
        visitorStateAfter: payload.visitorStateAfter
      }
    }));
  }

  document.querySelectorAll("[data-member-step-tab]").forEach(function (button) {
    button.addEventListener("click", function () {
      var step = button.getAttribute("data-member-step-tab");
      if (step === "profile-confirmation" && !validateForm()) return;
      if (step === "membership-complete") return;
      if (step === "profile-confirmation") renderSummary();
      setStep(step);
    });
  });

  var continueButton = document.querySelector("[data-member-continue]");
  if (continueButton) {
    continueButton.addEventListener("click", function () {
      if (!validateForm()) return;
      renderSummary();
      setStep("profile-confirmation");
    });
  }

  document.querySelectorAll("[data-member-back]").forEach(function (button) {
    button.addEventListener("click", function () {
      setStep("account-details");
    });
  });

  var submitButton = document.getElementById("membershipSubmit");
  if (submitButton) {
    submitButton.addEventListener("click", function () {
      submitRegistration();
    });
  }

  setStep("account-details");
})();
