// common.ts
var QuerySelector = (sel, root = document) => root.querySelector(sel);
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

// crud.ts
var collectFields = (root) => Array.from(root.querySelectorAll(".form-control"));
var setupCreateButton = (listener) => {
  const btn = document.getElementById("new-submit");
  if (!btn) return;
  btn.addEventListener("click", (e) => {
    const target = e.target instanceof Element ? e.target : null;
    const form = target?.closest("form");
    if (!form) return;
    const fields = collectFields(form);
    const { url, req } = listener(fields);
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req)
    }).then(() => location.reload());
  });
};
var setupUpdateButtons = (listener) => {
  document.addEventListener("click", (e) => {
    const target = e.target instanceof HTMLElement ? e.target : null;
    if (!target?.classList.contains("update-submit")) return;
    const id = MustDataNumber(target, "id");
    const form = target.closest("form");
    if (!form) return;
    const fields = collectFields(form);
    const { url, req } = listener(id, fields);
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req)
    }).then(() => location.reload());
  });
};

// speciesadmin.ts
var buildRequest = (formFields, base) => {
  formFields.forEach((field) => {
    const kind = field.dataset.field;
    if (kind === "latin") {
      base.Latin = field.value;
    } else if (kind === "lang") {
      const lang = field.dataset.lang;
      if (lang) base.Languages[lang] = field.value;
    }
  });
  return base;
};
setupCreateButton((formFields) => {
  const req = buildRequest(formFields, {
    Latin: "",
    Languages: {}
  });
  return { url: "/species", req };
});
setupUpdateButtons((id, formFields) => {
  const req = buildRequest(formFields, {
    Latin: "",
    Languages: {},
    ID: id
  });
  return { url: "/species", req };
});
