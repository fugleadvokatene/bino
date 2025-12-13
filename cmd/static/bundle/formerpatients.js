// dom.ts
var QuerySelector = (sel, root = document) => root.querySelector(sel);
var QuerySelectorAll = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// formerpatients.ts
var sortState = {};
var getSortKey = (row, col) => {
  const cell = row.children[col];
  const key = cell.dataset.sortKey;
  return key !== void 0 ? Number(key) : cell.textContent.trim().toLowerCase();
};
var sortTable = (col, th) => {
  const tbody = QuerySelector(".search-container tbody");
  const rows = QuerySelectorAll(".filter-box", tbody);
  const dir = sortState[col] === "asc" ? "desc" : "asc";
  Object.keys(sortState).forEach((k) => delete sortState[+k]);
  sortState[col] = dir;
  QuerySelectorAll("th[data-sort]").forEach(
    (h) => h.classList.remove("sort-asc", "sort-desc")
  );
  th.classList.add(dir === "asc" ? "sort-asc" : "sort-desc");
  const posSortKey = dir === "asc" ? -1 : 1;
  rows.sort((a, b) => {
    const keyA = getSortKey(a, col);
    const keyB = getSortKey(b, col);
    if (keyA < keyB) return posSortKey;
    if (keyA > keyB) return -posSortKey;
    return 0;
  }).forEach((r) => tbody.appendChild(r));
};
var filterFormer = () => {
  const input = QuerySelector("#former-search");
  const q = input.value.trim().toLowerCase();
  const boxes = QuerySelectorAll(".filter-box");
  const container = QuerySelector(".search-container");
  const noneMsg = QuerySelector("#filter-none");
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
document.addEventListener("click", (e) => {
  const th = e.target.closest("th[data-sort]");
  if (th) sortTable(Number(th.dataset.sort), th);
});
document.addEventListener("input", (e) => {
  if (e.target?.id === "former-search") filterFormer();
});
document.addEventListener("DOMContentLoaded", filterFormer);
