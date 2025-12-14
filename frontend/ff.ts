document.addEventListener('change', (e: Event) => {
  const target = e.target as HTMLInputElement | null
  if (!target || !target.classList.contains('ff-checkbox')) return

  const flag = target.dataset.flag
  const user = target.dataset.user
  if (!flag || !user) return

  const action = target.checked ? 'set' : 'clear'

  fetch(`/ff/${flag}/${user}/${action}`, {
    method: 'POST'
  })
})
