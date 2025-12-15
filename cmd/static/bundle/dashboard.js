// common.ts
var QuerySelector = (sel, root = document) => root.querySelector(sel);
var MustQuerySelector = (sel, root = document) => {
  const v = QuerySelector(sel, root);
  if (!v) {
    throw new Error(`${sel} not found on ${root.nodeName}`);
  }
  return v;
};
var QuerySelectorAll = (sel, root = document) => Array.from(root.querySelectorAll(sel));
var languageSelect = QuerySelector("#language-select");
if (languageSelect) {
  languageSelect.addEventListener("change", () => {
    languageSelect.form?.submit();
  });
}
QuerySelectorAll(".closer").forEach(
  (el) => el.addEventListener("click", () => {
    el.parentElement?.style.setProperty("display", "none");
  })
);

// dashboard.ts
var captureScroll = (elem) => {
  let dragging = false;
  let lastX = 0;
  let pid = null;
  const isInteractive = (el) => el instanceof Element && el.closest(
    "a,button,input,select,textarea,label,summary,[contenteditable],form,.editable,.dashboard-patient-card"
  );
  const updateIndicators = () => {
    const left = QuerySelector("#dashboard-indicator-left");
    const right = QuerySelector("#dashboard-indicator-right");
    if (!left || !right) return;
    const atLeft = elem.scrollLeft <= 20;
    const atRight = elem.scrollLeft + elem.clientWidth >= elem.scrollWidth - 20;
    left.classList.toggle("invisible", atLeft);
    right.classList.toggle("invisible", atRight);
  };
  elem.addEventListener("pointerdown", (ev) => {
    if (ev.button !== 0) return;
    if (isInteractive(ev.target)) return;
    dragging = true;
    lastX = ev.clientX;
    pid = ev.pointerId;
    elem.setPointerCapture(pid);
  });
  elem.addEventListener(
    "pointermove",
    (ev) => {
      if (!dragging || ev.pointerId !== pid) return;
      const dx = ev.clientX - lastX;
      lastX = ev.clientX;
      elem.scrollLeft -= dx;
      updateIndicators();
      ev.preventDefault();
    },
    { passive: false }
  );
  const end = (ev) => {
    if (ev.pointerId !== pid) return;
    dragging = false;
    elem.releasePointerCapture(pid);
    pid = null;
  };
  elem.addEventListener("pointerup", end);
  elem.addEventListener("pointercancel", end);
  updateIndicators();
};
var setupBoard = (elem) => {
  captureScroll(elem);
  const K = "board-scroll-left";
  const F = "board-restore-once";
  const restore = () => {
    if (sessionStorage.getItem(F) === "1") {
      const v = Number(sessionStorage.getItem(K));
      if (!Number.isNaN(v)) elem.scrollLeft = v;
    }
    sessionStorage.removeItem(F);
    sessionStorage.removeItem(K);
  };
  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", restore, { once: true });
  } else {
    restore();
  }
  document.addEventListener(
    "submit",
    (e) => {
      if (e.target instanceof HTMLFormElement) {
        sessionStorage.setItem(F, "1");
        sessionStorage.setItem(K, String(elem.scrollLeft));
      }
    },
    true
  );
};
if (matchMedia("(width >= 1000px)").matches) {
  QuerySelectorAll(".dashboard").forEach(setupBoard);
}
var filterDashboard = () => {
  const input = MustQuerySelector("#dashboard-search");
  const container = MustQuerySelector(".search-container");
  const noneMsg = MustQuerySelector("#filter-none");
  const q = input.value.trim().toLowerCase();
  const boxes = QuerySelectorAll(".filter-box");
  const active = q.length > 0;
  container.classList.toggle("active-search", active);
  input.classList.toggle("active-search", active);
  if (!active) {
    boxes.forEach((b) => b.hidden = false);
    noneMsg.hidden = true;
    return;
  }
  let anyMatch = false;
  boxes.forEach((box) => {
    const match = QuerySelectorAll(".filter-content", box).some(
      (el) => el.textContent.toLowerCase().includes(q)
    );
    box.hidden = !match;
    if (match) anyMatch = true;
  });
  noneMsg.hidden = anyMatch;
};
document.addEventListener("input", (e) => {
  if (e.target?.id === "dashboard-search") {
    filterDashboard();
  }
});
document.addEventListener("DOMContentLoaded", filterDashboard);
