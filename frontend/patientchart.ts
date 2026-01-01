import Chart from 'chart.js/auto'
import 'chartjs-adapter-date-fns'

type CurrDistRow = {
  Species: string
  Count: number
}

const makeCurrDistributionChart = (dataID, canvasID) => {
  const el = document.getElementById(dataID)
  if (!el) {
    console.warn(`missing ${dataID} data element`)
    return
  }

  const rows: CurrDistRow[] = JSON.parse(el.textContent || '{}')

  const labels = rows.map((p) => p.Species)
  const data = rows.map((p) => p.Count)

  const canvas = document.getElementById(canvasID) as HTMLCanvasElement
  if (!canvas) {
    console.warn('missing chart canvas')
    return
  }

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          data
        }
      ]
    },
    options: {
      animation: {
        duration: 0
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      }
    },
    plugins: [
      {
        id: 'valueLabels',
        afterDatasetsDraw(chart) {
          const { ctx } = chart
          chart.getDatasetMeta(0).data.forEach((bar, i) => {
            ctx.save()
            ctx.textAlign = 'center'
            ctx.textBaseline = 'bottom'
            ctx.fillText(String(data[i]), bar.x, bar.y - 4)
            ctx.restore()
          })
        }
      }
    ]
  })
}

makeCurrDistributionChart('patient-chart-data', 'patient-chart')

type HistDistSeries = {
  Name: string
  Data: HistDistRow[]
}

type HistDistRow = {
  Date: string
  Count: number
}

const makeHistoricalDistributionChart = (dataID, canvasID) => {
  const el = document.getElementById(dataID)
  if (!el) {
    console.warn(`missing ${dataID} data element`)
    return
  }

  const rows: HistDistSeries[] = JSON.parse(el.textContent || '{}')

  const labels = rows[0].Data.map((r) => r.Date)
  const datasets = rows.map((p) => ({
    label: p.Name,
    data: p.Data.map((r) => r.Count),
    fill: true
  }))

  const canvas = document.getElementById(canvasID) as HTMLCanvasElement
  if (!canvas) {
    console.warn('missing chart canvas')
    return
  }

  new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets
    },
    options: {
      animation: { duration: 0 },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'MMM d, yyyy'
            }
          }
        },
        y: { stacked: true, min: 0 }
      },
      plugins: {
        legend: { display: true },
        tooltip: { enabled: false }
      }
    }
  })
}

makeHistoricalDistributionChart('historical-chart-data', 'historical-chart')
