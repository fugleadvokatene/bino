// formerpatients.js
var sortState = {};
document.querySelectorAll("th[data-sort]").forEach((th) => {
  if (th.classList.contains("sort-asc")) sortState[th.dataset.sort] = "asc";
  if (th.classList.contains("sort-desc")) sortState[th.dataset.sort] = "desc";
});
function cellValue(row, col) {
  const cell = row.children[col];
  const k = cell.dataset.sortKey;
  if (k !== void 0) return Number(k);
  return cell.textContent.trim().toLowerCase();
}
function sortTable(col, th) {
  const tbody = document.querySelector(".search-container tbody");
  const rows = Array.from(tbody.querySelectorAll(".filter-box"));
  const dir = sortState[col] === "asc" ? "desc" : "asc";
  sortState = { [col]: dir };
  document.querySelectorAll("th[data-sort]").forEach((h) => h.classList.remove("sort-asc", "sort-desc"));
  th.classList.add(dir === "asc" ? "sort-asc" : "sort-desc");
  rows.sort((a, b) => {
    const va = cellValue(a, col);
    const vb = cellValue(b, col);
    if (va < vb) return dir === "asc" ? -1 : 1;
    \u00E5;
    if (va > vb) return dir === "asc" ? 1 : -1;
    return 0;
  });
  rows.forEach((r) => tbody.appendChild(r));
}
document.addEventListener("click", (e) => {
  const th = e.target.closest("th[data-sort]");
  if (!th) return;
  sortTable(Number(th.dataset.sort), th);
});
function filterFormer() {
  const q = document.getElementById("former-search").value.trim().toLowerCase();
  const boxes = document.querySelectorAll(".filter-box");
  const container = document.querySelector(".search-container");
  const searchBox = document.getElementById("former-search");
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
  if (e.target && e.target.id === "former-search") filterFormer();
});
document.addEventListener("DOMContentLoaded", filterFormer);
