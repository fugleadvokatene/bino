// largestfiles.ts
document.addEventListener("click", async (e) => {
  const btn = e.target?.closest(
    "[data-delete-original]"
  );
  if (!btn) return;
  const url = btn.dataset.deleteOriginal;
  if (!url) return;
  btn.disabled = true;
  const resp = await fetch(url, { method: "POST" });
  if (resp.ok) {
    btn.closest("tr")?.remove();
  } else {
    btn.disabled = false;
    const msg = await resp.text();
    alert(msg);
  }
});
