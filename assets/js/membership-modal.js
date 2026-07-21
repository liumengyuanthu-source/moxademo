(function () {
  "use strict";

  var modal = document.getElementById("myMoxaSignupModal");
  if (!modal) return;

  var dialog = modal.querySelector(".member-modal-dialog");
  var closeButton = modal.querySelector("[data-member-modal-close]");
  var previousFocus = null;

  function focusableElements() {
    return Array.prototype.slice.call(
      modal.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter(function (element) {
      return !element.hidden && element.offsetParent !== null;
    });
  }

  function openModal() {
    if (!modal.hidden) return;
    previousFocus = document.activeElement;
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("member-modal-open");
    document.body.classList.add("member-modal-open");
    window.setTimeout(function () {
      var firstField = modal.querySelector("#member-first-name");
      (firstField || closeButton).focus();
    }, 30);
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("member-modal-open");
    document.body.classList.remove("member-modal-open");
    if (location.hash === "#my-moxa-signup") {
      history.replaceState(null, "", location.pathname + location.search);
    }
    if (previousFocus && typeof previousFocus.focus === "function") {
      previousFocus.focus();
    }
  }

  document.addEventListener("click", function (event) {
    var trigger = event.target.closest('a[href="#my-moxa-signup"], a[href="homepage.html#my-moxa-signup"], [data-member-modal-open]');
    if (trigger) {
      event.preventDefault();
      openModal();
      return;
    }
    if (event.target === modal) closeModal();
  });

  modal.querySelectorAll("[data-member-modal-close]").forEach(function (button) {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", function (event) {
    if (modal.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
      return;
    }
    if (event.key !== "Tab") return;
    var focusable = focusableElements();
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.addEventListener("hashchange", function () {
    if (location.hash === "#my-moxa-signup") openModal();
  });

  if (location.hash === "#my-moxa-signup") openModal();
})();
