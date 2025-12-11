// dashboard.js
var captureScroll = (elem) => {
  let dragging = false, lastX = 0, pid = null;
  const isInteractive = (el) => el.closest("a,button,input,select,textarea,label,summary,[contenteditable],form,.editable,.dashboard-patient-card");
  const down = (ev) => {
    if (ev.button !== 0) return;
    if (isInteractive(ev.target)) return;
    dragging = true;
    lastX = ev.clientX;
    pid = ev.pointerId;
    elem.setPointerCapture(pid);
  };
  const move = (ev) => {
    if (!dragging || ev.pointerId !== pid) return;
    const dx = ev.clientX - lastX;
    lastX = ev.clientX;
    elem.scrollLeft -= dx;
    ev.preventDefault();
  };
  const up = (ev) => {
    if (ev.pointerId !== pid) return;
    dragging = false;
    elem.releasePointerCapture(pid);
    pid = null;
  };
  elem.addEventListener("pointerdown", down);
  elem.addEventListener("pointermove", move, { passive: false });
  elem.addEventListener("pointerup", up);
  elem.addEventListener("pointercancel", up);
};
var setupBoard = (elem) => {
  captureScroll(elem);
  const K = "board-scroll-left";
  const F = "board-restore-once";
  const restore = () => {
    if (sessionStorage.getItem(F) === "1") {
      const v = parseInt(sessionStorage.getItem(K) || "0", 10);
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
  document.addEventListener("submit", (e) => {
    if (e.target instanceof HTMLFormElement) {
      sessionStorage.setItem(F, "1");
      sessionStorage.setItem(K, String(elem.scrollLeft));
    }
  }, true);
};
if (matchMedia("(width >= 1000px)").matches) {
  document.querySelectorAll(".dashboard").forEach(setupBoard);
}
function filterDashboard() {
  const q = document.getElementById("dashboard-search").value.trim().toLowerCase();
  const boxes = document.querySelectorAll(".filter-box");
  const container = document.querySelector(".search-container");
  const searchBox = document.getElementById("dashboard-search");
  const noneMsg = document.getElementById("filter-none");
  const active = q.length > 0;
  [container, searchBox].forEach((el) => el.classList.toggle("active-search", active));
  if (!active) {
    boxes.forEach((b) => b.hidden = false);
    noneMsg.hidden = true;
    return;
  }
  let anyMatch = false;
  boxes.forEach((box) => {
    const items = box.querySelectorAll(".filter-content");
    let match = false;
    for (const el of items) {
      if (el.textContent.toLowerCase().includes(q)) {
        match = true;
        break;
      }
    }
    box.hidden = !match;
    if (match) anyMatch = true;
  });
  noneMsg.hidden = anyMatch;
}
document.addEventListener("input", (e) => {
  if (e.target && e.target.id === "dashboard-search") filterDashboard();
});
document.addEventListener("DOMContentLoaded", filterDashboard);
