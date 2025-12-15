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
var DataNumber = (el, key) => {
  const v = Number(el.dataset[key]);
  return Number.isNaN(v) ? null : v;
};
var MustDataNumber = (el, key) => {
  const v = DataNumber(el, key);
  if (v === null) throw new Error(`Invalid data-${key}`);
  return v;
};
export {
  DataNumber,
  MustDataNumber,
  MustQuerySelector,
  QuerySelector,
  QuerySelectorAll
};
