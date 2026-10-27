import 'htmx.org'
import Chart from 'chart.js/auto'
import 'chartjs-adapter-date-fns'

type ChartData = {
  Label: string
  Unit: 'day' | 'week' | 'month'
  Fill: boolean
  Start: number
  End: number
  Points: { Time: number; Value: number; Label: string }[]
}

// The chart currently shown. Its canvas is replaced when the results are
// swapped, so it has to be destroyed through this reference.
let chart: Chart | undefined

const makeStatsChart = (dataID: string, canvasID: string) => {
  chart?.destroy()
  chart = undefined

  const el = document.getElementById(dataID)
  if (!el) {
    return
  }

  const data: ChartData = JSON.parse(el.textContent || '{}')

  const canvas = document.getElementById(canvasID) as HTMLCanvasElement
  if (!canvas) {
    console.warn('missing chart canvas')
    return
  }

  // Colours come from the stylesheet, see .stats-chart in stats.scss
  const style = getComputedStyle(canvas.parentElement ?? canvas)
  const color = (name: string) =>
    style.getPropertyValue(`--stats-chart-${name}`).trim()
  const font = { family: style.fontFamily }

  // The first and last data points only stretch the line, see below
  const isEdge = (i: number) => i === 0 || i > data.Points.length
  // The period a data point belongs to; edges belong to their neighbour
  const pointAt = (i: number) =>
    data.Points[Math.min(Math.max(i - 1, 0), data.Points.length - 1)]

  chart = new Chart(canvas, {
    type: 'line',
    data: {
      datasets: [
        {
          label: data.Label,
          // Each point sits in the middle of its period, and 'middle' steps
          // halfway between points, i.e. at period boundaries. Points at Start
          // and End stretch the line over the first and last periods; they
          // have no dot or tooltip.
          data: [
            { x: data.Start, y: data.Points[0]?.Value ?? 0 },
            ...data.Points.map((p) => ({ x: p.Time, y: p.Value })),
            { x: data.End, y: data.Points[data.Points.length - 1]?.Value ?? 0 }
          ],
          stepped: 'middle',
          borderColor: color('line'),
          backgroundColor: color('fill'),
          fill: data.Fill,
          borderWidth: 2,
          tension: 0,
          pointRadius: (ctx) =>
            data.Points.length > 60 || isEdge(ctx.dataIndex) ? 0 : 3,
          pointBackgroundColor: color('line'),
          pointBorderColor: color('line'),
          pointStyle: 'rect'
        }
      ]
    },
    options: {
      // No animation anywhere, including hover and resize transitions
      animation: false,
      transitions: {
        active: { animation: { duration: 0 } },
        resize: { animation: { duration: 0 } },
        show: { animation: { duration: 0 } },
        hide: { animation: { duration: 0 } }
      },
      maintainAspectRatio: false,
      interaction: { mode: 'nearest', axis: 'x', intersect: false },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: data.Unit,
            isoWeekday: true
          },
          grid: { display: false },
          border: { color: color('grid') },
          ticks: { color: color('text'), font }
        },
        y: {
          min: 0,
          grid: { color: color('grid') },
          border: { display: false },
          ticks: { color: color('text'), font, precision: 0 }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            // Edge points have the value of the period next to them
            title: (items) =>
              items.length ? pointAt(items[0].dataIndex).Label : ''
          },
          backgroundColor: color('tooltip'),
          titleColor: color('tooltip-text'),
          bodyColor: color('tooltip-text'),
          titleFont: font,
          bodyFont: font,
          cornerRadius: 0,
          displayColors: false
        }
      }
    }
  })
}

makeStatsChart('stats-chart-data', 'stats-chart')

// Listeners are on the document, since htmx can replace the whole page
// content, e.g. when going back in history

// Copy the current URL, which htmx keeps in sync with the form
document.addEventListener('click', async (e) => {
  const button = (e.target as Element | null)?.closest<HTMLElement>(
    '#stats-copy-link'
  )
  if (!button) return
  await navigator.clipboard.writeText(location.href)
  const label = button.textContent
  button.textContent = button.dataset.copied ?? label
  setTimeout(() => {
    button.textContent = label
  }, 2000)
})

// Capturing, so this runs before htmx reads the form on the same change
document.addEventListener(
  'change',
  (e) => {
    const target = e.target
    if (!(target instanceof HTMLElement)) return

    // The outcome filter only applies to the outcomes metric
    if (target instanceof HTMLSelectElement && target.id === 'stats-metric') {
      const outcomeFilter = document.getElementById('stats-outcome-filter')
      if (outcomeFilter) outcomeFilter.hidden = target.value !== 'outcomes'
    }

    // "All" checks and disables the rest of its group. Unchecking it clears
    // the group, so a few can be picked.
    if (target instanceof HTMLInputElement && target.dataset.allToggle) {
      document
        .querySelectorAll<HTMLInputElement>(
          `[data-group="${target.dataset.allToggle}"] input`
        )
        .forEach((box) => {
          box.disabled = target.checked
          box.checked = target.checked
        })
    }
  },
  true
)

// The results, including the chart data, are replaced when the form changes,
// and the whole page when going back in history
const redraw = () => makeStatsChart('stats-chart-data', 'stats-chart')
document.body.addEventListener('htmx:afterSettle', redraw)
document.body.addEventListener('htmx:historyRestore', redraw)
