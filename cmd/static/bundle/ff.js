// ff.ts
document.addEventListener("change", (e) => {
  const target = e.target;
  if (!target || !target.classList.contains("ff-checkbox")) return;
  const flag = target.dataset.flag;
  const user = target.dataset.user;
  if (!flag || !user) return;
  const action = target.checked ? "set" : "clear";
  fetch(`/ff/${flag}/${user}/${action}`, {
    method: "POST"
  });
});
