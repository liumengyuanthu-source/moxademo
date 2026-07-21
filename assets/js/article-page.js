(function () {
  "use strict";

  var progress = document.getElementById("articleProgress");
  var sections = Array.prototype.slice.call(document.querySelectorAll("[data-article-section]"));
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll("[data-toc-link]"));
  var statusNodes = Array.prototype.slice.call(document.querySelectorAll(".article-status"));

  function setProgress() {
    if (!progress) return;
    var scrollable = document.documentElement.scrollHeight - window.innerHeight;
    var value = scrollable > 0 ? Math.min(100, Math.max(0, window.scrollY / scrollable * 100)) : 0;
    progress.style.width = value.toFixed(2) + "%";
  }

  function setActiveSection(id) {
    tocLinks.forEach(function (link) {
      var active = link.getAttribute("href") === "#" + id;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      var visible = entries
        .filter(function (entry) { return entry.isIntersecting; })
        .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
      if (visible[0]) setActiveSection(visible[0].target.id);
    }, { rootMargin: "-22% 0px -62% 0px", threshold: [0, 0.1, 0.3] });
    sections.forEach(function (section) { observer.observe(section); });
  }

  window.addEventListener("scroll", setProgress, { passive: true });
  window.addEventListener("resize", setProgress, { passive: true });
  setProgress();

  var saveButtons = Array.prototype.slice.call(document.querySelectorAll("[data-save-article]"));
  var saved = false;
  try { saved = sessionStorage.getItem("moxa-tsn-article-saved") === "true"; } catch (error) {}

  function paintSaved() {
    saveButtons.forEach(function (button) {
      button.setAttribute("aria-pressed", saved ? "true" : "false");
      button.textContent = saved ? "Saved" : "Save";
    });
  }

  saveButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      saved = !saved;
      try { sessionStorage.setItem("moxa-tsn-article-saved", String(saved)); } catch (error) {}
      paintSaved();
    });
  });
  paintSaved();

  document.querySelectorAll("[data-copy-link]").forEach(function (button) {
    button.addEventListener("click", function () {
      var url = "https://www.moxa.com/en/articles/taking-proven-benefits-of-tsn-to-the-real-world";
      var original = button.textContent;
      var done = function () {
        button.textContent = "Link copied";
        window.setTimeout(function () { button.textContent = original; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done).catch(function () { window.prompt("Copy this link", url); });
      } else {
        window.prompt("Copy this link", url);
      }
    });
  });

  document.querySelectorAll("[data-rating]").forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelectorAll("[data-rating]").forEach(function (item) {
        item.classList.toggle("is-selected", item === button);
        item.setAttribute("aria-pressed", item === button ? "true" : "false");
      });
      statusNodes.forEach(function (node) {
        node.textContent = "Thank you. Your feedback has been recorded for this demonstration.";
      });
    });
  });

  function toggleFaq(button, forceOpen) {
    var item = button.closest(".article-faq-item");
    if (!item) return;
    var panelId = button.getAttribute("aria-controls");
    var panel = panelId ? document.getElementById(panelId) : null;
    var shouldOpen = typeof forceOpen === "boolean" ? forceOpen : !item.classList.contains("is-open");
    item.classList.toggle("is-open", shouldOpen);
    button.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
    if (panel) panel.hidden = !shouldOpen;
  }

  document.querySelectorAll("[data-article-faq] .article-faq-button").forEach(function (button) {
    toggleFaq(button, button.getAttribute("aria-expanded") === "true");
    button.addEventListener("click", function () {
      toggleFaq(button);
    });
  });

  var videoModal = document.querySelector("[data-video-modal]");
  var videoFrame = document.querySelector("[data-video-frame]");
  var lastVideoTrigger = null;

  function openVideoModal(trigger) {
    if (!videoModal || !videoFrame) return;
    lastVideoTrigger = trigger;
    videoFrame.setAttribute("src", trigger.getAttribute("data-video-source") || "about:blank");
    videoModal.hidden = false;
    document.documentElement.classList.add("has-article-video-modal");
    var closeButton = videoModal.querySelector("[data-video-close]");
    if (closeButton) closeButton.focus();
  }

  function closeVideoModal() {
    if (!videoModal || !videoFrame) return;
    videoFrame.setAttribute("src", "about:blank");
    videoModal.hidden = true;
    document.documentElement.classList.remove("has-article-video-modal");
    if (lastVideoTrigger) lastVideoTrigger.focus();
  }

  document.querySelectorAll("[data-video-open]").forEach(function (button) {
    button.addEventListener("click", function () {
      openVideoModal(button);
    });
  });

  document.querySelectorAll("[data-video-close]").forEach(function (button) {
    button.addEventListener("click", closeVideoModal);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && videoModal && !videoModal.hidden) closeVideoModal();
  });

  var relatedTrack = document.querySelector("[data-related-track]");
  var relatedPrev = document.querySelector("[data-related-prev]");
  var relatedNext = document.querySelector("[data-related-next]");

  function setRelatedButton(button, disabled) {
    if (!button) return;
    button.disabled = disabled;
    button.setAttribute("aria-disabled", disabled ? "true" : "false");
  }

  function updateRelatedNav() {
    if (!relatedTrack || !relatedPrev || !relatedNext) return;
    var cards = Array.prototype.slice.call(relatedTrack.querySelectorAll("a"));
    if (cards.length <= 3) {
      setRelatedButton(relatedPrev, true);
      setRelatedButton(relatedNext, true);
      return;
    }
    var maxScroll = Math.max(0, relatedTrack.scrollWidth - relatedTrack.clientWidth - 2);
    setRelatedButton(relatedPrev, relatedTrack.scrollLeft <= 2);
    setRelatedButton(relatedNext, relatedTrack.scrollLeft >= maxScroll);
  }

  function moveRelated(direction) {
    if (!relatedTrack) return;
    var firstCard = relatedTrack.querySelector("a");
    var gap = parseFloat(window.getComputedStyle(relatedTrack).columnGap || "24") || 24;
    var cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 296;
    var amount = cardWidth + gap;
    relatedTrack.scrollBy({ left: direction * amount, behavior: "smooth" });
    window.setTimeout(updateRelatedNav, 260);
  }

  if (relatedPrev) {
    relatedPrev.addEventListener("click", function () {
      if (relatedPrev.disabled) return;
      moveRelated(-1);
    });
  }

  if (relatedNext) {
    relatedNext.addEventListener("click", function () {
      if (relatedNext.disabled) return;
      moveRelated(1);
    });
  }
  if (relatedTrack) relatedTrack.addEventListener("scroll", updateRelatedNav, { passive: true });
  window.addEventListener("resize", updateRelatedNav, { passive: true });
  updateRelatedNav();
})();
