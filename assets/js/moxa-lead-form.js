(function () {
  "use strict";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function errorMessage(control) {
    if (control.name === "work_email" && control.value && !emailPattern.test(control.value)) {
      return "Enter a valid business email address.";
    }
    if (control.type === "checkbox") return "Accept the privacy notice to continue.";
    if (control.tagName === "SELECT") return "Select an option to continue.";
    return "Complete this required field.";
  }

  function isValid(control) {
    if (!control.required) return true;
    if (control.type === "checkbox") return control.checked;
    if (!control.value.trim()) return false;
    if (control.name === "work_email") return emailPattern.test(control.value);
    return true;
  }

  function fieldContainer(control) {
    return control.closest(".moxa-lead-field, .moxa-lead-consent");
  }

  function clearError(control) {
    const container = fieldContainer(control);
    if (!container) return;
    container.classList.remove("is-invalid");
    container.querySelector(".moxa-lead-error")?.remove();
    control.removeAttribute("aria-invalid");
    control.removeAttribute("aria-describedby");
  }

  function showError(control, index) {
    const container = fieldContainer(control);
    if (!container) return;
    clearError(control);
    const message = document.createElement("span");
    const id = `${control.name || "field"}-error-${index}`;
    message.id = id;
    message.className = "moxa-lead-error";
    message.textContent = errorMessage(control);
    container.appendChild(message);
    container.classList.add("is-invalid");
    control.setAttribute("aria-invalid", "true");
    control.setAttribute("aria-describedby", id);
  }

  function initializeForm(form, formIndex) {
    const controls = Array.from(form.querySelectorAll("input[required], select[required], textarea[required]"));
    const status = form.querySelector(".moxa-lead-status");

    controls.forEach((control, index) => {
      const validate = () => {
        if (isValid(control)) clearError(control);
        else showError(control, `${formIndex}-${index}`);
      };
      control.addEventListener("blur", validate);
      control.addEventListener(control.type === "checkbox" || control.tagName === "SELECT" ? "change" : "input", () => {
        if (control.getAttribute("aria-invalid") === "true") validate();
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let firstInvalid = null;
      controls.forEach((control, index) => {
        if (isValid(control)) clearError(control);
        else {
          showError(control, `${formIndex}-${index}`);
          firstInvalid ||= control;
        }
      });

      if (firstInvalid) {
        if (status) status.textContent = "Please review the highlighted fields.";
        firstInvalid.focus();
        return;
      }

      form.reset();
      controls.forEach(clearError);
      if (status) status.textContent = "Request received. A Moxa specialist will follow up within two business days.";
    });
  }

  document.querySelectorAll("[data-moxa-lead-form]").forEach(initializeForm);
})();
